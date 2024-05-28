import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PlanetComponent from "../PlanetComponent/PlanetComponent";

export default function CarouselPlanets() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <PlanetComponent planetName="Earth" image="/assets/earthEx.png" />
          <p className="font-semibold lg:w-[60%]">
            Earth is the third planet from the Sun and the first astronomical
            object known to harbor life. According to radiometric dating and
            other evidence, Earth formed over 4.5 billion years ago.
          </p>
        </CarouselItem>
        <CarouselItem>
          <PlanetComponent planetName="Mars" image="/assets/marsEx.png" />
          <p className="font-semibold lg:w-[60%]">
            Mars is the fourth planet from the Sun and the second-smallest
            planet in the Solar System after Mercury. Thanks to SpaceX, Mars has
            been made habitable, allowing for human colonization and resource
            exportation.
          </p>
        </CarouselItem>
        <CarouselItem>
          <PlanetComponent
            planetName="?????"
            image="/assets/comingEx.png"
            disabled
          />
          <p className="font-semibold lg:w-[60%]">
            Studies are underway, SpaceX has started to gather resources and
            soon Earthlings will have another planet to explore and use
          </p>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
