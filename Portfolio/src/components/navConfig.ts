import type { NavigateFunction } from "react-router-dom";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function handleNavItemClick(itemId: string, navigate: NavigateFunction, setActiveNavItem: (id: string) => void) {
  setActiveNavItem(itemId);
  switch (itemId) {
    case "home":
      navigate("/");
      break;
    case "about":
      navigate("/about");
      break;
    case "projects":
      navigate("/projects");
      break;
    case "contact":
      navigate("/contact");
      break;
  }
} 