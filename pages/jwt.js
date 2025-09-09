import JwtDecoder from '../components/JwtDecoder';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function JwtPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/jwt');
  
  const jwtSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Professional JWT Analyzer & Signature Verifier",
    "description": "Advanced JWT token analyzer with signature verification, security analysis, and multi-algorithm support. Decode, validate, and verify JWT tokens with HMAC, RSA, and ECDSA algorithms.",
    "url": "https://yourdevtools.com/jwt",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["JWT token decoding", "Signature verification", "Security analysis", "Time validation", "Multi-algorithm support", "HMAC verification", "RSA verification", "ECDSA verification", "Expiration tracking", "File operations", "Educational content"]
  };

  return (
    <>
      <SEO
        title="Professional JWT Analyzer & Signature Verifier - JWT Decoder"
        description="Advanced JWT token analyzer with signature verification, security analysis, and multi-algorithm support. Decode, validate, and verify JWT tokens with HMAC, RSA, ECDSA algorithms. Professional-grade JWT security analysis."
        canonical="/jwt"
        schema={jwtSchema}
        keywords={['jwt decoder signature verification', 'jwt analyzer security analysis', 'jwt signature verifier hmac rsa ecdsa', 'jwt token validator professional', 'jwt parser multi algorithm', 'decode jwt verify signature', 'jwt security analysis tool', 'json web token verifier']}
      />
      <JwtDecoder name={tool?.name || 'JWT Decoder'} description={tool?.description || 'Decode JWT tokens'} />
    </>
  );
}