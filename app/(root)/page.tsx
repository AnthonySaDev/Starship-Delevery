import CarouselPlanets from "@/components/CarouselPlanets/CarouselPlanets";
import Footer from "@/components/Footer/Footer";
import { FaRocket } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col py-16 px-10 lg:px-24 bg-gradient-to-r from-blue-800 to-purple-700 text-white relative overflow-hidden">
      <div className="relative z-10 my-5">
        <h1 className="text-5xl font-extrabold mb-8 flex items-center">
          Hello, Explorer! <FaRocket className="ml-2" />
        </h1>
        <p className="text-2xl mb-4 flex items-center">
          Welcome to our Interplanetary Delivery System
        </p>
        <p className="text-2xl mb-12 font-semibold mt-5">
          Select your destination planet:
        </p>
        <div className="w-[70%] mx-auto lg:mt-28">
          <CarouselPlanets />
        </div>
      </div>
      <Footer />
    </main>
  );
}
