import QrCodeGenerator from '../components/QrCodeGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function QrCodePage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/qr-code');
  
  const qrSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Professional QR Code Generator - Batch & Custom Templates",
    "description": "Advanced QR code generator with single/batch generation, multiple formats (PNG/SVG/PDF), customization options, and template browser. Professional-grade QR code suite.",
    "url": "https://yourdevtools.com/qr-code",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Batch QR generation", "Multiple formats (PNG/SVG/PDF)", "Template browser", "Custom styling", "Logo embedding", "Error correction levels", "Size optimization", "WiFi QR codes", "vCard QR codes", "Bulk download"]
  };

  return (
    <>
      <SEO
        title="Professional QR Code Generator - Batch, Templates & Multiple Formats"
        description="Advanced QR code generator with batch processing, multiple formats (PNG/SVG/PDF), custom templates, logo embedding, and bulk download. Professional-grade QR code suite for businesses."
        canonical="/qr-code"
        schema={qrSchema}
        keywords={['qr code generator batch', 'qr code templates professional', 'qr code svg png pdf', 'bulk qr code generator', 'custom qr codes logo', 'professional qr suite', 'business qr generator', 'vcard qr generator']}
      />
      <QrCodeGenerator name={tool?.name || 'QR Code Generator'} description={tool?.description || 'Generate QR codes for any content'} />
    </>
  );
}

