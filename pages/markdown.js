import MarkdownEditor from '../components/MarkdownEditor';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function MarkdownPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/markdown');
  
  const markdownSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Markdown Editor & Preview",
    "description": "Professional markdown editor with live preview, GitHub Flavored Markdown, math equations, syntax highlighting, and export options.",
    "url": "https://app4a.github.io/devtools/markdown",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Live markdown preview",
      "GitHub Flavored Markdown support",
      "Math equations with KaTeX",
      "Syntax highlighting",
      "Export to HTML/Markdown",
      "Table and code insertion",
      "Document statistics"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Technical Writers, Content Creators"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://app4a.github.io/devtools"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Markdown Editor",
        "item": "https://app4a.github.io/devtools/markdown"
      }
    ]
  };

  const combinedSchema = [markdownSchema, breadcrumbSchema];

  return (
    <>
      <SEO
        title="Markdown Editor & Preview - Free Online Tool"
        description="Professional markdown editor with live preview, GitHub Flavored Markdown, math equations, and syntax highlighting. Create documentation, README files, and formatted text instantly."
        canonical="/markdown"
        schema={combinedSchema}
        keywords={[
          'markdown editor',
          'markdown preview',
          'github flavored markdown',
          'markdown to html',
          'online markdown editor',
          'markdown processor',
          'markdown converter',
          'katex math',
          'syntax highlighting'
        ]}
      />
      <MarkdownEditor 
        name={tool?.name || 'Markdown Editor & Preview'}
        description={tool?.description || 'Professional markdown editor with live preview and advanced features'}
      />
    </>
  );
}
