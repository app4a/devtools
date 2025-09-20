import XmlFormatter from '../components/XmlFormatter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function XmlFormatterPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/xml-formatter');
  
  const xmlFormatterSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "XML Formatter & Validator",
    "description": "Free online XML formatter and validator. Format, validate, and minify XML with XPath tester and XML to JSON converter.",
    "url": "https://app4a.github.io/devtools/xml-formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["XML formatting", "XML validation", "XML minification", "XPath testing", "XML to JSON conversion", "Syntax error detection"]
  };

  return (
    <>
      <SEO
        title="XML Formatter & Validator - Online XML Beautifier with XPath"
        description="Free online XML formatter and validator. Format, validate, and minify XML online. XPath tester, XML to JSON converter, syntax validation, and error detection with professional development tools."
        canonical="/xml-formatter"
        schema={xmlFormatterSchema}
        keywords={[
          'xml formatter',
          'xml validator',
          'xml beautifier',
          'xml minifier',
          'xpath tester',
          'xml to json converter',
          'xml parser',
          'xml validator online'
        ]}
      />
      <XmlFormatter name={tool?.name || 'XML Formatter & Validator'} description={tool?.description || 'Format and validate XML'} />
    </>
  );
}
