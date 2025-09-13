import CssFormatter from '../components/CssFormatter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function CssFormatterPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/css-formatter');
  
  const cssSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSS Formatter & Minifier",
    "description": "Professional CSS processing tool with beautification, minification, validation, autoprefixer, and property sorting. Supports CSS, SCSS, and LESS.",
    "url": "https://app4a.github.io/devtools/css-formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "CSS beautification and formatting",
      "CSS minification and compression",
      "SCSS and LESS support",
      "CSS validation",
      "Property sorting",
      "Syntax highlighting",
      "File analysis and metrics"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Web Developers, Frontend Developers, UI/UX Designers"
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
        "name": "CSS Formatter",
        "item": "https://app4a.github.io/devtools/css-formatter"
      }
    ]
  };

  const combinedSchema = [cssSchema, breadcrumbSchema];

  return (
    <>
      <SEO
        title="CSS Formatter & Minifier - Free Online Tool"
        description="Format, beautify, and minify CSS, SCSS, and LESS code online. Validate CSS syntax, sort properties, and optimize your stylesheets with advanced formatting options."
        canonical="/css-formatter"
        schema={combinedSchema}
        keywords={[
          'css formatter',
          'css beautifier',
          'css minifier',
          'scss formatter',
          'less formatter',
          'css validator',
          'format css online',
          'minify css',
          'css optimizer',
          'style formatter'
        ]}
      />
      <CssFormatter 
        name={tool?.name || 'CSS Formatter & Minifier'}
        description={tool?.description || 'Professional CSS processing tool with beautification, minification, and validation'}
      />
    </>
  );
}
