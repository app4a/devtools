import JavaScriptFormatter from '../components/JavaScriptFormatter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function JavaScriptFormatterPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/javascript-formatter');
  
  const jsFormatterSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JavaScript Formatter & Minifier",
    "description": "Free online JavaScript formatter and minifier. Format, beautify, and minify JS code with syntax validation and error detection.",
    "url": "https://app4a.github.io/devtools/javascript-formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["JavaScript formatting", "Code beautification", "Code minification", "Syntax validation", "Error detection", "Customizable indentation"]
  };

  return (
    <>
      <SEO
        title="JavaScript Formatter & Minifier - Online JS Beautifier"
        description="Free online JavaScript formatter and minifier. Format, beautify, and minify JavaScript code online. Syntax validation, customizable indentation, error detection, and code optimization tools."
        canonical="/javascript-formatter"
        schema={jsFormatterSchema}
        keywords={[
          'javascript formatter',
          'js formatter',
          'javascript beautifier',
          'javascript minifier',
          'js minifier',
          'javascript validator',
          'code formatter',
          'js beautifier'
        ]}
      />
      <JavaScriptFormatter name={tool?.name || 'JavaScript Formatter & Minifier'} description={tool?.description || 'Format and minify JavaScript code'} />
    </>
  );
}
