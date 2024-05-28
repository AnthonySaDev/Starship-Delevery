"use client";
import { useState } from "react";
import CardAddress from "../CardAddress/CardAddress";

export default function ListAddress() {
  const [hasSavedAddresses, setHasSavedAddresses] = useState(true);
  const [selectedId, setSelectedId] = useState(1);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setHasSavedAddresses(true);
  };

  return (
    <>
      {hasSavedAddresses ? (
        <>
          <ul className="flex flex-col lg:grid lg:grid-cols-4 gap-5 items-center">
            {earthAddress.map((address) => (
              <CardAddress
                address={address.address}
                name={address.name}
                key={address.id}
                selected={address.id === selectedId}
                onClick={() => handleSelect(address.id)}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>No saved addresses found.</p>
      )}
    </>
  );
}

export const earthAddress = [
  {
    id: 1,
    name: "Home",
    address: {
      street: "123 Main Street",
      number: "1",
      city: "Metropolis",
      postalCode: "12345",
      country: "Brazil",
    },
  },
  {
    id: 2,
    name: "Work",
    address: {
      street: "456 Business Avenue",
      number: "10",
      city: "Metropolis",
      postalCode: "54321",
      country: "Mexico",
    },
  },
  {
    id: 3,
    name: "Friend's House",
    address: {
      street: "789 Friendship Road",
      number: "20",
      city: "Townsville",
      postalCode: "67890",
      country: "Canada",
    },
  },
  {
    id: 4,
    name: "Friend's House",
    address: {
      street: "789 Friendship Road",
      number: "20",
      city: "Townsville",
      postalCode: "67890",
      country: "Canada",
    },
  },
  {
    id: 5,
    name: "Friend's House",
    address: {
      street: "789 Friendship Road",
      number: "20",
      city: "Townsville",
      postalCode: "67890",
      country: "Canada",
    },
  },
];
