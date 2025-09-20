import UuidGenerator from '../components/UuidGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function UuidGeneratorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/uuid-generator');
  
  const uuidSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "UUID/GUID Generator",
    "description": "Free online UUID/GUID generator. Generate unique identifiers with v1, v4, v5 versions, bulk generation, and multiple formatting options.",
    "url": "https://app4a.github.io/devtools/uuid-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["UUID v1 generation", "UUID v4 generation", "UUID v5 generation", "Bulk generation", "Multiple formats", "UUID validation", "Favorites management"]
  };

  return (
    <>
      <SEO
        title="UUID/GUID Generator - v1, v4, v5 & Bulk Generation"
        description="Free online UUID/GUID generator. Generate UUIDs/GUIDs with support for v1, v4, v5 versions. Bulk generation, multiple formats, validation, favorites, and export options for unique identifiers."
        canonical="/uuid-generator"
        schema={uuidSchema}
        keywords={[
          'uuid generator',
          'guid generator',
          'uuid v4 generator',
          'uuid v1 generator',
          'uuid v5 generator',
          'unique identifier generator',
          'bulk uuid generator',
          'uuid validator'
        ]}
      />
      <UuidGenerator name={tool?.name || 'UUID/GUID Generator'} description={tool?.description || 'Generate unique identifiers'} />
    </>
  );
}
