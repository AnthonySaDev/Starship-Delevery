"use client";
import { useEffect, useState } from "react";
import CardAddress from "../CardAddress/CardAddress";
import { CardAddressProps } from "../CardAddress/cardAddress";

export default function ListAddress() {
  const [earthAddresses, setEarthAddresses] = useState<CardAddressProps[]>([]);
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    const savedAddresses = JSON.parse(
      localStorage.getItem("earthAddresses") || "[]",
    );
    setEarthAddresses(savedAddresses);
  }, []);

  const handleSelect = (id: number | undefined) => {
    setSelectedId(id || 1);
  };

  return (
    <>
      {earthAddresses.length > 0 ? (
        <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
          {earthAddresses.map((address) => (
            <CardAddress
              address={address.address}
              name={address.name}
              key={address.id}
              selected={address.id === selectedId}
              onClick={() => handleSelect(address.id)}
            />
          ))}
        </ul>
      ) : (
        <p>No saved addresses found.</p>
      )}
    </>
  );
}
