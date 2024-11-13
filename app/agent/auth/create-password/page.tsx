"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/agent/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/agent_provider";

const CreatePassword = () => {
  const [isClient, setIsClient] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNew, setIsNew] = useState<boolean>();
  const [OTP, setOTP] = useState("");

  const router = useRouter();

  const { setAccessToken, setRefreshToken } = useAuth();

  useEffect(() => {
    setIsClient(true);
    setOTP(localStorage.getItem("otp") as string);

    if (localStorage.getItem("is_new") === "1") {
      setIsNew(true);
    } else setIsNew(false);
  }, []);

  const handleCreatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNew === true) {
      //Check passwords
      if (password === confirmPassword) {
        try {
          await axios({
            method: "post",
            url: "https://api.gmotivate.com/api/v1/users/otp/set/password/",
            data: {
              otp_code: OTP,
              password: password,
              password2: confirmPassword,
            },
          })
            .then((response) => {
              if (response.status === 401) {
                alert("Invalid phoneNumber or password");
              } else if (response.status === 200) {
                const access = response.data.access;
                const refresh = response.data.refresh;
                setAccessToken(access);
                setRefreshToken(refresh);

                if (isClient) {
                  localStorage.setItem("accessToken", access);
                  localStorage.setItem("refreshToken", refresh);
                  localStorage.removeItem("is_new");
                  localStorage.removeItem("otp");
                  localStorage.removeItem("phone_number");
                }
                router.push("/");
              }
            })
            .catch((error) => {
              if (error.response.status === 401) {
                toast.error("Invalid credentials.");
              } else {
              }
            });
        } catch (error) {
          setTimeout(() => {
            toast.error("An error occured.");
            throw error;
          }, 350);
        }
      } else toast.error("The passwords do not match.");
    } else {
      router.push("/agent/auth/sign-in");
    }
  };

  if (isNew === false) {
    return router.push("/agent");
  }
  return (
    <section className="h-[100svh] w-full mx-auto flex justify-center items-center">
      <div className="h-[95%] max-h-[700px] lg:max-h-[800px] w-11/12 lg:flex max-w-sm md:max-w-md lg:max-w-[1200px] rounded-xl lg:rounded-[40px] shadow-[1px_4px_10px_0px_#90909026] border-t-[.5px] border-t-gray-[#F5F5F5]">
        <ScrollArea className="flex flex-col items-center justify-start h-full lg:gap-24 py-5 lg:py-10 md:px-5 px-2 lg:w-[45%]">
          <div className="space-y-4 w-full px-2">
            <h1 className="text-2xl text-[#414042] font-semibold">
              Create a Password
            </h1>
            <p className="text-[#595D62] text-sm pb-2 lg:pb-3">
              Create a password to secure your account
            </p>
          </div>
          <form
            className="flex flex-col justify-center items-center h-[80%] w-full gap-5 px-2"
            onSubmit={handleCreatePassword}
          >
            <div className="w-full">
              <Label className="text-[#414042]">New Password</Label>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Password"
                className="px-5 py-2 w-full border-border border-2 rounded-[40px] border-[#BCBEC0]"
              />
            </div>
            <div className="w-full">
              <Label className="text-[#414042]">Confirm Password</Label>
              <Input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="password"
                placeholder="Confirm Password"
                className="px-5 py-3 w-full border-2 rounded-[40px] border-[#BCBEC0]"
              />
            </div>
            <Button
              type="submit"
              className="px-5 py-6 w-full bg-[#3AAFFF] text-white font-semibold text-[1rem] rounded-[40px] mt-4 lg:mt-7"
            >
              Complete
            </Button>
          </form>
        </ScrollArea>
        <div className="hidden overflow-y-hidden lg:flex items-end justify-end pl-10 pr-[1px] h-full w-[55%] rounded-[40px] bg-gradient-to-b from-[#3AAFFF] to-[#F1F9FF]">
          <Image
            src={"/auth_graphic.svg"}
            height={800}
            width={800}
            alt="Vector Graphic of a boy reading a book"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
};

export default CreatePassword;
