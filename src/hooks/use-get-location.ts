import type { Address } from "@/types/common";
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import { useRef } from "react";

const libraries: Libraries = ["places", "marker"];

const getAddress = (address: string) => ({
  address,
  city: "",
  state: "",
  country: "",
  zipcode: "",
  latitude: "0",
  longitude: "0",
});

export const useGetLocation = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const inputRef = useRef<google.maps.places.SearchBox>(null);

  const getLocationFromPoint = (lat: number, lng: number) => {
    if (typeof window === "undefined" && isLoaded) return;
    const geocoder = new window.google.maps.Geocoder();

    const latlng = { lat, lng };

    let address = "";

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results?.[0]) {
          address = results[0].formatted_address;
        }
      }
    });

    return address;
  };

  const getLocation = (defaultLocation?: string) => {
    if (!inputRef.current) return getAddress("");
    if (!inputRef.current?.getPlaces()?.length) return {};
    const [location] = inputRef.current.getPlaces() || [];
    let address: Partial<Address> = {};
    try {
      if (!location.address_components) return getAddress("");
      location.address_components.forEach((component) => {
        if (component.types.includes("locality")) {
          address.city = component.long_name;
        } else if (component.types.includes("administrative_area_level_1")) {
          address.state = component.long_name;
        } else if (component.types.includes("country")) {
          address.country = component.long_name;
        } else if (component.types.includes("postal_code")) {
          address.zipcode = component.long_name;
        }
      });
      address.address = location?.formatted_address ?? "";
      address.latitude = (location?.geometry?.location?.lat() ?? 0).toString();
      address.longitude = (location?.geometry?.location?.lng() ?? 0).toString();
    } catch (err) {
      console.log(err);
      address = getAddress(defaultLocation ?? "");
    }

    return address;
  };

  return { inputRef, isLoaded, getLocation, getLocationFromPoint };
};
