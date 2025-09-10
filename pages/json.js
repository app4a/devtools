import JsonFormatter from '../components/JsonFormatter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function JsonPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/json');
  
  const jsonToolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON Formatter & Validator",
    "description": "Free online JSON formatter and validator tool. Format, validate, and beautify JSON data instantly.",
    "url": "https://app4a.github.io/devtools/json",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "JSON formatting and beautification",
      "JSON validation with error detection",
      "Syntax highlighting",
      "Copy to clipboard functionality",
      "Works offline in browser"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Programmers, Web Developers"
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
        "name": "JSON Formatter",
        "item": "https://app4a.github.io/devtools/json"
      }
    ]
  };

  const combinedSchema = [jsonToolSchema, breadcrumbSchema];

  return (
    <>
      <SEO
        title="JSON Formatter & Validator - Free Online Tool"
        description="Free online JSON formatter and validator. Format, validate, and beautify JSON data with syntax highlighting. Instantly detect errors and format JSON for better readability."
        canonical="/json"
        schema={combinedSchema}
        keywords={[
          'json formatter',
          'json validator',
          'json beautifier',
          'json pretty print',
          'json syntax checker',
          'format json online',
          'validate json online',
          'json parser',
          'json minifier'
        ]}
      />
      <JsonFormatter name={tool?.name || 'JSON Formatter'} description={tool?.description || 'Format and validate JSON'} />
    </>
  );
}