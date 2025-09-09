import Head from 'next/head';

export default function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/logo512.png',
  twitterCard = 'summary_large_image',
  noindex = false,
  schema = null,
  keywords = [],
}) {
  const siteName = 'Developer Tools';
  const siteUrl = 'https://yourdevtools.com'; // Replace with your actual domain
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Free Online Developer Utilities`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : `${siteUrl}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  const defaultKeywords = [
    'developer tools',
    'online tools',
    'free tools',
    'web developer',
    'programming tools',
    'code formatter',
    'json formatter',
    'base64 encoder',
    'hash generator',
    'jwt decoder'
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Developer Tools" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* SEO Tags */}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageUrl} />

      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#1976d2" />

      {/* Performance and Security */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  );
}
