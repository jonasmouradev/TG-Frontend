import { ArrowDown } from 'lucide-react';

interface AccordionSummaryProps {
  expandIcon: React.ReactNode;
}

const AccordionSummary = ({ expandIcon = <ArrowDown /> }: AccordionSummaryProps) => (
  <div className="flex items-center justify-between p-4 cursor-pointer">
    <span className="text-lg font-semibold">Accordion Summary</span>
    <span className="text-gray-500">{expandIcon}</span>
  </div>
);

export default AccordionSummary;
