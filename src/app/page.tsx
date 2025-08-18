import { MedicationIdentification } from '@/components/medication-identification';

export default function Home() {
  return (
    <div className="container mx-auto flex h-full items-center justify-center p-4 md:p-8">
      <MedicationIdentification />
    </div>
  );
}
