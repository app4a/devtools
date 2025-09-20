import LoremIpsumGenerator from '../components/LoremIpsumGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function LoremIpsumPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/lorem-ipsum');
  
  const loremIpsumSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lorem Ipsum Generator",
    "description": "Free online Lorem Ipsum generator. Generate placeholder text in Lorem Ipsum, Tech terms, or Corporate Speak with customizable formatting.",
    "url": "https://app4a.github.io/devtools/lorem-ipsum",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Lorem Ipsum generation", "Tech Lorem", "Corporate Speak", "Custom paragraph count", "HTML formatting", "Word/sentence control"]
  };

  return (
    <>
      <SEO
        title="Lorem Ipsum Generator - Placeholder Text Generator"
        description="Free online Lorem Ipsum generator. Generate Lorem Ipsum, Tech Lorem, and Corporate Speak placeholder text. Customizable paragraphs, sentences, words with HTML formatting options and statistics."
        canonical="/lorem-ipsum"
        schema={loremIpsumSchema}
        keywords={[
          'lorem ipsum generator',
          'placeholder text generator',
          'dummy text generator',
          'tech lorem generator',
          'corporate speak generator',
          'lorem ipsum tool',
          'text placeholder',
          'dummy content generator'
        ]}
      />
      <LoremIpsumGenerator name={tool?.name || 'Lorem Ipsum Generator'} description={tool?.description || 'Generate placeholder text'} />
    </>
  );
}
