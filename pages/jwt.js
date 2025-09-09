import JwtDecoder from '../components/JwtDecoder';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function JwtPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/jwt');
  
  const jwtSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JWT Decoder & Validator",
    "description": "Free online JWT token decoder and validator. Decode JSON Web Tokens, inspect header and payload, validate JWT structure instantly.",
    "url": "https://yourdevtools.com/jwt",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["JWT token decoding", "Header inspection", "Payload viewing", "Token validation", "Security analysis"]
  };

  return (
    <>
      <SEO
        title="JWT Decoder & Validator - Free Online JWT Token Decoder"
        description="Free online JWT token decoder and validator. Decode JSON Web Tokens, inspect header and payload, validate JWT structure. Secure client-side processing, no token upload."
        canonical="/jwt"
        schema={jwtSchema}
        keywords={['jwt decoder', 'jwt validator', 'json web token decoder', 'jwt token decoder', 'jwt parser', 'decode jwt online']}
      />
      <JwtDecoder name={tool?.name || 'JWT Decoder'} description={tool?.description || 'Decode JWT tokens'} />
    </>
  );
}