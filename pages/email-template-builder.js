import EmailTemplateBuilder from '../components/EmailTemplateBuilder';
import SEO from '../components/SEO';
import { toolCategories } from '../data/tools';

export default function EmailTemplateBuilderPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/email-template-builder');
  
  const emailTemplateSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Email Template Builder",
    "description": "Free responsive email template builder with drag-and-drop interface, pre-built components, dark mode support, and multi-client preview.",
    "url": "https://app4a.github.io/devtools/email-template-builder",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Email template builder", "Responsive design", "Drag and drop", "Multi-client preview", "HTML email generation", "Template library", "Dark mode support", "Component system"]
  };

  return (
    <>
      <SEO
        title="Email Template Builder - Responsive HTML Email Designer"
        description="Build responsive email templates with drag-and-drop interface, pre-built components, dark mode support, and multi-client preview. Export HTML with inline CSS for email campaigns."
        canonical="/email-template-builder"
        schema={emailTemplateSchema}
        keywords={[
          'email template builder',
          'html email builder',
          'responsive email design',
          'email template maker',
          'newsletter builder',
          'email marketing tools',
          'html email generator',
          'email design tool'
        ]}
      />
      <EmailTemplateBuilder name={tool?.name || 'Email Template Builder'} description={tool?.description || 'Build responsive email templates with drag-and-drop interface'} />
    </>
  );
}

