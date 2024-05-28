"use client";
import { useState } from "react";
import { toast } from "react-toastify";
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

    try {
      // Buscar endereços do localStorage
      const addresses = JSON.parse(localStorage.getItem("addresses") || "[]");

      // Verifica se addresses é um array
      if (!Array.isArray(addresses)) {
        throw new Error("Stored addresses are not in the correct format.");
      }

      // Verifica se o endereço já existe
      const isDuplicate = addresses.some(
        (addr) =>
          addr.name === address.name &&
          addr.street === address.street &&
          addr.number === address.number &&
          addr.city === address.city &&
          addr.postalCode === address.postalCode &&
          addr.country === address.country,
      );

      if (isDuplicate) {
        throw new Error("This address already exists.");
      }

      // Adiciona o novo endereço ao array
      addresses.push(address);

      // Armazena o array atualizado de volta ao localStorage
      localStorage.setItem("addresses", JSON.stringify(addresses));

      // Limpa o formulário
      setAddress({
        name: "",
        street: "",
        number: "",
        city: "",
        postalCode: "",
        country: "",
      });

      toast.success("Address added successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Failed to add address: ${error.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("An unknown error occurred.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
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
