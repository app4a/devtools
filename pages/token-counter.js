import TokenCounter from '../components/TokenCounter';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function TokenCounterPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/token-counter');

  const tokenCounterSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OpenAI Token Counter & Cost Calculator",
    "description": "Count tokens and calculate costs for OpenAI API calls. Supports GPT-3.5, GPT-4, and other models with accurate pricing and batch processing.",
    "url": "https://app4a.github.io/devtools/token-counter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["token counting", "cost calculation", "OpenAI pricing", "GPT-4 tokens", "GPT-3.5 tokens", "batch processing", "API cost estimation"]
  };

  return (
    <>
      <SEO
        title="OpenAI Token Counter & Cost Calculator - Free API Cost Tool"
        description="Calculate OpenAI API costs and count tokens for GPT-3.5, GPT-4, and other models. Get accurate pricing estimates and optimize your AI API usage."
        canonical="/token-counter"
        schema={tokenCounterSchema}
        keywords={['OpenAI token counter', 'GPT token calculator', 'API cost calculator', 'ChatGPT tokens', 'OpenAI pricing', 'token estimation', 'AI API costs']}
      />
      <TokenCounter name={tool?.name || 'OpenAI Token Counter & Cost Calculator'} description={tool?.description || 'Count tokens and calculate OpenAI API costs'} />
    </>
  );
}
