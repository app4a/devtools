import EnvManager from '../components/EnvManager';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function EnvManagerPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/env-manager');
  
  const envManagerSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Environment Variables Manager",
    "description": "Free environment variables manager with validation, comparison, and multi-format export. Generate .env files, Docker configs, and Kubernetes secrets securely.",
    "url": "https://app4a.github.io/devtools/env-manager",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": [".env file management", "Environment comparison", "Docker configuration", "Kubernetes secrets", "Security validation", "Export formats", "Profile management", "Syntax validation"]
  };

  return (
    <>
      <SEO
        title="Environment Variables Manager - .env, Docker, Kubernetes Config"
        description="Manage environment variables with validation, comparison, and multi-format export. Generate .env files, Docker configs, and Kubernetes secrets securely with professional validation."
        canonical="/env-manager"
        schema={envManagerSchema}
        keywords={[
          'environment variables',
          'env file manager',
          'docker environment',
          'kubernetes secrets',
          'config management',
          'environment config',
          'devops tools',
          'deployment config'
        ]}
      />
      <EnvManager name={tool?.name || 'Environment Variables Manager'} description={tool?.description || 'Manage environment variables with validation and export options'} />
    </>
  );
}

