import RegexTester from '../components/RegexTester';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function RegexPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/regex');
  
  const regexSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Regex Tester & Validator",
    "description": "Free online regular expression tester and validator. Test regex patterns, find matches, capture groups with live highlighting and detailed explanations.",
    "url": "https://app4a.github.io/devtools/regex",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Regular expression testing", "Pattern matching", "Capture groups", "Live highlighting", "Regex validation"]
  };

  return (
    <>
      <SEO
        title="Regex Tester & Validator - Test Regular Expressions Online"
        description="Free online regex tester and validator. Test regular expressions, find pattern matches, capture groups with live highlighting. Perfect for developers and data analysts."
        canonical="/regex"
        schema={regexSchema}
        keywords={['regex tester', 'regular expression tester', 'regex validator', 'pattern matching', 'regex online', 'test regex']}
      />
      <RegexTester name={tool?.name || 'Regex Tester'} description={tool?.description || 'Test regular expressions'} />
    </>
  );
}