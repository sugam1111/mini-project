import Menu from "@/assets/icons/Menu";
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
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={`fixed left-0 top-18.25 z-40 h-[calc(100vh-73px)] overflow-y-auto border-r bg-background transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 mt-4">
          {isOpen && <p className="text-2xl font-bold">Mini Dashboard</p>}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md px-2 py-1 text-sm hover:bg-muted"
          >
            {isOpen ? <Menu /> : <Menu />}
          </button>
        </div>

        <nav className="mt-4 space-y-2 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-md text-sm transition",
                  isOpen
                    ? "block px-3 py-2 text-left"
                    : "flex h-10 w-10 items-center justify-center mx-auto",
                  isActive ? "bg-purple-600 text-white font-medium" : "hover:bg-purple-900 font-bold hover:text-white",
                ].join(" ")
              }
            >
              {isOpen ? item.label : item.label[0]}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main
        className={`min-h-screen  transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
