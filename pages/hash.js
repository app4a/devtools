import HashGenerator from '../components/HashGenerator';
import { toolCategories } from '../data/tools';

export default function HashPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/hash');
  return <HashGenerator name={tool.name} description={tool.description} />;
}