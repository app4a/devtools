import MarkdownConverter from '../components/MarkdownConverter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function MarkdownConverterPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/markdown-converter');

  const markdownConverterSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Markdown to HTML Converter",
    "description": "Convert Markdown to clean HTML with syntax highlighting, GitHub-flavored markdown, and custom CSS themes. Perfect for documentation and web development.",
    "url": "https://app4a.github.io/devtools/markdown-converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["markdown to HTML", "GitHub markdown", "syntax highlighting", "live preview", "custom CSS themes", "HTML export"]
  };

  return (
    <>
      <SEO
        title="Markdown to HTML Converter - Free Online Markdown Tool"
        description="Convert Markdown to clean HTML with GitHub-flavored markdown support, syntax highlighting, and live preview. Export with custom CSS themes."
        canonical="/markdown-converter"
        schema={markdownConverterSchema}
        keywords={['markdown to HTML', 'markdown converter', 'GitHub markdown', 'markdown parser', 'HTML generator', 'documentation tools', 'web development']}
      />
      <MarkdownConverter name={tool?.name || 'Markdown to HTML Converter'} description={tool?.description || 'Convert Markdown to HTML with live preview'} />
    </>
  );
}
