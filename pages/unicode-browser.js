import UnicodeBrowser from '../components/UnicodeBrowser';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function UnicodeBrowserPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/unicode-browser');
  
  const unicodeSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Unicode & Emoji Browser",
    "description": "Comprehensive Unicode and emoji browser with character search, detailed information, code point conversion, HTML entities, and escape codes.",
    "url": "https://app4a.github.io/devtools/unicode-browser",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Unicode character search",
      "Emoji browser with categories",
      "Character code point information",
      "HTML entity conversion",
      "CSS escape codes",
      "Favorites management",
      "Character block browsing"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Designers, Web Developers"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://app4a.github.io/devtools"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Unicode Browser",
        "item": "https://app4a.github.io/devtools/unicode-browser"
      }
    ]
  };

  const combinedSchema = [unicodeSchema, breadcrumbSchema];

  return (
    <>
      <SEO
        title="Unicode & Emoji Browser - Free Character Search Tool"
        description="Browse Unicode characters, emojis, and symbols with detailed code point information. Search characters, view HTML entities, CSS escape codes, and manage favorites for easy access."
        canonical="/unicode-browser"
        schema={combinedSchema}
        keywords={[
          'unicode browser',
          'emoji browser',
          'character search',
          'unicode characters',
          'html entities',
          'css escape codes',
          'character codes',
          'symbol browser',
          'unicode lookup'
        ]}
      />
      <UnicodeBrowser 
        name={tool?.name || 'Unicode & Emoji Browser'}
        description={tool?.description || 'Comprehensive Unicode and emoji browser with character search and detailed information'}
      />
    </>
  );
}
