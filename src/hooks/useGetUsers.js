import { useEffect, useState } from "react";
import { API_URL } from "../constants";

export const useGetUsers = (page) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?page=${page}&limit=20`);
      const users = await response.json();
      setUsers((current) => [...current, ...users]);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  return {
    users,
    isLoading,
    error,
  };
};
