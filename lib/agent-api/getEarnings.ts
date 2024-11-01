"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../agent_provider";

export function GetEarnings() {
  const { accessToken } = useAuth();
  const [earnings, setEarnings] = useState([{}]);
  const [earningsCount, setEarningsCount] = useState<number>();

  const [earningsPageNumber, setEarningsPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          method: "get",
          url: `https://api.gmotivate.com/api/v1/agents/earnings?page=${earningsPageNumber}`,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the JWT token
          },
        }).then((response) => {
          if (response.status === 401) {
            alert("Invalid email or password");
          } else if (response.status === 200) {
            setEarnings(response.data.results);
            setEarningsCount(response?.data.count);
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
  }, [accessToken, earningsPageNumber]);

  return { earnings, earningsCount, earningsPageNumber, setEarningsPageNumber };
}
