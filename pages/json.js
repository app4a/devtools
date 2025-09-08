import JsonFormatter from '../components/JsonFormatter';
import { toolCategories } from '../data/tools';

export default function JsonPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/json');
  return <JsonFormatter name={tool.name} description={tool.description} />;
}