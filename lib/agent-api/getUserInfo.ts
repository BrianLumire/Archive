"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User } from "@/types";
import { useAuth } from "../agent_provider";

export function GetUserInfo() {
  const { accessToken } = useAuth();
  const [userData, setUserData] = useState<User>();
  const [userId, setUserId] = useState();
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          method: "get",
          url: `https://api.gmotivate.com/api/v1/users/user/`,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the JWT token
          },
        })
          .then((response) => {
            if (response.status === 401) {
              alert("Invalid email or password");
            } else if (response.status === 200) {
              setUserData(response.data);
              setUserId(response.data.id);

              {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                response.data.referralCode !== null
                  ? setReferralCode(response.data.referral_code)
                  : setReferralCode("None");
              }
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
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
  }, [accessToken, userId]);

  return { userData, userId, referralCode };
}
