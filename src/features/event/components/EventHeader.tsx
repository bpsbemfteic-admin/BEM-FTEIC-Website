import Image from "next/image";

import { EventDepartmentItem } from "@/features/event/department";

interface EventHeaderProps {
  department: EventDepartmentItem;
}

export default function EventHeader({ department }: EventHeaderProps) {
  return (
    <header>
      <h1 className="text-5xl font-extrabold text-black">{department.label}</h1>
      <div className="mt-6 flex items-center gap-4">
        <Image
          src={department.logoSrc}
          alt={`Logo ${department.organizerLabel}`}
          width={56}
          height={56}
          className="h-14 w-14 rounded-lg border border-black/10 bg-white object-contain p-1"
        />
        <p className="text-3xl text-black">{department.organizerLabel}</p>
      </div>
    </header>
  );
}
