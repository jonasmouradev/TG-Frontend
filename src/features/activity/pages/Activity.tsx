import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared';
import { useActivities } from '../hooks/useActivities';

const Activity = () => {
  const { openProcesses, closedProcesses, isLoading, error } = useActivities();
  const even = (index: number) => index % 2 === 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="text-lg">Carregando processos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="text-lg text-red-500">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full p-4 lg:border border-white/20 lg:rounded-r-md">
      <Accordion type="single" collapsible className="w-full dark:border border-white/20 mb-4 p-4 rounded-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Processos seletivos em aberto</AccordionTrigger>
          <AccordionContent>
            <ul className="flex font-bold mb-2 pl-4">
              <li className="w-[25%]">Título</li>
              <li className="w-[25%]">Etapa</li>
              <li className="w-[25%]">Recrutador</li>
              <li className="w-[25%]">Início</li>
              <li className="w-[25%]">Fim</li>
            </ul>
            <ul className="flex flex-col gap-2">
              {openProcesses.map((process, index) => (
                <li
                  key={process.id}
                  className={`flex p-4 rounded-md ${even(index) ? 'dark:bg-zinc-900' : 'dark:bg-transparent'}`}
                >
                  <span className="w-[25%]">{process.title}</span>
                  <span className="w-[25%]">{process.stage}</span>
                  <span className="w-[25%]">{process.recruiter}</span>
                  <span className="w-[25%]">{process.startDate}</span>
                  <span className="w-[25%]">{process.endDate || '-'}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full dark:border border-white/20 rounded-md mb-4 p-4">
        <AccordionItem value="item-2">
          <AccordionTrigger>Processos seletivos fechados</AccordionTrigger>
          <AccordionContent>
            <ul className="flex font-bold mb-2 pl-4">
              <li className="w-[25%]">Título</li>
              <li className="w-[25%]">Etapa</li>
              <li className="w-[25%]">Recrutador</li>
              <li className="w-[25%]">Início</li>
              <li className="w-[25%]">Fim</li>
            </ul>
            <ul className="flex flex-col gap-2">
              {closedProcesses.map((process, index) => (
                <li
                  key={process.id}
                  className={`flex p-4 rounded-md ${even(index) ? 'dark:bg-zinc-900' : 'dark:bg-transparent'}`}
                >
                  <span className="w-[25%]">{process.title}</span>
                  <span className="w-[25%]">{process.stage}</span>
                  <span className="w-[25%]">{process.recruiter}</span>
                  <span className="w-[25%]">{process.startDate}</span>
                  <span className="w-[25%]">{process.endDate || '-'}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Activity;
