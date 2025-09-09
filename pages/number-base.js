import NumberBaseConverter from '../components/NumberBaseConverter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function NumberBasePage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/number-base');
  
  const numberBaseSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Number Base Converter - Binary, Hex, Decimal, Octal",
    "description": "Free online number base converter. Convert between binary, hexadecimal, decimal, and octal number systems. Essential tool for programmers and computer science students.",
    "url": "https://yourdevtools.com/number-base",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Number base conversion", "Binary converter", "Hex converter", "Decimal converter", "Octal converter", "Programming utilities"]
  };

  return (
    <>
      <SEO
        title="Number Base Converter - Binary, Hex, Decimal, Octal"
        description="Free online number base converter. Convert between binary, hexadecimal, decimal, and octal number systems. Perfect for programmers, students, and computer science applications."
        canonical="/number-base"
        schema={numberBaseSchema}
        keywords={['number base converter', 'binary converter', 'hex converter', 'hexadecimal converter', 'decimal to binary', 'octal converter']}
      />
      <NumberBaseConverter name={tool?.name || 'Number Base Converter'} description={tool?.description || 'Convert between number bases'} />
    </>
  );
}

