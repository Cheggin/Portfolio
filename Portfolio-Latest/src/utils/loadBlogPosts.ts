import type { ComponentType } from "react";

export interface BlogPost {
  id: string;
  title: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  tags?: string[];
  Component: ComponentType;
}

const modules = import.meta.glob<{
  frontmatter: Omit<BlogPost, "id" | "Component">;
  default: ComponentType;
}>("../content/blog/*.mdx", { eager: true });

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, module]) => ({
    ...module.frontmatter,
    id: path.slice(path.lastIndexOf("/") + 1, -".mdx".length),
    Component: module.default,
  }))
  .sort((a, b) => {
    if (!a.date) return b.date ? 1 : 0;
    if (!b.date) return -1;
    return Date.parse(b.date) - Date.parse(a.date);
  });
