import RegexTester from '../components/RegexTester';
import { toolCategories } from '../data/tools';

export default function RegexPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/regex');
  return <RegexTester name={tool.name} description={tool.description} />;
}