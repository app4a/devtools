import CronParser from '../components/CronParser';
import { toolCategories } from '../data/tools';

export default function CronPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/cron');
  return <CronParser name={tool.name} description={tool.description} />;
}