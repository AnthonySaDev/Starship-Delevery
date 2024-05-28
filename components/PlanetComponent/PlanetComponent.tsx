import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function PlanetComponent({
  planetName,
  image,
  disabled,
}: PlanetComponentProps) {
  return (
    <Link href={disabled ? "#" : `/${planetName}`}>
      <h1 className="font-bold text-2xl">{planetName}</h1>
      <Image
        src={image}
        alt={planetName}
        width={250}
        height={250}
        className={cn(
          "cursor-pointer animate-spin-slow",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      />
    </Link>
  );
}
