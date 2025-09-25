import SvgIconGenerator from '../components/SvgIconGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function SvgIconGeneratorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/svg-icon-generator');
  
  const svgIconSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SVG Icon Generator",
    "description": "Free online SVG icon generator and editor. Create custom SVG icons with visual editor, built-in templates, and export to React/Vue components.",
    "url": "https://app4a.github.io/devtools/svg-icon-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["SVG icon creation", "Visual editor", "Icon templates", "React component export", "Vue component export", "Path manipulation", "Icon library", "Favorites management"]
  };

  return (
    <>
      <SEO
        title="SVG Icon Generator & Editor - Create Custom Icons Online"
        description="Free SVG icon generator with visual editor, built-in icon library, path manipulation, and export to React/Vue components. Perfect for designers and developers creating custom icons."
        canonical="/svg-icon-generator"
        schema={svgIconSchema}
        keywords={[
          'svg icon generator',
          'icon editor',
          'svg editor',
          'react icons',
          'vue icons',
          'custom icons',
          'vector graphics',
          'icon maker',
          'svg to component'
        ]}
      />
      <SvgIconGenerator name={tool?.name || 'SVG Icon Generator'} description={tool?.description || 'Create and edit SVG icons with templates and export options'} />
    </>
  );
}

