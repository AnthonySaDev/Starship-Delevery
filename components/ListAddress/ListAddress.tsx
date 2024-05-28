"use client";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CardAddress from "../CardAddress/CardAddress";

type Address = {
  id: number;
  name: string;
  address: {
    street: string;
    number: string;
    city: string;
    postalCode: string;
    country: string;
  };
};

export default function ListAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedAddresses: Address[] = JSON.parse(
        localStorage.getItem("addresses") || "[]",
      );
      setAddresses(savedAddresses);
    } catch (err) {
      setError("Failed to load addresses. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-24">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-purple-500" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      {addresses.length > 0 ? (
        <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
          {addresses.map((address, index) => (
            <CardAddress
              address={address.address}
              name={address.name}
              key={address.id}
              selected={index === selectedId}
              onClick={() => handleSelect(address.id)}
              id={address.id}
            />
          ))}
        </ul>
      ) : (
        <p className="p-24">No saved addresses found.</p>
      )}
    </>
  );
}
