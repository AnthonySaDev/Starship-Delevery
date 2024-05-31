"use client";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Address {
  id: number;
  name: string;
  address: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
}

export default function AddMarsAddress() {
  const [address, setAddress] = useState<Address>({
    id: Date.now(),
    name: "",
    address: {
      first: "",
      second: "",
      third: "",
      fourth: "",
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
      address.address.first.trim() !== "" &&
      address.address.second.trim() !== "" &&
      address.address.third.trim() !== "" &&
      address.address.fourth.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidAddress(address)) {
      toast.error("All fields are required and must be valid.");
      return;
    }

    try {
      const marsAddresses = JSON.parse(
        localStorage.getItem("marsAddresses") || "[]",
      );
      marsAddresses.push(address);
      localStorage.setItem("marsAddresses", JSON.stringify(marsAddresses));
      toast.success("Address added successfully");

      setAddress({
        id: Date.now(),
        name: "",
        address: {
          first: "",
          second: "",
          third: "",
          fourth: "",
        },
      });
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    }
  };

  return (
    <div className="min-w-[320px] lg:min-w-[800px] md:min-w-[500px] px-4 py-8 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Label className="flex items-center gap-2">
          <FaUser className="inline mr-2 text-red-500" />
          Name
          <Input
            type="text"
            name="name"
            value={address.name}
            onChange={handleChange}
            className="my-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Label>
        <div>
          <Label>
            <FiGrid className="inline mr-2 text-red-500" />
            First
            <Input
              type="number"
              name="first"
              value={address.address.first}
              onChange={handleChange}
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </Label>
          <Label>
            <FiGrid className="inline mr-2 text-red-500" />
            Second
            <Input
              type="number"
              name="second"
              value={address.address.second}
              onChange={handleChange}
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </Label>
        </div>
        <Label>
          <FiGrid className="inline mr-2 text-red-500" />
          Third
          <Input
            type="number"
            name="third"
            value={address.address.third}
            onChange={handleChange}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </Label>
        <Label>
          <FiGrid className="inline mr-2 text-red-500" />
          Fourth
          <Input
            type="number"
            name="fourth"
            value={address.address.fourth}
            onChange={handleChange}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </Label>
        <Button
          type="submit"
          className="p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Add Address
        </Button>
      </form>
    </div>
  );
}
