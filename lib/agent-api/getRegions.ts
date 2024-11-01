"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../agent_provider";

type regionType = {
  id: number;
  name: string;
  creation_time: Date;
  last_updated_time: Date;
};

export function GetRegions() {
  const { accessToken } = useAuth();
  const [regions, setRegions] = useState<regionType[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          method: "get",
          url: `https://api.gmotivate.com/api/v1/users/regions/list/`,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the JWT token
          },
        }).then((response) => {
          if (response.status === 401) {
            toast.error("Invalid credentials");
          } else if (response.status === 200) {
            setRegions(response?.data);
          }
        });
      } catch (error) {
        setTimeout(() => {
          toast.error("An error occured.");
          throw error;
        }, 350);
      }
    };
    fetchData();
  }, [accessToken]);

  return { regions };
}
