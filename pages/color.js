import ColorConverter from '../components/ColorConverter';
import { toolCategories } from '../data/tools';

export default function ColorPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/color');
  return <ColorConverter name={tool?.name || 'Color Converter'} description={tool?.description || 'Convert colors between formats'} />;
}