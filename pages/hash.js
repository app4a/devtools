import HashGenerator from '../components/HashGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function HashPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/hash');
  
  const hashSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hash Generator - MD5, SHA-1, SHA-256",
    "description": "Free online hash generator supporting MD5, SHA-1, SHA-256, SHA-512. Generate secure cryptographic hashes for passwords, files, and text instantly.",
    "url": "https://yourdevtools.com/hash",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["MD5 hash generation", "SHA-1 hashing", "SHA-256 hashing", "SHA-512 hashing", "Secure client-side processing"]
  };

  return (
    <>
      <SEO
        title="Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Online"
        description="Free online hash generator for MD5, SHA-1, SHA-256, SHA-512. Generate secure cryptographic hashes for passwords, files, and text. Fast, secure, client-side processing."
        canonical="/hash"
        schema={hashSchema}
        keywords={['hash generator', 'md5 generator', 'sha256 generator', 'sha1 hash', 'sha512 hash', 'cryptographic hash', 'password hash']}
      />
      <HashGenerator name={tool?.name || 'Hash Generator'} description={tool?.description || 'Generate hashes'} />
    </>
  );
}