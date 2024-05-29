"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function AddAddress() {
  const [address, setAddress] = useState({
    id: Date.now(),
    name: "",
    address: {
      street: "",
      number: "",
      city: "",
      country: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setAddress({
      ...address,
      address: {
        ...address.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const earthAddresses = JSON.parse(
      localStorage.getItem("earthAddresses") || "[]",
    );
    earthAddresses.push(address);
    localStorage.setItem("earthAddresses", JSON.stringify(earthAddresses));
    toast.success("Address added successfully");
  };

  return (
    <div className="min-w-[320px] lg:min-w-[1000px] md:min-w-[700px] px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={address.name}
            onChange={handleChange}
            className="my-2"
          />
        </Label>
        <Label>
          Street
          <Input
            type="text"
            name="street"
            value={address.address.street}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Number
          <Input
            type="text"
            name="number"
            value={address.address.number}
            onChange={handleChange}
          />
        </Label>
        <Label>
          City
          <Input
            type="text"
            name="city"
            value={address.address.city}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Country
          <Input
            type="text"
            name="country"
            value={address.address.country}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Add Address</Button>
      </form>
    </div>
  );
}
