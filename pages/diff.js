import DiffTool from '../components/DiffTool';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function DiffPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/diff');
  
  const diffSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text Diff Tool - Compare Text Differences",
    "description": "Free online text comparison tool. Compare two text inputs side-by-side and highlight differences with color-coded changes, additions, and deletions.",
    "url": "https://yourdevtools.com/diff",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Text comparison", "Side-by-side diff", "Highlighted changes", "Line-by-line comparison", "Copy diff results"]
  };

  return (
    <>
      <SEO
        title="Text Diff Tool - Compare Text Differences Online"
        description="Free online text comparison tool. Compare two texts side-by-side with highlighted differences. Perfect for code reviews, document comparison, and content analysis."
        canonical="/diff"
        schema={diffSchema}
        keywords={['text diff', 'text comparison', 'diff tool', 'compare text', 'text compare online', 'file diff', 'code diff']}
      />
      <DiffTool name={tool?.name || 'Diff Tool'} description={tool?.description || 'Compare text differences'} />
    </>
  );
}