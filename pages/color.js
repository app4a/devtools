import ColorConverter from '../components/ColorConverter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function ColorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/color');
  
  const colorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Color Converter - HEX, RGB, HSL",
    "description": "Free online color converter between HEX, RGB, HSL formats. Interactive color picker with instant conversion and copy functionality.",
    "url": "https://yourdevtools.com/color",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["HEX to RGB conversion", "RGB to HSL conversion", "Color picker", "Instant color preview", "Copy color values"]
  };

  return (
    <>
      <SEO
        title="Color Converter - HEX, RGB, HSL Converter & Color Picker"
        description="Free online color converter between HEX, RGB, HSL formats. Interactive color picker with instant conversion. Perfect for web developers and designers."
        canonical="/color"
        schema={colorSchema}
        keywords={['color converter', 'hex to rgb', 'rgb to hsl', 'color picker', 'hex color converter', 'rgb converter', 'hsl converter']}
      />
      <ColorConverter name={tool?.name || 'Color Converter'} description={tool?.description || 'Convert colors between formats'} />
    </>
  );
}