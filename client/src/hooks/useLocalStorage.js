import { useState } from "react";
import axios from "../utils/axios_client";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = async (newValue) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue));

      if (newValue?.userId) {
        const res = await axios.get("/api/profile/compact");
        const { fullname, dpPath } = res.data;
        const updatedValue = { ...newValue, fullname, dpPath };
        localStorage.setItem(keyName, JSON.stringify(updatedValue));
        setStoredValue(updatedValue);
      } else {
        setStoredValue(newValue);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue];
};
