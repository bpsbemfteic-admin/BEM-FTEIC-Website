import clsxm from "@/lib/clsxm";

// Pita transisi antar-section agar warna mengalir (bukan blok berbatas tajam).
// `className` berisi kelas gradasi lengkap, misal "from-brand-deep to-[#F3F3F3]".
export default function SectionFade({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={clsxm("h-20 bg-gradient-to-b md:h-28", className)}
    />
  );
}
