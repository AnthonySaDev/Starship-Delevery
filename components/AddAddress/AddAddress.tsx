"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function AddAddress() {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    number: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implemente sua lógica aqui para adicionar um novo endereço
    console.log(address);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={address.name}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Street
          <Input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Number
          <Input
            type="text"
            name="number"
            value={address.number}
            onChange={handleChange}
          />
        </Label>
        <Label>
          City
          <Input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Postal Code
          <Input
            type="text"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Country
          <Input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Add Address</Button>
      </form>
    </div>
  );
}
