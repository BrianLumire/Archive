"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/agent/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/agent/ui/scroll-area";
import { useAuth } from "@/lib/agent_provider";

const Login = () => {
  const { setAccessToken, setRefreshToken, accessToken } = useAuth();
  const [isClient, setIsClient] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setDisabled(true);
      await axios({
        method: "post",
        url: "https://gmotivate.mwalimufinder.com/api/v1/users/phonenumber/login/",
        data: {
          phone_number: phoneNumber,
          password: password,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            const access = response.data.access;
            const refresh = response.data.refresh;
            setAccessToken(access);
            setRefreshToken(refresh);

            if (isClient) {
              const currentTime = new Date().getTime();
              const refreshTime = currentTime + 3 * 24 * 60 * 60 * 1000; // 3 days in ms

              localStorage.setItem("accessToken", access);
              localStorage.setItem("is_new", "1");
              localStorage.setItem("phone_number", phoneNumber);
              localStorage.setItem("refreshToken", refresh);
              localStorage.setItem("refreshTime", refreshTime.toString());
            }
            setDisabled(false);
            router.push("/agent");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error("Invalid credentials.");
            setDisabled(false);
          }
        });
    } catch (error) {
      setTimeout(() => {
        toast.error("An error occured.");
        throw error;
      }, 350);
    }
  };
  if (accessToken) {
    return router.push("/agent");
  } else if (accessToken === null)
    return (
      <section className="h-[90svh] w-full mx-auto flex justify-center items-center">
        <div className=" h-[95%] max-h-[700px] lg:max-h-[800px] w-11/12 lg:flex max-w-sm md:max-w-md lg:max-w-[1200px] rounded-xl lg:rounded-[40px] shadow-[1px_4px_10px_0px_#90909026] border-t-[.5px] border-t-gray-[#F5F5F5]">
          <section className="overflow-y-scroll no-scrollbar h-full flex flex-col justify-between py-5 md:px-5 px-2 lg:w-[45%]">
            <div className="space-y-4 w-full px-2 h-1/5">
              <h1 className="text-2xl text-[#414042] font-semibold">Sign In</h1>
              <p className="text-[#595D62] text-sm pb-2 lg:pb-3">
                Use your phone number and password to sign in
              </p>
            </div>
            <section className="flex flex-col justify-between py-2 gap-5 items-center w-full px-2">
              <form
                className="flex flex-col justify-between items-center w-full px-2 mt-3 gap-5"
                onSubmit={handleLogin}
              >
                <div className="w-full">
                  <Label className="text-[#414042]">Phone Number</Label>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\s+/g, ""))
                    }
                    name="phone_number"
                    required
                    placeholder="+254 7..."
                    minLength={6}
                    className="px-5 py-3 w-full border-border border-2 rounded-[40px] border-[#BCBEC0]"
                  />
                </div>
                <div className="w-full">
                  <Label className="text-[#414042]">Password</Label>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                    minLength={3}
                    placeholder="password"
                    className="px-5 py-3 w-full border-2 rounded-[40px] border-[#BCBEC0]"
                  />
                </div>
                <div className="w-full">
                  <p className="text-[.75rem] text-[#465685] text-start">
                    Are you a new agent?{" "}
                    <Link
                      href={"/agent/auth/confirm-otp"}
                      className="text-[#3AAFFF] font-medium underline"
                    >
                      Confirm OTP
                    </Link>{" "}
                  </p>
                </div>
                <Button
                  disabled={disabled}
                  type="submit"
                  className="px-5 py-6 w-full bg-[#3AAFFF] hover:bg-[#359ee4] text-white font-semibold text-[1rem] rounded-[40px]"
                >
                  Sign in
                </Button>
              </form>
            </section>
            <div className="flex justify-between bg-[#FAFAFA] border-[1px] rounded-[18px] border-[#F5F5F5] mt-28">
              <div className="flex justify-center items-start w-2/12">
                <Image
                  src={"/hugeicons_note.svg"}
                  height={30}
                  width={30}
                  alt="Note icon"
                  className="mt-5 ml-2"
                />
              </div>
              <div className="flex flex-col justify-center py-5 px-2 gap-3 w-10/12">
                <h3 className="text-[1rem] font-semibold text-[#595D62]">
                  New to Mentors?
                </h3>
                <div>
                  <p className="text-[#595D62] text-sm mb-1">
                    New G-Motivate Mentors are onboarded by the admins and their
                    login credentials sent to you over sms. Are you onboarded
                    yet?
                  </p>
                  <Link
                    className="text-[#3AAFFF] font-medium underline"
                    href={`mailto:support@gmotivate.com?subject=${encodeURIComponent(
                      "Hello Support"
                    )}`}
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </section>
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

export default Login;
