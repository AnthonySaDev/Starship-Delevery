"use client";
import AddMarsAddress from "@/components/AddMarsAddress/AddMarsAddress";
import ListMarsAddress from "@/components/ListMarsAddress/ListMarsAddress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

export default function Mars() {
  return (
    <div className="flex flex-col items-center py-16 px-10 lg:px-24 min-h-screen bg-gradient-to-r from-red-600 to-orange-600">
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
              className="px-4 py-2 mx-2 text-orange-700 bg-orange-100 rounded-full shadow-md hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            >
              List Address
            </TabsTrigger>
            <TabsTrigger
              value="add"
              className="px-4 py-2 mx-2 text-red-700 bg-red-100 rounded-full shadow-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              Add Address
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className="transition-opacity duration-500 ease-in-out opacity-100">
              <ListMarsAddress />
            </div>
          </TabsContent>
          <TabsContent value="add">
            <div className="transition-opacity duration-500 ease-in-out opacity-100">
              <AddMarsAddress />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
