import UrlEncoderDecoder from '../components/UrlEncoderDecoder';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function UrlPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/url');
  
  const urlSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "URL Encoder & Decoder",
    "description": "Free online URL encoder and decoder. Encode or decode URLs, query parameters, and URL components. Handle special characters in URLs safely.",
    "url": "https://yourdevtools.com/url",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["URL encoding", "URL decoding", "Query parameter encoding", "Special character handling", "Instant conversion"]
  };

  return (
    <>
      <SEO
        title="URL Encoder & Decoder - Encode URLs Online"
        description="Free online URL encoder and decoder. Encode or decode URLs, query parameters, and URL components. Handle special characters and spaces in URLs safely and efficiently."
        canonical="/url"
        schema={urlSchema}
        keywords={['url encoder', 'url decoder', 'url encode online', 'url decode', 'percent encoding', 'query parameter encoder']}
      />
      <UrlEncoderDecoder name={tool?.name || 'URL Encoder/Decoder'} description={tool?.description || 'Encode or decode URLs'} />
    </>
  );
}