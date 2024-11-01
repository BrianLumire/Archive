"use client";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../agent_provider";
import { payoutsType } from "@/types";

export function GetPayouts() {
  const { accessToken } = useAuth();
  const [payouts, setPayouts] = useState<payoutsType[]>();
  const [payoutsCount, setPayoutsCount] = useState<number>();

  const [payoutsPageNumber, setPayoutsPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          method: "get",
          url: `https://api.gmotivate.com/api/v1/agents/payouts?page=${payoutsPageNumber}`,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the JWT token
          },
        }).then((response) => {
          if (response.status === 401) {
            alert("Invalid email or password");
          } else if (response.status === 200) {
            setPayouts(response.data.results);
            setPayoutsCount(response?.data.count);
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
  }, [accessToken, payoutsPageNumber]);

  return { payouts, payoutsCount, payoutsPageNumber, setPayoutsPageNumber };
}
