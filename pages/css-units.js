import CssUnitConverter from '../components/CssUnitConverter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function CssUnitsPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/css-units');
  
  const cssSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSS Unit Converter - px, rem, em, %",
    "description": "Free online CSS unit converter. Convert between pixels, rem, em, percentages, viewport units and more. Perfect for responsive web design.",
    "url": "https://yourdevtools.com/css-units",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["CSS unit conversion", "Responsive design helper", "px to rem converter", "viewport unit calculator", "Real-time conversion"]
  };

  return (
    <>
      <SEO
        title="CSS Unit Converter - px, rem, em, % & Viewport Units"
        description="Free online CSS unit converter. Convert between pixels, rem, em, percentages, and viewport units (vw, vh). Essential tool for responsive web design and CSS development."
        canonical="/css-units"
        schema={cssSchema}
        keywords={['css unit converter', 'px to rem', 'rem to px', 'css units', 'viewport units', 'responsive design', 'css calculator']}
      />
      <CssUnitConverter name={tool?.name || 'CSS Unit Converter'} description={tool?.description || 'Convert between CSS units'} />
    </>
  );
}

