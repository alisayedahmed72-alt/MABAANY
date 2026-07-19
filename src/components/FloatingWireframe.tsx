import React, { useState, useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  from: number;
  to: number;
}

interface FloatingWireframeProps {
  shape: 'dome' | 'tower' | 'icosahedron' | 'cube' | 'octahedron' | 'pyramid';
  className?: string;
  color?: string;
  speed?: number;
}

export function FloatingWireframe({
  shape,
  className = 'w-48 h-48',
  color = '#EA8A22',
  speed = 1
}: FloatingWireframeProps) {
  const [angle, setAngle] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation loop
  useEffect(() => {
    let animId: number;
    const update = () => {
      setAngle((prev) => (prev + 0.005 * speed) % (Math.PI * 2));
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [speed]);

  // Define nodes and edges based on shape type
  let nodes: Point3D[] = [];
  let edges: Edge[] = [];

  if (shape === 'dome') {
    // 1. Geodesic Dome Structure
    // Base ring (8 nodes at z = -0.4)
    for (let i = 0; i < 8; i++) {
      const theta = (i * Math.PI * 2) / 8;
      nodes.push({ x: Math.cos(theta), y: Math.sin(theta), z: -0.4 });
    }
    // Mid ring (8 nodes at z = 0.2, rotated slightly for staggering)
    for (let i = 0; i < 8; i++) {
      const theta = (i * Math.PI * 2) / 8 + Math.PI / 8;
      nodes.push({ x: 0.8 * Math.cos(theta), y: 0.8 * Math.sin(theta), z: 0.2 });
    }
    // Top ring (4 nodes at z = 0.8)
    for (let i = 0; i < 4; i++) {
      const theta = (i * Math.PI * 2) / 4;
      nodes.push({ x: 0.4 * Math.cos(theta), y: 0.4 * Math.sin(theta), z: 0.8 });
    }
    // Apex node (1 node at z = 1.3)
    nodes.push({ x: 0, y: 0, z: 1.3 });

    // Edges
    // Base ring sequential connections
    for (let i = 0; i < 8; i++) {
      edges.push({ from: i, to: (i + 1) % 8 });
    }
    // Mid ring sequential connections
    for (let i = 0; i < 8; i++) {
      edges.push({ from: 8 + i, to: 8 + ((i + 1) % 8) });
    }
    // Top ring sequential connections
    for (let i = 0; i < 4; i++) {
      edges.push({ from: 16 + i, to: 16 + ((i + 1) % 4) });
    }
    // Truss triangles (base to mid)
    for (let i = 0; i < 8; i++) {
      edges.push({ from: i, to: 8 + i });
      edges.push({ from: i, to: 8 + ((i - 1 + 8) % 8) });
    }
    // Truss triangles (mid to top)
    for (let i = 0; i < 8; i++) {
      edges.push({ from: 8 + i, to: 16 + (i % 4) });
    }
    // Connect top ring to apex
    for (let i = 0; i < 4; i++) {
      edges.push({ from: 16 + i, to: 20 });
    }

  } else if (shape === 'tower') {
    // 2. Hyperboloid Lattice Tower
    // Base ring (8 nodes at z = -0.8, radius = 1.2)
    for (let i = 0; i < 8; i++) {
      const theta = (i * Math.PI * 2) / 8;
      nodes.push({ x: 1.2 * Math.cos(theta), y: 1.2 * Math.sin(theta), z: -0.8 });
    }
    // Waist ring (8 nodes at z = 0.0, radius = 0.6)
    for (let i = 0; i < 8; i++) {
      const theta = (i * Math.PI * 2) / 8;
      nodes.push({ x: 0.6 * Math.cos(theta), y: 0.6 * Math.sin(theta), z: 0.0 });
    }
    // Top ring (8 nodes at z = 0.8, radius = 0.9)
    for (let i = 0; i < 8; i++) {
      const theta = (i * Math.PI * 2) / 8;
      nodes.push({ x: 0.9 * Math.cos(theta), y: 0.9 * Math.sin(theta), z: 0.8 });
    }

    // Edges
    // Horizontal rings
    for (let i = 0; i < 8; i++) {
      edges.push({ from: i, to: (i + 1) % 8 });
      edges.push({ from: 8 + i, to: 8 + ((i + 1) % 8) });
      edges.push({ from: 16 + i, to: 16 + ((i + 1) % 8) });
    }
    // Double-ruled straight hyperboloid columns (twist 1 step clockwise & counter-clockwise)
    for (let i = 0; i < 8; i++) {
      // Lower tier
      edges.push({ from: i, to: 8 + ((i + 1) % 8) });
      edges.push({ from: i, to: 8 + ((i - 1 + 8) % 8) });
      // Upper tier
      edges.push({ from: 8 + i, to: 16 + ((i + 1) % 8) });
      edges.push({ from: 8 + i, to: 16 + ((i - 1 + 8) % 8) });
    }

  } else if (shape === 'icosahedron') {
    // 3. Regular Icosahedron (Geodesic Sphere Frame)
    const phi = 1.61803398875;
    const rawNodes = [
      { x: 0, y: 1, z: phi },
      { x: 0, y: 1, z: -phi },
      { x: 0, y: -1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 1, y: phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: -1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: phi, y: 0, z: 1 },
      { x: phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 }
    ];
    // Scale down for isometric layout
    nodes = rawNodes.map(n => ({ x: n.x * 0.6, y: n.y * 0.6, z: n.z * 0.6 }));

    edges = [
      { from: 0, to: 2 }, { from: 0, to: 8 }, { from: 0, to: 10 }, { from: 0, to: 4 }, { from: 0, to: 6 },
      { from: 1, to: 3 }, { from: 1, to: 9 }, { from: 1, to: 11 }, { from: 1, to: 4 }, { from: 1, to: 6 },
      { from: 2, to: 8 }, { from: 2, to: 10 }, { from: 2, to: 5 }, { from: 2, to: 7 },
      { from: 3, to: 9 }, { from: 3, to: 11 }, { from: 3, to: 5 }, { from: 3, to: 7 },
      { from: 4, to: 6 }, { from: 4, to: 8 }, { from: 4, to: 9 },
      { from: 5, to: 7 }, { from: 5, to: 8 }, { from: 5, to: 9 },
      { from: 6, to: 10 }, { from: 6, to: 11 },
      { from: 7, to: 10 }, { from: 7, to: 11 },
      { from: 8, to: 9 },
      { from: 10, to: 11 }
    ];
  } else if (shape === 'cube') {
    // 4. Cube / Structural Grid Block
    nodes = [
      { x: -0.7, y: -0.7, z: -0.7 },
      { x: 0.7, y: -0.7, z: -0.7 },
      { x: 0.7, y: 0.7, z: -0.7 },
      { x: -0.7, y: 0.7, z: -0.7 },
      { x: -0.7, y: -0.7, z: 0.7 },
      { x: 0.7, y: -0.7, z: 0.7 },
      { x: 0.7, y: 0.7, z: 0.7 },
      { x: -0.7, y: 0.7, z: 0.7 }
    ];
    edges = [
      // Bottom face
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
      // Top face
      { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 },
      // Columns
      { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 }
    ];
  } else if (shape === 'octahedron') {
    // 5. Octahedron (Double Pyramid)
    nodes = [
      { x: 0, y: 0, z: 1.1 },   // top apex
      { x: 0.9, y: 0, z: 0 },   // front
      { x: 0, y: 0.9, z: 0 },   // right
      { x: -0.9, y: 0, z: 0 },  // back
      { x: 0, y: -0.9, z: 0 },  // left
      { x: 0, y: 0, z: -1.1 }   // bottom apex
    ];
    edges = [
      // Mid ring
      { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 1 },
      // Upper pyramids
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 },
      // Lower pyramids
      { from: 5, to: 1 }, { from: 5, to: 2 }, { from: 5, to: 3 }, { from: 5, to: 4 }
    ];
  } else {
    // 6. Pyramidal Frame
    nodes = [
      { x: -0.7, y: -0.7, z: -0.5 },
      { x: 0.7, y: -0.7, z: -0.5 },
      { x: 0.7, y: 0.7, z: -0.5 },
      { x: -0.7, y: 0.7, z: -0.5 },
      { x: 0, y: 0, z: 0.9 } // Apex
    ];
    edges = [
      // Base
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
      // Slanted
      { from: 0, to: 4 }, { from: 1, to: 4 }, { from: 2, to: 4 }, { from: 3, to: 4 }
    ];
  }

  // Projection logic
  const viewWidth = 300;
  const viewHeight = 300;
  const cx = viewWidth / 2;
  const cy = viewHeight / 2;

  // Spacing parameters to scale node projection to coordinate frame
  const spacingX = 64;
  const spacingY = 32;
  const spacingZ = 64;

  const projectedNodes = nodes.map((node) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Rotate coordinates about the Z-axis
    const rx = node.x * cos - node.y * sin;
    const ry = node.x * sin + node.y * cos;

    // Isometric formula
    const xScreen = cx + (rx - ry) * spacingX;
    const yScreen = cy + (rx + ry) * spacingY - node.z * spacingZ;

    return { xScreen, yScreen };
  });

  return (
    <div 
      ref={containerRef}
      className={`relative select-none pointer-events-none ${className}`}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        className="overflow-visible"
      >
        {/* Render wireframe edges */}
        {edges.map((edge, idx) => {
          const fromNode = projectedNodes[edge.from];
          const toNode = projectedNodes[edge.to];
          if (!fromNode || !toNode) return null;

          return (
            <line
              key={`edge-${idx}`}
              x1={fromNode.xScreen}
              y1={fromNode.yScreen}
              x2={toNode.xScreen}
              y2={toNode.yScreen}
              stroke={color}
              strokeWidth="1.2"
              strokeOpacity="0.85"
            />
          );
        })}

        {/* Render node circles */}
        {projectedNodes.map((node, idx) => (
          <circle
            key={`node-${idx}`}
            cx={node.xScreen}
            cy={node.yScreen}
            r="3"
            fill="white"
            stroke={color}
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
}
