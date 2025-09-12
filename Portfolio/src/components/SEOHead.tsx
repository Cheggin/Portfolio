import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Reagan Hsu - Software Engineer Portfolio | Computer Science Student UCSD",
  description = "Reagan Hsu is a Computer Science student at UCSD specializing in full-stack development, AI/ML projects, and hackathon-winning applications. View projects including CiteTrace, PillSnap, and SFGovTV++.",
  keywords = "Reagan Hsu, software engineer, computer science, UCSD, full stack developer, React, Python, AI ML, hackathon winner, portfolio, web developer, student, intern, recruiter",
  image = "https://reaganhsu.com/og-image.jpg",
  url = "https://reaganhsu.com",
  type = "website",
  structuredData
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={url} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;