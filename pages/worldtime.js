import dynamic from 'next/dynamic';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

const WorldTime = dynamic(() => import('../components/WorldTime'), { ssr: false });

export default function WorldTimePage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/worldtime');
  
  const worldTimeSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "World Time Clock & Timezone Converter",
    "description": "Free online world time clock showing current times in multiple cities. Add custom cities, compare timezones, and track time across the globe.",
    "url": "https://yourdevtools.com/worldtime",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["World time display", "Multiple timezone support", "Custom city addition", "Real-time updates", "Day/night indicators"]
  };

  return (
    <>
      <SEO
        title="World Time Clock - Current Time in Multiple Cities & Timezones"
        description="Free online world time clock showing current times in multiple cities worldwide. Add custom cities, compare timezones, and track time across different regions with real-time updates."
        canonical="/worldtime"
        schema={worldTimeSchema}
        keywords={['world time', 'world clock', 'timezone converter', 'current time', 'time zones', 'global time', 'city time']}
      />
      <WorldTime name={tool?.name || 'World Time'} description={tool?.description || 'View world times'} />
    </>
  );
}
