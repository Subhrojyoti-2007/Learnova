"use client";

import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Handle,
  Position,
  NodeProps,
  Connection,
  Edge,
  Node,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Network, BrainCircuit, Activity, Search, Filter, ZoomIn, ZoomOut, Maximize, ArrowDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// --- CUSTOM NODE ---
const ConceptNode = ({ data, selected }: NodeProps) => {
  const status = data.status as string;
  
  const masteryColor = 
    status === 'mastered' ? 'border-emerald-500/50 bg-[#151226]/90 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' :
    status === 'developing' ? 'border-amber-400/50 bg-[#151226]/90 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]' :
    status === 'weak' ? 'border-orange-400/50 bg-[#151226]/90 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]' :
    status === 'critical' ? 'border-rose-500/50 bg-[#151226]/90 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]' :
    'border-slate-600/50 bg-[#151226]/90 text-slate-400'; // not started

  const dotColor = 
    status === 'mastered' ? 'bg-emerald-500' :
    status === 'developing' ? 'bg-amber-400' :
    status === 'weak' ? 'bg-orange-400' :
    status === 'critical' ? 'bg-rose-500' :
    'bg-slate-500';

  return (
    <div className={`relative group px-4 py-3 backdrop-blur-md rounded-2xl border ${masteryColor} transition-all duration-300 ${selected ? 'scale-110 shadow-[0_0_20px_rgba(124,58,237,0.4)] border-primary' : 'hover:scale-105 hover:border-primary/50'}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-400 !border-none" />
      
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${dotColor} ${status === 'critical' ? 'animate-pulse' : ''}`} />
        <span className="font-bold text-sm text-white">{data.label as string}</span>
      </div>
      
      {status !== 'not_started' && (
        <div className="mt-1 text-[11px] font-bold tracking-widest uppercase opacity-80">{data.mastery as number}% Mastery</div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-400 !border-none" />

      {/* Hover Tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-[#090812] border border-white/10 px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2">
          <span className="text-white text-xs font-semibold">{data.label as string}</span>
          <span className="text-white/30 text-xs">|</span>
          <span className={`text-xs font-bold capitalize ${status === 'mastered' ? 'text-emerald-400' : status === 'developing' ? 'text-amber-400' : status === 'weak' ? 'text-orange-400' : status === 'critical' ? 'text-rose-400' : 'text-slate-400'}`}>
            {status.replace('_', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- DATA ---
const initialNodes: Node[] = [
  { id: 'dsa', position: { x: 300, y: 50 }, data: { label: 'Data Structures & Algorithms', mastery: 64, status: 'developing' }, type: 'concept' },
  
  { id: 'arrays', position: { x: 100, y: 150 }, data: { label: 'Arrays', mastery: 92, status: 'mastered' }, type: 'concept' },
  { id: 'trees', position: { x: 300, y: 150 }, data: { label: 'Trees', mastery: 60, status: 'developing' }, type: 'concept' },
  { id: 'graphs', position: { x: 500, y: 150 }, data: { label: 'Graphs', mastery: 61, status: 'developing' }, type: 'concept' },
  
  { id: 'searching', position: { x: 100, y: 250 }, data: { label: 'Searching', mastery: 85, status: 'mastered' }, type: 'concept' },
  { id: 'recursion', position: { x: 300, y: 250 }, data: { label: 'Recursion', mastery: 44, status: 'weak' }, type: 'concept' },
  { id: 'functions', position: { x: 500, y: 250 }, data: { label: 'Functions', mastery: 82, status: 'mastered' }, type: 'concept' },
  
  { id: 'call_stack', position: { x: 300, y: 350 }, data: { label: 'Call Stack', mastery: 31, status: 'critical' }, type: 'concept' },
  { id: 'stack_frames', position: { x: 300, y: 450 }, data: { label: 'Stack Frames', status: 'not_started' }, type: 'concept' },
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'dsa', target: 'arrays', animated: true, style: { stroke: '#4C3D77', strokeWidth: 2 } },
  { id: 'e2', source: 'dsa', target: 'trees', animated: true, style: { stroke: '#8B5CF6', strokeWidth: 2 } },
  { id: 'e3', source: 'dsa', target: 'graphs', animated: true, style: { stroke: '#8B5CF6', strokeWidth: 2 } },
  
  { id: 'e4', source: 'arrays', target: 'searching', style: { stroke: '#10B981', strokeWidth: 2 } },
  { id: 'e5', source: 'trees', target: 'recursion', style: { stroke: '#F97316', strokeWidth: 2 } },
  { id: 'e6', source: 'functions', target: 'recursion', style: { stroke: '#F97316', strokeWidth: 2 } },
  
  { id: 'e7', source: 'recursion', target: 'call_stack', animated: true, style: { stroke: '#F43F5E', strokeWidth: 3 } }, // critical path
  { id: 'e8', source: 'call_stack', target: 'stack_frames', style: { stroke: '#334155', strokeWidth: 2, strokeDasharray: '5,5' } },
];

const nodeTypes = {
  concept: ConceptNode,
};

// --- COMPONENT ---
function GalaxyMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [activeView, setActiveView] = useState<'map' | 'mastery' | 'prereq'>('map');
  const [isLoading, setIsLoading] = useState(true);
  
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  useEffect(() => {
    fetch('/api/user/overview')
      .then(res => res.json())
      .then(data => {
        if (data?.user?.currentSyllabusData?.galaxy) {
          const galaxy = data.user.currentSyllabusData.galaxy;
          if (galaxy.nodes?.length > 0) {
            // Map AI nodes to our custom format if necessary
            const formattedNodes = galaxy.nodes.map((n: any) => ({
              ...n,
              type: 'concept',
              data: {
                label: n.data?.label || n.label || 'Concept',
                mastery: Math.floor(Math.random() * 100),
                status: ['not_started', 'developing', 'weak', 'mastered'][Math.floor(Math.random() * 4)]
              }
            }));
            
            // Format edges
            const formattedEdges = galaxy.edges?.map((e: any, i: number) => ({
              ...e,
              id: e.id || `e-${i}`,
              animated: true,
              style: { stroke: '#8B5CF6', strokeWidth: 2 }
            })) || [];

            setNodes(formattedNodes);
            setEdges(formattedEdges);
            
            // Fit view after a tiny delay to allow ReactFlow to render
            setTimeout(() => fitView({ duration: 800 }), 100);
          }
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedNode(node);
  }, []);

  // Update edges based on view
  const displayEdges = edges.map(edge => {
    if (activeView === 'prereq') {
      // Highlight only prerequisite paths (e.g. going into the selected node or critical ones)
      if (edge.source === 'functions' || edge.source === 'trees' || edge.target === 'call_stack') {
        return { ...edge, style: { ...edge.style, stroke: '#8B5CF6', strokeWidth: 3 }, animated: true };
      }
      return { ...edge, style: { ...edge.style, stroke: '#334155', opacity: 0.2 }, animated: false };
    }
    if (activeView === 'mastery') {
      // Color edges based on source node mastery... simplify for demo
      return edge;
    }
    return edge; // default map view
  });

  return (
    <div className="flex-1 w-full h-full flex flex-col md:flex-row relative bg-background overflow-hidden">
      
      {/* Background Particle Effects (CSS based for performance) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[30%] w-2 h-2 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(124,58,237,1)] animate-pulse" />
        <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 rounded-full bg-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,1)] animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[40%] right-[20%] w-3 h-3 rounded-full bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,1)] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 h-full relative z-10">
        
        {/* Top Controls Bar */}
        <div className="absolute top-6 left-6 right-6 z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pointer-events-none">
          
          <div className="pointer-events-auto">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-primary/20 rounded-lg backdrop-blur-md">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Knowledge Galaxy</h1>
            </div>
            <p className="text-white/50 font-medium ml-1">Your knowledge, mapped.</p>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto bg-[#090812]/80 backdrop-blur-md border border-white/10 p-2 rounded-2xl shadow-xl">
            {/* Search */}
            <div className="relative group hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search concept..." 
                className="bg-white/5 border border-transparent rounded-xl py-1.5 pl-9 pr-4 w-[180px] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            
            <div className="w-px h-6 bg-white/10 hidden lg:block" />

            {/* View Switcher */}
            <div className="flex bg-white/5 p-1 rounded-xl">
              {[
                { id: 'map', label: 'Map' },
                { id: 'mastery', label: 'Mastery' },
                { id: 'prereq', label: 'Prerequisites' }
              ].map(view => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                    activeView === view.id 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/10" />

            {/* Custom Zoom Controls */}
            <div className="flex items-center gap-1">
              <button onClick={() => zoomIn()} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><ZoomIn className="w-4 h-4" /></button>
              <button onClick={() => zoomOut()} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><ZoomOut className="w-4 h-4" /></button>
              <button onClick={() => fitView({ duration: 800 })} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Maximize className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* React Flow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={displayEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-transparent"
          colorMode="dark"
          minZoom={0.2}
          maxZoom={4}
        >
          {/* Custom darker background color */}
          <Background color="#ffffff" gap={24} size={1} style={{ opacity: 0.03 }} />
        </ReactFlow>
      </div>

      {/* Sidebar Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full md:w-[400px] h-full bg-[#090812]/95 backdrop-blur-xl border-l border-white/10 p-6 shadow-2xl z-30 flex flex-col absolute right-0 top-0 md:relative"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedNode.data.label}</h2>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-md
                    ${selectedNode.data.status === 'mastered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                      selectedNode.data.status === 'developing' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' :
                      selectedNode.data.status === 'weak' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' :
                      selectedNode.data.status === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20' :
                      'bg-slate-500/20 text-slate-400 border border-slate-500/20'
                    }`}
                  >
                    {selectedNode.data.status.replace('_', ' ')}
                  </span>
                  {selectedNode.data.status !== 'not_started' && (
                    <span className="text-lg font-bold text-white">{selectedNode.data.mastery}% <span className="text-sm font-medium text-white/50">Mastery</span></span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 pb-4">
              
              {/* Prerequisites */}
              <div>
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Prerequisites</h3>
                {selectedNode.id === 'call_stack' ? (
                  <ul className="space-y-3 bg-white/5 border border-white/5 rounded-2xl p-4">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">✓</div>
                      <span className="text-white font-medium">Functions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs">⚠</div>
                      <span className="text-white font-medium">Stack Frames</span>
                    </li>
                  </ul>
                ) : (
                  <p className="text-sm text-white/40 italic p-4 bg-white/5 rounded-2xl border border-white/5">Select 'Call Stack' to view detailed prerequisites in this demo.</p>
                )}
              </div>

              {/* Detected Gaps & Performance */}
              {(selectedNode.data.status === 'critical' || selectedNode.data.status === 'weak') && (
                <>
                  <div>
                    <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Detected Gaps
                    </h3>
                    <GlassCard className="!bg-rose-950/20 border border-rose-500/20 p-4">
                      <ul className="list-disc pl-5 text-sm font-medium text-rose-200/90 space-y-2">
                        {selectedNode.id === 'call_stack' ? (
                          <>
                            <li>Return order evaluation</li>
                            <li>Stack frame creation memory limits</li>
                          </>
                        ) : (
                          <li>Difficulty tracking recursive state</li>
                        )}
                      </ul>
                    </GlassCard>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Recent Performance</h3>
                    <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <div className="flex items-center gap-1 text-rose-400 font-bold bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20">
                        <ArrowDownRight className="w-4 h-4" /> 12%
                      </div>
                      <span className="text-sm text-white/60 font-medium">Drop in retention over last 3 quizzes.</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* CTA */}
            {selectedNode.data.status !== 'mastered' && selectedNode.data.status !== 'not_started' && (
              <div className="pt-4 border-t border-white/10 mt-auto">
                <Link href="/repair">
                  <Button variant="primary" className="w-full py-6 text-lg font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                    Repair This Gap
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Wrap in ReactFlowProvider to use hooks like useReactFlow
export default function KnowledgeGalaxyWrapped() {
  return (
    <ReactFlowProvider>
      <GalaxyMap />
    </ReactFlowProvider>
  );
}
