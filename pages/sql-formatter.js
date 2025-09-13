import SqlFormatter from '../components/SqlFormatter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function SqlFormatterPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/sql-formatter');
  
  const sqlSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SQL Query Formatter & Syntax Highlighter",
    "description": "Professional SQL formatting tool with syntax highlighting, validation, analysis, and support for multiple database dialects.",
    "url": "https://app4a.github.io/devtools/sql-formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "SQL query formatting",
      "Multi-dialect support (MySQL, PostgreSQL, SQL Server, Oracle, SQLite)",
      "Syntax highlighting",
      "Query validation",
      "Query analysis and metrics",
      "Copy and export functionality",
      "Error detection"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Database Developers, Data Analysts, DBAs"
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
        "name": "SQL Formatter",
        "item": "https://app4a.github.io/devtools/sql-formatter"
      }
    ]
  };

  const combinedSchema = [sqlSchema, breadcrumbSchema];

  return (
    <>
      <SEO
        title="SQL Query Formatter & Validator - Free Online Tool"
        description="Format and validate SQL queries with syntax highlighting. Supports MySQL, PostgreSQL, SQL Server, Oracle, and SQLite. Beautify your SQL code with proper indentation and formatting."
        canonical="/sql-formatter"
        schema={combinedSchema}
        keywords={[
          'sql formatter',
          'sql beautifier',
          'sql validator',
          'format sql query',
          'sql syntax highlighter',
          'mysql formatter',
          'postgresql formatter',
          'sql server formatter',
          'oracle formatter',
          'sqlite formatter'
        ]}
      />
      <SqlFormatter 
        name={tool?.name || 'SQL Query Formatter'}
        description={tool?.description || 'Professional SQL formatting tool with syntax highlighting and validation'}
      />
    </>
  );
}
