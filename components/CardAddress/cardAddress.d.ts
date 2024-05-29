export interface CardAddressProps {
  id?: number;
  name: string;
  address: {
    street: string;
    number: string;
    city: string;
    postalCode: string;
    country: string;
  };
  selected?: boolean;
  onClick?: () => void;
}
