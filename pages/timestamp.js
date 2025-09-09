import TimestampConverter from '../components/TimestampConverter';
import { toolCategories } from '../data/tools';

export default function TimestampPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/timestamp');
  return <TimestampConverter name={tool?.name || 'Timestamp Converter'} description={tool?.description || 'Convert timestamps'} />;
}