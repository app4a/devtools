import MultilineFormatter from '../components/MultilineFormatter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function MultilinePage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/multiline');
  
  const multilineSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Multiline String Formatter",
    "description": "Free online multiline string formatter. Convert multiline text to formatted arrays, SQL queries, or code snippets with custom wrapping and ending characters.",
    "url": "https://yourdevtools.com/multiline",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Multiline formatting", "Custom wrapping", "Array formatting", "SQL query formatting", "Code snippet generation"]
  };

  return (
    <>
      <SEO
        title="Multiline String Formatter - Format Text for Code & SQL"
        description="Free online multiline string formatter. Convert multiline text to formatted arrays, SQL queries, or code snippets. Customize wrapping and ending characters for any programming language."
        canonical="/multiline"
        schema={multilineSchema}
        keywords={['multiline formatter', 'string formatter', 'text formatter', 'array formatter', 'sql formatter', 'code formatter']}
      />
      <MultilineFormatter name={tool?.name || 'Multiline Formatter'} description={tool?.description || 'Format multiline strings'} />
    </>
  );
}