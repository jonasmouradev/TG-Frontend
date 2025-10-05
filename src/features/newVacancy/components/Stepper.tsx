interface StepperProps {
  readonly current: number;
  readonly total: number;
}

export default function Stepper({ current, total }: StepperProps) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-3 h-3 rounded-full ${i + 1 <= current ? 'bg-blue-600' : 'bg-gray-300'}`} />
      ))}
    </div>
  );
}
