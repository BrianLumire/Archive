"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { referralDataType } from "@/types";
import { useAuth } from "../agent_provider";

export function GetReferrals() {
  const { accessToken } = useAuth();
  const [referrals, setReferalls] = useState<referralDataType[]>();
  const [referralsCount, setReferralsCount] = useState<number>();

  const [referralsPageNumber, setReferralsPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          method: "get",
          url: `https://api.gmotivate.com/api/v1/agents/referrals?page=${referralsPageNumber}`,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the JWT token
          },
        }).then((response) => {
          if (response.status === 401) {
            toast.error("Invalid credentials");
          } else if (response.status === 200) {
            setReferalls(response?.data?.results);
            setReferralsCount(response?.data?.count);
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
  }, [accessToken, referralsPageNumber]);

  return {
    referrals,
    referralsCount,
    referralsPageNumber,
    setReferralsPageNumber,
  };
}
