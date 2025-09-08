import MultilineFormatter from '../components/MultilineFormatter';
import { toolCategories } from '../data/tools';

export default function MultilinePage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/multiline');
  return <MultilineFormatter name={tool.name} description={tool.description} />;
}