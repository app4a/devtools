import K8sYamlGenerator from '../components/K8sYamlGenerator';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function K8sYamlGeneratorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/k8s-yaml-generator');
  
  const k8sYamlSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Kubernetes YAML Generator",
    "description": "Free Kubernetes YAML generator with visual builder, deployment templates, and best practices validation. Generate K8s configs with visual interface.",
    "url": "https://app4a.github.io/devtools/k8s-yaml-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Kubernetes YAML generation", "Visual builder", "Deployment templates", "Service configuration", "ConfigMap generation", "Secret management", "Ingress configuration", "Best practices validation"]
  };

  return (
    <>
      <SEO
        title="Kubernetes YAML Generator - Visual K8s Config Builder"
        description="Visual Kubernetes resource builder with deployment, service, and ingress generators. YAML validation, best practices checker, and Helm chart templates for DevOps teams."
        canonical="/k8s-yaml-generator"
        schema={k8sYamlSchema}
        keywords={[
          'kubernetes yaml generator',
          'k8s config generator',
          'kubernetes deployment',
          'k8s yaml builder',
          'kubernetes service',
          'deployment yaml',
          'kubernetes tools',
          'k8s templates'
        ]}
      />
      <K8sYamlGenerator name={tool?.name || 'Kubernetes YAML Generator'} description={tool?.description || 'Generate Kubernetes YAML configurations with visual builder'} />
    </>
  );
}

