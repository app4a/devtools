import HttpBuilder from '../components/HttpBuilder';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function HttpBuilderPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/http-builder');
  
  const httpBuilderSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HTTP Request Builder",
    "description": "Free HTTP request builder and formatter with visual interface. Generate cURL commands, format responses, validate JSON/XML, and export to popular API tools.",
    "url": "https://app4a.github.io/devtools/http-builder",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["HTTP request builder", "cURL generation", "API testing", "Request formatting", "Response validation", "Code generation", "Authentication support", "Request history"]
  };

  return (
    <>
      <SEO
        title="HTTP Request Builder - API Testing & cURL Generator"
        description="Build, test, and format HTTP requests with visual interface. Generate cURL commands, format responses, validate JSON/XML, and export to popular API tools for developers."
        canonical="/http-builder"
        schema={httpBuilderSchema}
        keywords={[
          'http request builder',
          'api testing tool',
          'curl generator',
          'rest client',
          'api tester',
          'http client',
          'request formatter',
          'api development'
        ]}
      />
      <HttpBuilder name={tool?.name || 'HTTP Request Builder'} description={tool?.description || 'Build and test HTTP requests with visual interface'} />
    </>
  );
}

