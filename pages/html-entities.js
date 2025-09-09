import HtmlEntityTool from '../components/HtmlEntityTool';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function HtmlEntitiesPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/html-entities');
  
  const htmlEntitySchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HTML Entity Encoder/Decoder",
    "description": "Free online HTML entity encoder and decoder. Convert special characters to HTML entities and vice versa. Prevent XSS and display special characters correctly.",
    "url": "https://yourdevtools.com/html-entities",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["HTML entity encoding", "HTML entity decoding", "Special character conversion", "XSS prevention", "International character support"]
  };

  return (
    <>
      <SEO
        title="HTML Entity Encoder/Decoder - Convert Special Characters"
        description="Free online HTML entity encoder and decoder. Convert special characters like <, >, &, quotes to HTML entities and back. Essential for web security and international character support."
        canonical="/html-entities"
        schema={htmlEntitySchema}
        keywords={['html entity encoder', 'html entity decoder', 'html entities', 'special characters', 'html escape', 'xss prevention']}
      />
      <HtmlEntityTool name={tool?.name || 'HTML Entity Encoder/Decoder'} description={tool?.description || 'Encode and decode HTML entities'} />
    </>
  );
}

