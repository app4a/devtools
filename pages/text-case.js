import TextCaseConverter from '../components/TextCaseConverter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function TextCasePage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/text-case');
  
  const textCaseSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text Case Converter",
    "description": "Free online text case converter. Convert between camelCase, PascalCase, snake_case, kebab-case, UPPER_CASE and more with batch processing.",
    "url": "https://app4a.github.io/devtools/text-case",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["camelCase conversion", "snake_case conversion", "kebab-case conversion", "PascalCase conversion", "UPPER_CASE conversion", "Batch processing", "Copy to clipboard"]
  };

  return (
    <>
      <SEO
        title="Text Case Converter - camelCase, snake_case, kebab-case & More"
        description="Free online text case converter. Convert between camelCase, PascalCase, snake_case, kebab-case, UPPER_CASE and more. Batch processing, favorites, and professional formatting options for developers."
        canonical="/text-case"
        schema={textCaseSchema}
        keywords={[
          'text case converter',
          'camelCase converter',
          'snake_case converter', 
          'kebab-case converter',
          'PascalCase converter',
          'case conversion tool',
          'naming convention converter',
          'variable name converter'
        ]}
      />
      <TextCaseConverter name={tool?.name || 'Text Case Converter'} description={tool?.description || 'Convert text between different cases'} />
    </>
  );
}
