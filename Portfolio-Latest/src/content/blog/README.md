# Blog Posts Guide

## Adding a New Blog Post

1. Create a new `.mdx` file in this directory (e.g., `my-new-post.mdx`)
2. Add frontmatter at the top with metadata
3. Write your content using Markdown or MDX

## Example Structure

```mdx
---
title: "Your Post Title"
date: "January 21, 2025"
readTime: "5 min read"
excerpt: "A brief summary that appears in the blog list"
tags: ["tag1", "tag2"]
---

# Your Post Title

Write your content here using **Markdown** or MDX!

## You can use:
- Headings
- Lists
- **Bold** and *italic* text
- `code snippets`
- Links: [text](url)
- Images: ![alt](image-url)
- And even React components!

\```javascript
// Fenced code blocks
const greeting = "Hello, world!";
\```
```

## MDX vs Markdown

**MDX** (`.mdx`) allows you to:
- Import and use React components
- Add interactive elements
- Use JSX syntax

**Markdown** (`.md`) is simpler but only supports static content.

## Tips

- The filename becomes the URL slug (e.g., `my-post.mdx` → `/writing/my-post`)
- Posts are sorted by date (newest first), with undated posts last
- `title` is required; `date`, `readTime`, `excerpt`, and `tags` are optional
