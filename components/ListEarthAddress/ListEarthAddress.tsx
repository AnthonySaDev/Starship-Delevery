"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardAddress, {
  CardEarthAddressProps,
} from "../CardEarthAddress/CardEarthAddress";
import EditModal from "../EditModal/EditModal";
import { Button } from "../ui/button";

export default function ListEarthAddress() {
  const [earthAddresses, setEarthAddresses] = useState<CardEarthAddressProps[]>(
    [],
  );
  const [selectedId, setSelectedId] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const savedAddresses = JSON.parse(
      localStorage.getItem("earthAddresses") || "[]",
    );
    setEarthAddresses(savedAddresses);
    setSelectedId(savedAddresses[0]?.id || 0);
  }, []);

  const handleSelect = (id: number | undefined) => {
    setSelectedId(id || 0);
  };

  const handleDelete = (id: number | undefined) => {
    toast.info(
      <div>
        <div>
          <p>Are you sure you want to delete this address?</p>
        </div>
        <div className="w-full flex justify-between px-4 my-5">
          <Button
            variant="default"
            onClick={() => {
              const filteredAddresses = earthAddresses.filter(
                (address) => address.id !== id,
              );
              setEarthAddresses(filteredAddresses);
              localStorage.setItem(
                "earthAddresses",
                JSON.stringify(filteredAddresses),
              );
              toast.success("Address deleted successfully");
              toast.dismiss();
            }}
          >
            Yes
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              toast.dismiss();
            }}
          >
            No
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
      },
    );
  };

  const handleModal = (id: number | undefined) => {
    setSelectedId(id || 0);
    setOpenModal(true);
  };

  const handleUpdate = (updatedAddress: CardEarthAddressProps) => {
    const updatedAddresses = earthAddresses.map((address) =>
      address.id === updatedAddress.id ? updatedAddress : address,
    );
    setEarthAddresses(updatedAddresses);
    localStorage.setItem("earthAddresses", JSON.stringify(updatedAddresses));
  };

  return (
    <>
      {earthAddresses.length > 0 ? (
        <ul className="flex flex-col md:grid md:grid-cols-2 gap-5 items-center">
          {earthAddresses.map((address) => (
            <CardAddress
              address={address.address}
              name={address.name}
              key={address.id}
              selected={address.id === selectedId}
              id={address.id}
              handleSelect={() => handleSelect(address.id)}
              handleDelete={() => handleDelete(address.id)}
              handleModal={() => handleModal(address.id)}
            />
          ))}
        </ul>
      ) : (
        <p>No saved addresses found.</p>
      )}
      {openModal && (
        <EditModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          id={selectedId}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
