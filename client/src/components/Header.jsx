import React from 'react';
import { Binary, Code2, Terminal } from 'lucide-react';

export function Header() {
  return (
    <header className="border border-white/20 bg-card/50 backdrop-blur-lg bg-white/5 mt-6 rounded-full w-[80%]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 border-emerald-600">
                <Binary className="h-8 w-8 text-primary text-emerald-600" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-mono tracking-tight">
                <span className="text-glow text-white">Algorithm</span>
                <span className="text-muted-foreground text-gray-400">Viz</span>
              </h1>
              <p className="text-xs text-muted-foreground font-mono text-gray-500">
                Algorithm Visualizer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border border-white">
              <Terminal className="h-4 w-4 text-primary text-white" />
              <code className="text-xs font-mono text-muted-foreground text-white">
                DSA Learning Tool
              </code>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 border-white">
              <Code2 className="h-4 w-4 text-primary text-white" />
              <span className="text-xs font-mono text-primary text-white">v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}