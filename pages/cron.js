import CronParser from '../components/CronParser';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function CronPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/cron');
  
  const cronSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cron Expression Parser & Validator",
    "description": "Free online cron expression parser and validator. Parse cron jobs, get human-readable descriptions, and view upcoming execution dates.",
    "url": "https://yourdevtools.com/cron",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Cron expression parsing", "Human-readable descriptions", "Upcoming dates preview", "Cron validation", "Schedule analysis"]
  };

  return (
    <>
      <SEO
        title="Cron Expression Parser & Validator - Parse Cron Jobs Online"
        description="Free online cron expression parser and validator. Parse cron jobs, get human-readable descriptions, and preview upcoming execution dates. Perfect for DevOps and system administrators."
        canonical="/cron"
        schema={cronSchema}
        keywords={['cron parser', 'cron expression', 'cron validator', 'cron job parser', 'crontab parser', 'cron schedule']}
      />
      <CronParser name={tool?.name || 'Cron Parser'} description={tool?.description || 'Parse cron expressions'} />
    </>
  );
}