import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui/accordion';

const Activity = () => {
  const even = (index: number) => index % 2 === 0;
  const processItems = [
    { title: 'Processo 1', stage: 'Análise', recruiter: 'Recrutador A', start: '01/01/2023', end: '10/01/2023' },
    { title: 'Processo 2', stage: 'Entrevista', recruiter: 'Recrutador B', start: '05/01/2023', end: '15/01/2023' },
    { title: 'Processo 3', stage: 'Seleção', recruiter: 'Recrutador C', start: '10/01/2023', end: '20/01/2023' },
  ];

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
              {processItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex p-4 rounded-md ${even(index) ? 'dark:bg-zinc-900' : 'dark:bg-transparent'}`}
                >
                  <span className="w-[25%]">{item.title}</span>
                  <span className="w-[25%]">{item.stage}</span>
                  <span className="w-[25%]">{item.recruiter}</span>
                  <span className="w-[25%]">{item.start}</span>
                  <span className="w-[25%]">{item.end}</span>
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
              {processItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex p-4 rounded-md ${even(index) ? 'dark:bg-zinc-900' : 'dark:bg-transparent'}`}
                >
                  <span className="w-[25%]">{item.title}</span>
                  <span className="w-[25%]">{item.stage}</span>
                  <span className="w-[25%]">{item.recruiter}</span>
                  <span className="w-[25%]">{item.start}</span>
                  <span className="w-[25%]">{item.end}</span>
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
