"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardMarsAddress, {
  CardMarsAddressProps,
} from "../CardMarsAddress/CardMarsAddress";
import EditModal from "../EditModal/EditModal";
import { Button } from "../ui/button";

export default function ListMarsAddress() {
  const [marsAddresses, setMarsAddresses] = useState<CardMarsAddressProps[]>(
    [],
  );
  const [selectedId, setSelectedId] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const savedAddresses = JSON.parse(
      localStorage.getItem("marsAddresses") || "[]",
    );
    setMarsAddresses(savedAddresses);
    setSelectedId(savedAddresses[0]?.id || 0);
  }, []);

  const handleSelect = (id: number | undefined) => {
    setSelectedId(id || 0);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) {
      toast.error("Invalid address ID");
      return;
    }

    toast.info(
      <div>
        <div>
          <p>Are you sure you want to delete this address?</p>
        </div>
        <div className="w-full flex justify-between px-4 my-5">
          <Button
            variant="default"
            onClick={() => {
              if (marsAddresses) {
                const filteredAddresses = marsAddresses.filter(
                  (address) => address.id !== id,
                );
                setMarsAddresses(filteredAddresses);
                localStorage.setItem(
                  "marsAddresses",
                  JSON.stringify(filteredAddresses),
                );
                toast.success("Address deleted successfully");
                toast.dismiss();
              } else {
                toast.error("No addresses available to delete");
              }
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

  const handleUpdate = (updatedAddress: CardMarsAddressProps) => {
    const updatedAddresses = marsAddresses.map((address) =>
      address.id === updatedAddress.id ? updatedAddress : address,
    );
    setMarsAddresses(updatedAddresses);
    localStorage.setItem("marsAddresses", JSON.stringify(updatedAddresses));
  };

  return (
    <>
      {marsAddresses.length > 0 ? (
        <ul className="flex flex-col md:grid md:grid-cols-2 gap-5 items-center ">
          {marsAddresses.map((address) => (
            <CardMarsAddress
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
