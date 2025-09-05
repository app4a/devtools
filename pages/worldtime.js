import dynamic from 'next/dynamic';

const WorldTime = dynamic(() => import('../components/WorldTime'), { ssr: false });

export default function WorldTimePage() {
  return <WorldTime />;
}