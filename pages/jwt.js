import JwtDecoder from '../components/JwtDecoder';
import { toolCategories } from '../data/tools';

export default function JwtPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/jwt');
  return <JwtDecoder name={tool.name} description={tool.description} />;
}