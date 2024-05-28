import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Button } from "../ui/button";

export default function CardAddress({
  address,
  name,
  selected,
  onClick,
  id,
}: CardAddressProps) {
  return (
    <li className="min-w-[320px] relative cursor-pointer">
      <Card
        className={cn(selected && "border-2 border-purple-400")}
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-2">
          <section>
            <p>
              City: <span className="font-bold">{address.city}</span>
            </p>
            <p>
              <span className="font-light">
                {address.street}, {address.number}
              </span>
            </p>
            <p>
              Country: <span className="font-bold">{address.country}</span>
            </p>
          </section>
          <Image
            src={"/assets/map.png"}
            alt={"map"}
            width={120}
            height={120}
            className="rounded"
          />
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant={selected ? "outline" : "ghost"}
            className={cn(selected ? "cursor-pointer" : "cursor-not-allowed")}
            disabled={!selected}
          >
            <Link href={`/edit/${id}`}>
              <AiFillEdit className="mr-2" /> Edit
            </Link>
          </Button>
          <Button
            asChild
            variant={selected ? "outline" : "ghost"}
            className={cn(selected ? "cursor-pointer" : "cursor-not-allowed")}
            disabled={!selected}
          >
            <Link href={`/delete/${id}`}>
              <AiFillDelete className="mr-2" /> Delete
            </Link>
          </Button>
        </CardFooter>
      </Card>
      {selected && (
        <div className="absolute top-2 right-2 border border-purple-500  rounded-full w-3 h-3">
          <div className="bg-purple-700 w-full h-full rounded-full -p-2"></div>
        </div>
      )}
    </li>
  );
}
