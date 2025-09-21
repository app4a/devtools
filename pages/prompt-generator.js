import PromptGenerator from '../components/PromptGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function PromptGeneratorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/prompt-generator');

  const promptGeneratorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Prompt Generator & Optimizer",
    "description": "Generate and optimize AI prompts for ChatGPT, Claude, Gemini. Features templates, role-based prompts, and optimization suggestions for better AI interactions.",
    "url": "https://app4a.github.io/devtools/prompt-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["AI prompt generation", "prompt optimization", "role-based prompts", "prompt templates", "ChatGPT prompts", "Claude prompts", "Gemini prompts"]
  };

  return (
    <>
      <SEO
        title="AI Prompt Generator & Optimizer - Free AI Prompt Tool"
        description="Generate and optimize AI prompts for ChatGPT, Claude, and Gemini. Get better AI responses with our prompt templates, role-based prompts, and optimization tips."
        canonical="/prompt-generator"
        schema={promptGeneratorSchema}
        keywords={['AI prompt generator', 'ChatGPT prompts', 'Claude prompts', 'AI prompt optimizer', 'prompt templates', 'AI assistant prompts', 'machine learning prompts']}
      />
      <PromptGenerator name={tool?.name || 'AI Prompt Generator & Optimizer'} description={tool?.description || 'Generate and optimize AI prompts'} />
    </>
  );
}
