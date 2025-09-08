import ColorConverter from '../components/ColorConverter';
import { toolCategories } from '../data/tools';

export default function ColorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/color');
  return <ColorConverter name={tool.name} description={tool.description} />;
}