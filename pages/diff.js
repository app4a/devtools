import DiffTool from '../components/DiffTool';
import { toolCategories } from '../data/tools';

export default function DiffPage() {
  const tool = toolCategories.flatMap(category => category.tools).find(t => t.path === '/diff');
  return <DiffTool name={tool?.name || 'Diff Tool'} description={tool?.description || 'Compare text differences'} />;
}