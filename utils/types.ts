import { Dispatch, SetStateAction } from "react";

export type roomType = {
  $id: string;
  user_id: string;
  name: string;
  description: string;
  sqft: number;
  capacity: number;
  location: string;
  address: string;
  amenities: string;
  availability: string;
  price_per_hour: number;
  image: string;
};

export type bookingType={
    $id: string;
    user_id: string;
    check_in:string;
    check_out:string;
    room_id:roomType;
}

export type userType = {
  id: string;
  email: string;
  name: string;
};

export type authContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  currentUser: object | null;
  setCurrentUser: Dispatch<SetStateAction<userType | null>>;
};

export type prevStateType =
  | { error: string; success?: undefined }
  | { success: boolean; error?: undefined };
