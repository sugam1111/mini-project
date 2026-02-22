// src/components/app-layout.tsx

import { useState } from "react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const navItems = [
  { label: "Reports", to: "/reports" },
  { label: "Marks", to: "/marks" },
];

export default function AppLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      
      {/* Sidebar */}
      <aside
        className={`border-r transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {isOpen && (
            <p className="text-lg font-semibold">Mini Dashboard</p>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm px-2 py-1 rounded-md hover:bg-muted"
          >
            {isOpen ? "←" : "→"}
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "block rounded-md px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-muted font-medium"
                    : "hover:bg-muted/60",
                ].join(" ")
              }
            >
              {isOpen ? item.label : item.label[0]}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}