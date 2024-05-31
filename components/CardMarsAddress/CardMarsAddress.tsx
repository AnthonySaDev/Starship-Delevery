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

export interface CardMarsAddressProps {
  id?: number;
  name: string;
  address: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  selected?: boolean;
  handleSelect?: () => void;
  handleDelete?: () => void;
  handleModal?: () => void;
}

export default function CardMarsAddress({
  address,
  name,
  selected,
  handleSelect,
  handleDelete,
  handleModal,
}: CardMarsAddressProps) {
  return (
    <li className="min-w-full sm:min-w-[120px] md:min-w-[200px] lg:w-[220px] xl:min-w-[320px] relative cursor-pointer shadow-md rounded-lg">
      <Card
        className={cn(selected && "shadow-xl shadow-red-400 bg-red-50")}
        onClick={handleSelect}
      >
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-2">
          <section>
            <p>
              First: <span className="font-bold">{address.first}</span>
            </p>
            <p>
              Second: <span className="font-bold">{address.second}</span>
            </p>
            <p>
              Third: <span className="font-bold">{address.third}</span>
            </p>
            <p>
              Fourth: <span className="font-bold">{address.fourth}</span>
            </p>
          </section>
          <Image
            src={"/assets/mars.png"}
            alt={"mars"}
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
        <div className="absolute top-2 right-2 border border-red-800  rounded-full w-3 h-3">
          <div className="bg-red-500 w-full h-full rounded-full -p-2"></div>
        </div>
      )}
    </li>
  );
}
