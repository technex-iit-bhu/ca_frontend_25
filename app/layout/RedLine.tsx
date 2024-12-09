export default function RedLine({ align }: { align: string }) {
  return (
    <div className={`mt-6 w-[35%] ${align === 'left' ? 'text-left' : 'text-right'}`}>
      <div className="h-1 w-full border-l-4 bg-red-600"></div>
    </div>
  );
}
