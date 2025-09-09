import TimestampConverter from '../components/TimestampConverter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function TimestampPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/timestamp');
  
  const timestampSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Unix Timestamp Converter",
    "description": "Free online Unix timestamp converter. Convert Unix timestamps to human-readable dates and vice versa. Support for multiple timezones and date formats.",
    "url": "https://yourdevtools.com/timestamp",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Unix timestamp conversion", "Human-readable dates", "Timezone support", "Bidirectional conversion", "Real-time updates"]
  };

  return (
    <>
      <SEO
        title="Unix Timestamp Converter - Convert Timestamps to Dates"
        description="Free online Unix timestamp converter. Convert Unix timestamps to human-readable dates and vice versa. Support for multiple timezones and instant bidirectional conversion."
        canonical="/timestamp"
        schema={timestampSchema}
        keywords={['unix timestamp converter', 'timestamp to date', 'epoch converter', 'unix time converter', 'timestamp converter online']}
      />
      <TimestampConverter name={tool?.name || 'Timestamp Converter'} description={tool?.description || 'Convert timestamps'} />
    </>
  );
}