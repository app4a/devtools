import ImageOptimizer from '../components/ImageOptimizer';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function ImageOptimizerPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/image-optimizer');
  
  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Optimizer & Converter",
    "description": "Professional image optimization and conversion tool. Optimize SVGs, convert between formats (WebP, AVIF, JPEG, PNG), and compress images with quality control.",
    "url": "https://app4a.github.io/devtools/image-optimizer",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "SVG optimization and compression",
      "Image format conversion (WebP, AVIF, JPEG, PNG)",
      "Quality control and compression",
      "File size analysis",
      "Drag and drop interface",
      "Batch processing",
      "Client-side processing for privacy"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Web Developers, Designers, Content Creators"
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
        "name": "Image Optimizer",
        "item": "https://app4a.github.io/devtools/image-optimizer"
      }
    ]
  };

  const combinedSchema = [imageSchema, breadcrumbSchema];

  return (
    <>
      <SEO
        title="Image Optimizer & Converter - Free Online Tool"
        description="Optimize and convert images online. Compress SVGs, convert to WebP/AVIF, resize images, and reduce file sizes while maintaining quality. Fast, secure, client-side processing."
        canonical="/image-optimizer"
        schema={combinedSchema}
        keywords={[
          'image optimizer',
          'image converter',
          'svg optimizer',
          'webp converter',
          'avif converter',
          'image compressor',
          'resize images',
          'optimize images online',
          'image format converter',
          'reduce image size'
        ]}
      />
      <ImageOptimizer 
        name={tool?.name || 'Image Optimizer & Converter'}
        description={tool?.description || 'Professional image optimization and conversion tool with quality control'}
      />
    </>
  );
}
