import CsvConverter from '../components/CsvConverter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function CsvConverterPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/csv-converter');

  const csvConverterSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV to JSON/XML Converter",
    "description": "Convert data between CSV, JSON, and XML formats with bidirectional conversion. Custom delimiters, data validation, and export options for data transformation.",
    "url": "https://app4a.github.io/devtools/csv-converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["CSV to JSON", "JSON to CSV", "CSV to XML", "XML to JSON", "data conversion", "file format converter", "data transformation"]
  };

  return (
    <>
      <SEO
        title="CSV to JSON/XML Converter - Free Data Conversion Tool"
        description="Convert between CSV, JSON, and XML formats with bidirectional conversion. Custom delimiters, headers detection, and instant data transformation."
        canonical="/csv-converter"
        schema={csvConverterSchema}
        keywords={['CSV to JSON', 'JSON to CSV', 'CSV to XML', 'XML converter', 'data converter', 'file format converter', 'data transformation', 'API data']}
      />
      <CsvConverter name={tool?.name || 'CSV to JSON/XML Converter'} description={tool?.description || 'Convert between CSV, JSON, and XML formats'} />
    </>
  );
}
