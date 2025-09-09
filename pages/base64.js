import Base64Converter from '../components/Base64Converter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function Base64Page() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/base64');
  
  const base64Schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Base64 Encoder & Decoder",
    "description": "Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 strings instantly with our secure browser-based tool.",
    "url": "https://yourdevtools.com/base64",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Base64 encoding", "Base64 decoding", "Instant conversion", "Secure client-side processing", "Copy to clipboard"]
  };

  return (
    <>
      <SEO
        title="Base64 Encoder & Decoder - Free Online Tool"
        description="Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 strings instantly. Secure, fast, and works entirely in your browser with no data upload required."
        canonical="/base64"
        schema={base64Schema}
        keywords={['base64 encoder', 'base64 decoder', 'base64 online', 'encode base64', 'decode base64', 'base64 converter']}
      />
      <Base64Converter name={tool?.name || 'Base64 Converter'} description={tool?.description || 'Encode or decode Base64'} />
    </>
  );
}