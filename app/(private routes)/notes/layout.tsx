import React from "react";


interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode; 
}

export default function NotesLayout({ children, sidebar }: LayoutProps) {
  return (
    <div style={{ display: "flex" }}> 
      <aside>
        {sidebar}
      </aside>
      
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}