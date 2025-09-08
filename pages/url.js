import UrlEncoderDecoder from '../components/UrlEncoderDecoder';
import { toolCategories } from '../data/tools';

export default function UrlPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/url');
  return <UrlEncoderDecoder name={tool.name} description={tool.description} />;
}