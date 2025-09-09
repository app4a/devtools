import HtmlEntityTool from '../components/HtmlEntityTool';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function HtmlEntitiesPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/html-entities');
  
  const htmlEntitySchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Professional HTML Entity Suite",
    "description": "Comprehensive HTML entity encoder/decoder with 200+ entities, category filtering, security analysis, and bulk processing. Advanced tool for web developers and security professionals.",
    "url": "https://yourdevtools.com/html-entities",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["200+ HTML entities", "Category filtering", "Security analysis", "Bulk processing", "Entity reference", "XSS prevention", "File operations", "Usage guide", "Smart encoding modes", "Search and filter"]
  };

  return (
    <>
      <SEO
        title="Professional HTML Entity Suite - 200+ Entities with Security Analysis"
        description="Comprehensive HTML entity encoder/decoder with 200+ entities, category filtering, security analysis, and bulk processing. Advanced tool for web developers with entity reference and usage guide."
        canonical="/html-entities"
        schema={htmlEntitySchema}
        keywords={['html entity encoder decoder 200', 'html entities category filter', 'html entity security analysis', 'bulk html entity processing', 'html entity reference guide', 'professional html encoder', 'xss prevention entities', 'html escape comprehensive']}
      />
      <HtmlEntityTool name={tool?.name || 'HTML Entity Encoder/Decoder'} description={tool?.description || 'Encode and decode HTML entities'} />
    </>
  );
}

