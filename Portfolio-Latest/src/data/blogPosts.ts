export type PublicationPlatform = 'substack' | 'medium';

interface Publication {
  name: string;
  platform: PublicationPlatform;
  url: string;
}

interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  date: string;
  readTime: string;
  description: string;
  publications: Publication[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'dropping-out-for-startups',
    title: 'Dropping Out for Startups',
    publishedAt: '2026-09-21T00:40:33.078Z',
    date: 'September 20, 2026',
    readTime: '7 min read',
    description: 'This is my story about dropping out of school to join a startup. Enjoy!',
    publications: [
      {
        name: 'Read on Substack',
        platform: 'substack',
        url: 'https://reaganhsu.substack.com/p/dropping-out-for-startups?r=4q0fox',
      },
      {
        name: 'Read on Medium',
        platform: 'medium',
        url: 'https://medium.com/@reaganhsu123/dropping-out-for-startups-bd38296ff70d',
      },
    ],
  },
];
