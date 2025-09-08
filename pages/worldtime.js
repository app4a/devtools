import dynamic from 'next/dynamic';
import { toolCategories } from '../data/tools';

const WorldTime = dynamic(() => import('../components/WorldTime'), { ssr: false });

export default function WorldTimePage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/worldtime');
  return <WorldTime name={tool.name} description={tool.description} />;
}
