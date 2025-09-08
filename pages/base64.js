import Base64Converter from '../components/Base64Converter';
import { toolCategories } from '../data/tools';

export default function Base64Page() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/base64');
  return <Base64Converter name={tool.name} description={tool.description} />;
}