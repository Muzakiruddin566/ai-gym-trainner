import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProgramStore } from '@/stores/programStore';
import { Card, CardContent } from '@/components/UI/card';
import { Badge } from '@/components/UI/Badge';
import WeekTabs from '@/components/WeekTabs';

export default function ProgramPage() {
  const program = useProgramStore((state) => state.program);
  const router = useRouter();
  console.log({program});

  useEffect(() => {
    if (!program) {
      router.push('/');
    }
  }, [program]);

  if (!program) return null;



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">{program?.name}</h1>
      <WeekTabs programStructure={program.program_structure} />
    </div>

);
}
