import PasswordGenerator from '../components/PasswordGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function PasswordGeneratorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/password-generator');
  
  const passwordSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Password Generator - Strong & Secure",
    "description": "Free online password generator. Create strong, secure passwords with customizable length, character types, and security options. No data stored.",
    "url": "https://yourdevtools.com/password-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Strong password generation", "Customizable length", "Character type selection", "Security options", "Password history", "Strength analysis"]
  };

  return (
    <>
      <SEO
        title="Password Generator - Strong & Secure Passwords Online"
        description="Free online password generator. Create strong, secure passwords with customizable length and character types. Includes strength analysis and security tips. No data stored, completely private."
        canonical="/password-generator"
        schema={passwordSchema}
        keywords={['password generator', 'strong password', 'secure password', 'random password', 'password creator', 'password maker']}
      />
      <PasswordGenerator name={tool?.name || 'Password Generator'} description={tool?.description || 'Generate strong, secure passwords'} />
    </>
  );
}

