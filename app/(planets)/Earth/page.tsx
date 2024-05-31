"use client";
import AddEarthAddress from "@/components/AddEarthAddress/AddEarthAddress";
import ListEarthAddress from "@/components/ListEarthAddress/ListEarthAddress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

export default function Earth() {
  return (
    <div className="flex flex-col items-center py-16 px-10 lg:px-24 min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <Button
        className="absolute top-10 left-10 rounded-full bg-transparent border-2 hover:bg-white hover:bg-opacity-20 transition-all duration-200 ease-in-out "
        variant="outline"
        size="sm"
        onClick={() => window.history.back()}
      >
        <ArrowLeft color="white" size={28} />
      </Button>
      <h1 className="text-4xl font-bold my-8 text-white drop-shadow-lg">
        Welcome to Interstellar Delivery System
      </h1>
      <h2 className="text-2xl font-semibold mb-6 text-white drop-shadow-md">
        Now you can edit and add Address to your profile
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-10 mx-auto w-full lg:w-3/4 max-w-4xl">
        <Tabs defaultValue="list">
          <TabsList className="flex justify-center mb-6">
            <TabsTrigger
              value="list"
              className="px-4 py-2 mx-2 text-blue-700 bg-blue-100 rounded-full shadow-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              List Address
            </TabsTrigger>
            <TabsTrigger
              value="add"
              className="px-4 py-2 mx-2 text-purple-700 bg-purple-100 rounded-full shadow-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              Add Address
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className="transition-opacity duration-500 ease-in-out opacity-100">
              <ListEarthAddress />
            </div>
          </TabsContent>
          <TabsContent value="add">
            <div className="transition-opacity duration-500 ease-in-out opacity-100">
              <AddEarthAddress />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
