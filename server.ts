import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Readable } from 'stream';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Google Drive video proxy stream endpoint
  app.get('/api/video-stream', async (req, res) => {
    const fileId = req.query.id as string;
    if (!fileId) {
      return res.status(400).send('Missing file id');
    }

    const rangeHeader = req.headers['range'];

    try {
      const url = `https://docs.google.com/uc?export=download&id=${fileId}`;
      const headers: Record<string, string> = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      };
      if (rangeHeader) {
        headers['Range'] = rangeHeader;
      }
      
      // Fetch directly with range header (this automatically handles redirects and cookies natively)
      const response = await fetch(url, { headers });

      if (!response.ok) {
        return res.status(response.status).send('Failed to fetch from Google Drive');
      }

      const contentType = response.headers.get('content-type') || '';
      
      let videoResponse: Response;

      if (contentType.includes('text/html')) {
        const html = await response.text();
        
        // Extract confirmation token from the Google Drive virus scan page
        const confirmMatch = html.match(/confirm=([a-zA-Z0-9_-]+)/);
        
        if (confirmMatch && confirmMatch[1]) {
          const confirmToken = confirmMatch[1];
          const confirmedUrl = `https://docs.google.com/uc?export=download&confirm=${confirmToken}&id=${fileId}`;
          const cookies = response.headers.get('set-cookie') || '';
          
          const confirmedHeaders: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Cookie': cookies
          };

          if (rangeHeader) {
            confirmedHeaders['Range'] = rangeHeader;
          }

          videoResponse = await fetch(confirmedUrl, { headers: confirmedHeaders });
        } else {
          // If no confirmation link is found, the file might be private, deleted, or permissions are restricted
          return res.status(403).send('Google Drive file is private, restricted, or invalid. Please ensure the file is shared as "Anyone with the link can view".');
        }
      } else {
        videoResponse = response;
      }

      // Stream the video content to the client
      res.status(videoResponse.status);
      
      // Copy essential streaming headers
      const headersToCopy = [
        'content-type',
        'content-length',
        'content-range',
        'accept-ranges'
      ];

      for (const header of headersToCopy) {
        const val = videoResponse.headers.get(header);
        if (val) {
          res.setHeader(header, val);
        }
      }

      if (videoResponse.body) {
        const stream = Readable.fromWeb(videoResponse.body as any);
        
        req.on('close', () => {
          // Cancel the fetch body to stop downloading from Google Drive immediately
          if (videoResponse.body) {
            videoResponse.body.cancel().catch(() => {});
          }
          stream.destroy();
        });

        stream.pipe(res);
      } else {
        res.status(500).send('Empty stream body');
      }

    } catch (error) {
      console.error('Error proxying video stream:', error);
      res.status(500).send('Internal Server Error while streaming video');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
