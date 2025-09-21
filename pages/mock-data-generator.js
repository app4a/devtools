import MockDataGenerator from '../components/MockDataGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function MockDataGeneratorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/mock-data-generator');

  const mockDataSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI-Powered Mock Data Generator",
    "description": "Generate realistic test data for APIs, databases, and applications. Create JSON, CSV, SQL formats with customizable schemas and AI-powered realistic data.",
    "url": "https://app4a.github.io/devtools/mock-data-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["mock data generation", "test data generator", "fake data", "JSON generator", "CSV generator", "SQL generator", "API testing"]
  };

  return (
    <>
      <SEO
        title="AI-Powered Mock Data Generator - Free Test Data Tool"
        description="Generate realistic mock data for testing APIs and databases. Create JSON, CSV, SQL with customizable schemas, realistic names, emails, addresses, and more."
        canonical="/mock-data-generator"
        schema={mockDataSchema}
        keywords={['mock data generator', 'test data generator', 'fake data', 'JSON generator', 'CSV test data', 'API testing', 'database testing', 'sample data']}
      />
      <MockDataGenerator name={tool?.name || 'AI-Powered Mock Data Generator'} description={tool?.description || 'Generate realistic test data for applications'} />
    </>
  );
}
