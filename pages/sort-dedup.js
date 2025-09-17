import SortDedup from '../components/SortDedup';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function SortDedupPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/sort-dedup');
  
  const sortDedupSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text Sort & Dedup Tool - Line Sorting and Duplicate Removal",
    "description": "Professional text processing tool for sorting lines alphabetically or numerically, removing duplicates, and analyzing text statistics. Perfect for data cleaning and list management.",
    "url": "https://app4a.github.io/devtools/sort-dedup",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Alphabetical and numeric sorting",
      "Duplicate line removal",
      "Case-sensitive options",
      "Keep first/last occurrence",
      "Text statistics (lines, words, characters)",
      "File upload support",
      "Batch processing",
      "Export results"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Data Analysts, Content Managers"
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
        "name": "Sort & Dedup Tool",
        "item": "https://app4a.github.io/devtools/sort-dedup"
      }
    ]
  };

  const combinedSchema = [sortDedupSchema, breadcrumbSchema];

  return (
    <>
      <SEO
        title="Text Sort & Dedup Tool - Line Sorting and Duplicate Removal"
        description="Professional text processing tool for sorting lines alphabetically or numerically, removing duplicates, and analyzing text statistics. Perfect for cleaning email lists, log files, and data sets."
        canonical="/sort-dedup"
        schema={combinedSchema}
        keywords={[
          'text sort tool',
          'duplicate remover',
          'line deduplication',
          'text sorting',
          'data cleaning',
          'email list cleaner',
          'alphabetical sort',
          'numeric sort',
          'text statistics',
          'list organizer',
          'duplicate finder',
          'data processing'
        ]}
      />
      <SortDedup 
        name={tool?.name || 'Text Sort & Dedup Tool'}
        description={tool?.description || 'Sort lines and remove duplicates from text with statistics'}
      />
    </>
  );
}

