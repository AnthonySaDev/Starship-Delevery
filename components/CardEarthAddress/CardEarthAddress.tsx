import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Button } from "../ui/button";

export interface CardEarthAddressProps {
  id?: number;
  name: string;
  address: {
    street: string;
    number: string;
    city: string;
    country: string;
  };
  selected?: boolean;
  handleSelect?: () => void;
  handleDelete?: () => void;
  handleModal?: () => void;
}

export default function CardEarthAddress({
  address,
  name,
  selected,
  handleSelect,
  handleDelete,
  handleModal,
}: CardEarthAddressProps) {
  return (
    <li className="min-w-full sm:min-w-[120px] md:min-w-[200px] lg:w-[220px] xl:min-w-[320px] relative cursor-pointer shadow-md rounded-lg">
      <Card
        className={cn(selected && "shadow-xl shadow-purple-400 bg-purple-50")}
        onClick={handleSelect}
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
            src={"/assets/earth.png"}
            alt={"earth"}
            width={90}
            height={90}
            className="rounded"
          />
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant={selected ? "outline" : "ghost"}
            className={cn(selected ? "cursor-pointer" : "cursor-not-allowed")}
            disabled={!selected}
            onClick={handleModal}
          >
            <p>
              <AiFillEdit className="mr-2" /> Edit
            </p>
          </Button>
          <Button
            asChild
            variant={selected ? "outline" : "ghost"}
            className={cn(selected ? "cursor-pointer" : "cursor-not-allowed")}
            disabled={!selected}
            onClick={handleDelete}
          >
            <p>
              <AiFillDelete className="mr-2" /> Delete
            </p>
          </Button>
        </CardFooter>
      </Card>
      {selected && (
        <div className="absolute top-2 right-2 border border-purple-500  rounded-full w-3 h-3">
          <div className="bg-purple-500 w-full h-full rounded-full -p-2"></div>
        </div>
      )}
    </li>
  );
}
