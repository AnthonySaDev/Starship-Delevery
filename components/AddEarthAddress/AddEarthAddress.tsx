"use client";
import React, { useState } from "react";
import { FaCity, FaGlobe, FaHome, FaRoad, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Address {
  id: number;
  name: string;
  address: {
    street: string;
    number: string;
    city: string;
    country: string;
  };
}

export default function AddEarthAddress() {
  const [address, setAddress] = useState<Address>({
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
    const { name, value } = e.target;

    if (name === "name") {
      setAddress({
        ...address,
        [name]: value,
      });
    } else {
      setAddress({
        ...address,
        address: {
          ...address.address,
          [name]: value,
        },
      });
    }
  };

  const isValidAddress = (address: Address): boolean => {
    return (
      address.name.trim() !== "" &&
      address.address.street.trim() !== "" &&
      address.address.number.trim() !== "" &&
      address.address.city.trim() !== "" &&
      address.address.country.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidAddress(address)) {
      toast.error("All fields are required and must be valid.");
      return;
    }

    try {
      const earthAddresses = JSON.parse(
        localStorage.getItem("earthAddresses") || "[]",
      );
      earthAddresses.push(address);
      localStorage.setItem("earthAddresses", JSON.stringify(earthAddresses));
      toast.success("Address added successfully");

      setAddress({
        id: Date.now(),
        name: "",
        address: {
          street: "",
          number: "",
          city: "",
          country: "",
        },
      });
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    }
  };

  return (
    <div className="min-w-[320px] lg:min-w-[800px] md:min-w-[500px] px-4 py-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Label>
          <FaUser className="inline mr-2 text-blue-500" />
          Name
          <Input
            type="text"
            name="name"
            value={address.name}
            onChange={handleChange}
            className="my-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Label>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Label>
            <FaRoad className="inline mr-2 text-blue-500" />
            Street
            <Input
              type="text"
              name="street"
              value={address.address.street}
              onChange={handleChange}
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Label>
          <Label>
            <FaHome className="inline mr-2 text-blue-500" />
            Number
            <Input
              type="text"
              name="number"
              value={address.address.number}
              onChange={handleChange}
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Label>
        </div>
        <Label>
          <FaCity className="inline mr-2 text-blue-500" />
          City
          <Input
            type="text"
            name="city"
            value={address.address.city}
            onChange={handleChange}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Label>
        <Label>
          <FaGlobe className="inline mr-2 text-blue-500" />
          Country
          <Input
            type="text"
            name="country"
            value={address.address.country}
            onChange={handleChange}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Label>
        <Button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Address
        </Button>
      </form>
    </div>
  );
}
