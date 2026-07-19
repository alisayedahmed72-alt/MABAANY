import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Activity, Compass, Settings, RotateCw } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  type: 'node' | 'accent' | 'foundation';
}

interface Edge {
  from: number;
  to: number;
  type: 'beam' | 'column' | 'foundation';
}

export function InteractiveBlueprint() {
  const [angle, setAngle] = useState<number>(0.5); // Initial tilt angle
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeLayer, setActiveLayer] = useState<'all' | 'frame' | 'foundation'>('all');
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation loop
  useEffect(() => {
    if (!autoRotate) return;
    let animId: number;
    const update = () => {
      setAngle((prev) => (prev + 0.004) % (Math.PI * 2));
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [autoRotate]);

  // 3D Isometric building model points
  const nodes: Point3D[] = [
    // Foundation level (z = -0.5)
    { x: -1, y: -1, z: -0.6, type: 'foundation' },
    { x: 1, y: -1, z: -0.6, type: 'foundation' },
    { x: 1, y: 1, z: -0.6, type: 'foundation' },
    { x: -1, y: 1, z: -0.6, type: 'foundation' },
    
    // First Level (z = 0.2)
    { x: -1, y: -1, z: 0.2, type: 'node' },
    { x: 1, y: -1, z: 0.2, type: 'node' },
    { x: 1, y: 1, z: 0.2, type: 'node' },
    { x: -1, y: 1, z: 0.2, type: 'node' },
    { x: 0, y: 0, z: 0.2, type: 'accent' }, // Central structural column
    
    // Second Level (z = 1.0)
    { x: -1, y: -1, z: 1.0, type: 'node' },
    { x: 1, y: -1, z: 1.0, type: 'node' },
    { x: 1, y: 1, z: 1.0, type: 'node' },
    { x: -1, y: 1, z: 1.0, type: 'node' },
    { x: 0, y: 0, z: 1.0, type: 'accent' },
    
    // Tapered Roof Frame (z = 1.6)
    { x: -0.5, y: -0.5, z: 1.6, type: 'node' },
    { x: 0.5, y: -0.5, z: 1.6, type: 'node' },
    { x: 0.5, y: 0.5, z: 1.6, type: 'node' },
    { x: -0.5, y: 0.5, z: 1.6, type: 'node' },
  ];

  // Beams & structural columns forming the skeleton
  const edges: Edge[] = [
    // Foundation connections
    { from: 0, to: 1, type: 'foundation' },
    { from: 1, to: 2, type: 'foundation' },
    { from: 2, to: 3, type: 'foundation' },
    { from: 3, to: 0, type: 'foundation' },
    
    // Vertical Columns from Foundation to Level 1
    { from: 0, to: 4, type: 'column' },
    { from: 1, to: 5, type: 'column' },
    { from: 2, to: 6, type: 'column' },
    { from: 3, to: 7, type: 'column' },
    
    // Level 1 horizontal beams
    { from: 4, to: 5, type: 'beam' },
    { from: 5, to: 6, type: 'beam' },
    { from: 6, to: 7, type: 'beam' },
    { from: 7, to: 4, type: 'beam' },
    
    // Level 1 to Level 2 Columns
    { from: 4, to: 9, type: 'column' },
    { from: 5, to: 10, type: 'column' },
    { from: 6, to: 11, type: 'column' },
    { from: 7, to: 12, type: 'column' },
    { from: 8, to: 13, type: 'column' },
    
    // Level 2 horizontal beams
    { from: 9, to: 10, type: 'beam' },
    { from: 10, to: 11, type: 'beam' },
    { from: 11, to: 12, type: 'beam' },
    { from: 12, to: 9, type: 'beam' },
    
    // Roof supports (tapering structure)
    { from: 9, to: 14, type: 'column' },
    { from: 10, to: 15, type: 'column' },
    { from: 11, to: 16, type: 'column' },
    { from: 12, to: 17, type: 'column' },
    
    // Roof Ring
    { from: 14, to: 15, type: 'beam' },
    { from: 15, to: 16, type: 'beam' },
    { from: 16, to: 17, type: 'beam' },
    { from: 17, to: 14, type: 'beam' },
  ];

  // Rotate vertices around Z-axis and calculate isometric screen coordinates
  const viewWidth = 440;
  const viewHeight = 310;
  const cx = viewWidth / 2;
  const cy = 185;

  const spacingX = 64;
  const spacingY = 32;
  const spacingZ = 58;

  const projectedNodes = nodes.map((node, index) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    // Rotate x & y mathematically
    const rx = node.x * cos - node.y * sin;
    const ry = node.x * sin + node.y * cos;
    
    // Isometric formula
    const xScreen = cx + (rx - ry) * spacingX;
    const yScreen = cy + (rx + ry) * spacingY - node.z * spacingZ;
    
    return {
      ...node,
      xScreen,
      yScreen,
      originalIndex: index
    };
  });

  // Filter based on active state layers
  const filteredEdges = edges.filter(edge => {
    const fromNode = nodes[edge.from];
    const toNode = nodes[edge.to];
    
    if (activeLayer === 'foundation') {
      return fromNode.type === 'foundation' && toNode.type === 'foundation';
    }
    if (activeLayer === 'frame') {
      return fromNode.type !== 'foundation' && toNode.type !== 'foundation';
    }
    return true; // all
  });

  const filteredNodes = projectedNodes.filter(node => {
    if (activeLayer === 'foundation') {
      return node.type === 'foundation';
    }
    if (activeLayer === 'frame') {
      return node.type !== 'foundation';
    }
    return true;
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[450px] overflow-hidden flex flex-col items-center justify-center select-none opacity-80"
    >
      {/* Main interactive viewport container */}
      <div className="relative w-full h-[240px] md:h-[260px] flex items-center justify-center z-10">
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          className="overflow-visible"
        >
          {/* Subtle base shadow ellipse for depth */}
          <ellipse 
            cx={cx} 
            cy={cy + 55} 
            rx="130" 
            ry="45" 
            fill="url(#blueprint-shadow)" 
            opacity="0.12" 
          />
          
          <defs>
            <radialGradient id="blueprint-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#264A8A" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Draw foundational ground rings */}
          <g opacity="0.12">
            <ellipse cx={cx} cy={cy + 40} rx="140" ry="50" fill="none" stroke="#264A8A" strokeWidth="1" strokeDasharray="5,5" />
            <ellipse cx={cx} cy={cy + 40} rx="100" ry="36" fill="none" stroke="#264A8A" strokeWidth="1" />
          </g>

          {/* Render active edges / beams */}
          <g>
            {filteredEdges.map((edge, index) => {
              const nodeFrom = projectedNodes[edge.from];
              const nodeTo = projectedNodes[edge.to];
              
              if (!nodeFrom || !nodeTo) return null;

              const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
              
              let strokeColor = '#cbd5e1'; // neutral slate
              let strokeWidth = '1.5';
              let strokeDash = undefined;

              if (edge.type === 'foundation') {
                strokeColor = '#94a3b8';
                strokeWidth = '1.2';
                strokeDash = '3,3';
              } else if (edge.type === 'column') {
                strokeColor = '#264A8A';
                strokeWidth = '1.8';
              } else if (edge.type === 'beam') {
                strokeColor = '#475569';
                strokeWidth = '1.5';
              }

              if (isHighlighted) {
                strokeColor = '#EA8A22';
                strokeWidth = '2.5';
              }

              return (
                <line
                  key={`edge-${index}`}
                  x1={nodeFrom.xScreen}
                  y1={nodeFrom.yScreen}
                  x2={nodeTo.xScreen}
                  y2={nodeTo.yScreen}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                  className="transition-colors duration-300"
                />
              );
            })}
          </g>

          {/* Render active vertices / joints */}
          <g>
            {filteredNodes.map((node) => {
              const isHovered = hoveredNode === node.originalIndex;
              const r = isHovered ? 6 : node.type === 'accent' ? 5 : 4;
              
              let fillColor = '#ffffff';
              let strokeColor = '#264A8A';
              let strokeWidth = '1.5';

              if (node.type === 'foundation') {
                strokeColor = '#64748b';
                fillColor = '#cbd5e1';
              } else if (node.type === 'accent') {
                strokeColor = '#EA8A22';
                fillColor = '#FFEEDB';
                strokeWidth = '2';
              }

              if (isHovered) {
                strokeColor = '#EA8A22';
                fillColor = '#EA8A22';
              }

              return (
                <g key={`node-${node.originalIndex}`}>
                  {/* Subtle outer glowing pulse for interactive nodes */}
                  {node.type === 'accent' && (
                    <circle
                      cx={node.xScreen}
                      cy={node.yScreen}
                      r={12}
                      fill="none"
                      stroke="#EA8A22"
                      strokeWidth="1"
                      opacity="0.3"
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  )}
                  <circle
                    cx={node.xScreen}
                    cy={node.yScreen}
                    r={r}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="cursor-pointer transition-colors duration-300 ease-out hover:scale-150"
                    onMouseEnter={() => setHoveredNode(node.originalIndex)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                </g>
              );
            })}
          </g>

          {/* Highlight overlays & label hints */}
          {hoveredNode !== null && (
            <g>
              <text
                x={projectedNodes[hoveredNode].xScreen + 10}
                y={projectedNodes[hoveredNode].yScreen - 10}
                fontFamily="monospace"
                fontSize="9"
                fontWeight="bold"
                fill="#EA8A22"
                className="bg-white px-1 select-none pointer-events-none"
              >
                NODE_{hoveredNode} (Z: {nodes[hoveredNode].z.toFixed(1)})
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
