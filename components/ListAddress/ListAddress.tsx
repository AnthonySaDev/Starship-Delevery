"use client";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CardAddress from "../CardAddress/CardAddress";

export default function ListAddress() {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedAddresses = JSON.parse(
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
              address={address}
              name={address.name}
              key={index}
              selected={index === selectedId}
              onClick={() => handleSelect(index)}
              id={index}
            />
          ))}
        </ul>
      ) : (
        <p className="p-24">No saved addresses found.</p>
      )}
    </>
  );
}
