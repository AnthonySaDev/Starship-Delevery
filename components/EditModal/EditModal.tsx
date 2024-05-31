"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { CardEarthAddressProps } from "../CardEarthAddress/CardEarthAddress";
import { CardMarsAddressProps } from "../CardMarsAddress/CardMarsAddress";

export type AddressProps = CardEarthAddressProps & CardMarsAddressProps;
interface EditModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  id: number | undefined;
  onUpdate: (updatedAddress: AddressProps) => void;
}

export default function EditModal({
  openModal,
  setOpenModal,
  id,
  onUpdate,
}: EditModalProps) {
  const [selectedAddress, setSelectedAddress] = useState<
    (CardEarthAddressProps & CardMarsAddressProps) | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (openModal && id !== undefined) {
      setIsLoading(true);
      const { marsAddresses, earthAddresses } = getAddressesFromLocalStorage();
      const address =
        marsAddresses.find(
          (address: CardMarsAddressProps) => address.id === id,
        ) ||
        earthAddresses.find(
          (address: CardEarthAddressProps) => address.id === id,
        );
      setSelectedAddress(address || null);
      setIsLoading(false);
    }
  }, [openModal, id]);

  const getAddressesFromLocalStorage = () => {
    try {
      const marsAddressesString = localStorage.getItem("marsAddresses");
      const earthAddressesString = localStorage.getItem("earthAddresses");

      return {
        marsAddresses: marsAddressesString
          ? JSON.parse(marsAddressesString)
          : [],
        earthAddresses: earthAddressesString
          ? JSON.parse(earthAddressesString)
          : [],
      };
    } catch (error) {
      console.error("Error retrieving addresses from localStorage:", error);
      return {
        marsAddresses: [],
        earthAddresses: [],
      };
    }
  };

  const saveAddressesToLocalStorage = (
    marsAddresses: CardMarsAddressProps[],
    earthAddresses: CardEarthAddressProps[],
  ) => {
    localStorage.setItem("marsAddresses", JSON.stringify(marsAddresses));
    localStorage.setItem("earthAddresses", JSON.stringify(earthAddresses));
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!selectedAddress) return;

    const { name, value } = event.target;
    const [field, subfield] = name.split(".");

    if (subfield) {
      setSelectedAddress((prevState) => ({
        ...prevState!,
        address: {
          ...(prevState!.address as any),
          [subfield]: value,
        },
      }));
    } else {
      setSelectedAddress((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedAddress) {
      const { marsAddresses, earthAddresses } = getAddressesFromLocalStorage();

      if ("planet" in selectedAddress && selectedAddress.planet === "Mars") {
        const updatedMarsAddresses = marsAddresses.map(
          (address: CardMarsAddressProps) =>
            address.id === selectedAddress.id ? selectedAddress : address,
        );
        saveAddressesToLocalStorage(updatedMarsAddresses, earthAddresses);
      } else {
        const updatedEarthAddresses = earthAddresses.map(
          (address: CardEarthAddressProps) =>
            address.id === selectedAddress.id ? selectedAddress : address,
        );
        saveAddressesToLocalStorage(marsAddresses, updatedEarthAddresses);
      }

      onUpdate(selectedAddress);
      setOpenModal(false);
    }
  };

  const isEarthAddress = (
    address: CardEarthAddressProps | CardMarsAddressProps,
  ): address is CardEarthAddressProps => {
    return (address as CardEarthAddressProps).address?.street !== undefined;
  };

  const getLabel = (field: string) => {
    if (isEarthAddress(selectedAddress!)) {
      switch (field) {
        case "street":
          return "Street";
        case "number":
          return "Number";
        case "city":
          return "City";
        case "country":
          return "Country";
        default:
          return field;
      }
    } else {
      switch (field.toLowerCase()) {
        case "first":
          return "First";
        case "second":
          return "Second";
        case "third":
          return "Third";
        case "fourth":
          return "Fourth";
        default:
          return field;
      }
    }
  };

  const getValue = (field: string) => {
    if (isEarthAddress(selectedAddress!)) {
      return (selectedAddress!.address as any)[field] || "";
    } else {
      return (selectedAddress!.address as any)[field.toLowerCase()] || "";
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : selectedAddress ? (
          <>
            <DialogHeader className="flex justify-between items-center">
              <DialogTitle className="my-5">
                Edit Address ( ID: {selectedAddress.id} )
              </DialogTitle>
              <button
                onClick={() => setOpenModal(false)}
                className="text-red-500 my-3 focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 p-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedAddress.name || ""}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {isEarthAddress(selectedAddress)
                ? ["street", "number", "city", "country"].map((field) => (
                    <div className="form-group" key={field}>
                      <label htmlFor={field} className="block text-gray-700">
                        {getLabel(field)}:
                      </label>
                      <input
                        type="text"
                        id={field}
                        name={`address.${field}`}
                        value={getValue(field)}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))
                : ["first", "second", "third", "fourth"].map((field) => (
                    <div className="form-group" key={field}>
                      <label htmlFor={field} className="block text-gray-700">
                        {getLabel(field)}:
                      </label>
                      <input
                        type="text"
                        id={field}
                        name={`address.${field.toLowerCase()}`}
                        value={getValue(field)}
                        onChange={handleEditChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaSave className="mr-2" />
                Save
              </button>
            </form>
          </>
        ) : (
          <div>Address not found.</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
