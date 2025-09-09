import QrCodeGenerator from '../components/QrCodeGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function QrCodePage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/qr-code');
  
  const qrSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QR Code Generator - Free Online",
    "description": "Free online QR code generator. Create QR codes for URLs, WiFi, email, phone, SMS, and more. Customizable colors and sizes with instant download.",
    "url": "https://yourdevtools.com/qr-code",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["QR code generation", "Multiple data types", "Custom colors", "Downloadable images", "WiFi QR codes", "URL QR codes"]
  };

  return (
    <>
      <SEO
        title="QR Code Generator - Free Online QR Code Maker"
        description="Free online QR code generator. Create QR codes for URLs, WiFi networks, email, phone numbers, and more. Customize colors, size, and download instantly. No registration required."
        canonical="/qr-code"
        schema={qrSchema}
        keywords={['qr code generator', 'qr code maker', 'qr code creator', 'wifi qr code', 'url qr code', 'free qr code']}
      />
      <QrCodeGenerator name={tool?.name || 'QR Code Generator'} description={tool?.description || 'Generate QR codes for any content'} />
    </>
  );
}

