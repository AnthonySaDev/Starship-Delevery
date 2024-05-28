import AddAddress from "@/components/AddAddress/AddAddress";
import ListAddress from "@/components/ListAddress/ListAddress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Earth() {
  return (
    <div className="flex flex-col items-center py-16 px-10 lg:px-24 min-h-screen bg-gradient-to-r to-purple-600 from-blue-600">
      <h1 className="text-3xl font-semibold mb-8 text-white">
        Welcome to Interstellar Delivery System
      </h1>
      <h2 className="text-xl font-semibold mb-3 text-white">
        Now you can edit and add Address to your profile
      </h2>

      <div className="text-lg mb-4 bg-zinc-100 py-5 rounded">
        <Tabs defaultValue="list">
          <TabsList className="flex">
            <TabsTrigger value="list">List Address</TabsTrigger>
            <TabsTrigger value="add">Add Address</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <ListAddress />
          </TabsContent>
          <TabsContent value="add">
            <AddAddress />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
