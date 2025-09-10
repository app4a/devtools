import ColorConverter from '../components/ColorConverter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function ColorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/color');
  
  const colorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Professional Color Tool - Converter & Accessibility Checker",
    "description": "Advanced color tool supporting HEX, RGB, HSL, HSV, RGBA, HSLA conversion with WCAG accessibility checker, color harmony generator, and palette management.",
    "url": "https://app4a.github.io/devtools/color",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Multi-format conversion", "WCAG accessibility checker", "Color harmony generator", "Palette management", "Complementary colors", "Triadic colors", "Analogous colors", "Monochromatic colors", "Contrast ratio calculator", "Save/export palettes"]
  };

  return (
    <>
      <SEO
        title="Professional Color Tool - Converter, Accessibility & Harmony Generator"
        description="Advanced color tool supporting HEX/RGB/HSL/HSV conversion with WCAG accessibility checker, color harmony generator (complementary, triadic, analogous), and palette management. Professional-grade color suite."
        canonical="/color"
        schema={colorSchema}
        keywords={['color converter wcag accessibility', 'color harmony generator', 'color palette manager', 'hex rgb hsl hsv converter', 'contrast ratio calculator', 'complementary colors generator', 'triadic colors tool', 'professional color suite']}
      />
      <ColorConverter name={tool?.name || 'Color Converter'} description={tool?.description || 'Convert colors between formats'} />
    </>
  );
}