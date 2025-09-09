import HashGenerator from '../components/HashGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function HashPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/hash');
  
  const hashSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Professional Hash Generator - 10+ Algorithms with HMAC",
    "description": "Advanced hash generator supporting 10+ algorithms including MD5, SHA-1/256/512, SHA-3, RIPEMD-160, and HMAC variants. Professional-grade cryptographic tool with file upload and security indicators.",
    "url": "https://yourdevtools.com/hash",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["10+ hash algorithms", "HMAC support", "SHA-3 family", "RIPEMD-160", "File upload", "Batch processing", "Security indicators", "Algorithm comparison", "Copy all hashes", "Educational content"]
  };

  return (
    <>
      <SEO
        title="Professional Hash Generator - 10+ Algorithms with HMAC & SHA-3"
        description="Advanced hash generator supporting 10+ algorithms: MD5, SHA-1/256/512, SHA-3, RIPEMD-160, and HMAC variants. Professional cryptographic tool with file upload, batch processing, and security indicators."
        canonical="/hash"
        schema={hashSchema}
        keywords={['hash generator 10 algorithms', 'hmac generator online', 'sha3 hash generator', 'ripemd160 generator', 'professional hash tool', 'cryptographic hash suite', 'batch hash generator', 'hash algorithm comparison']}
      />
      <HashGenerator name={tool?.name || 'Hash Generator'} description={tool?.description || 'Generate hashes'} />
    </>
  );
}