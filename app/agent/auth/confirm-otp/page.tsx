"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/agent/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/agent_provider";
import RequestPinDialog from "@/components/agent/requestPinDialog";

const ConfirmOTP = () => {
  const { accessToken } = useAuth();
  const [isClient, setIsClient] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isClient) {
      localStorage.setItem("otp", OTP);
      localStorage.setItem("is_new", "1");
      localStorage.setItem("phone_number", phoneNumber);

      router.push("/agent/auth/create-password");
    }
  };

  if (accessToken) {
    return router.push("/agent");
  } else if (accessToken === null)
    return (
      <section className="h-[90svh] w-full mx-auto flex justify-center items-center">
        <div className="h-[95%] max-h-[700px] lg:max-h-[800px] w-11/12 lg:flex max-w-sm md:max-w-md lg:max-w-[1200px] rounded-xl lg:rounded-[40px] shadow-[1px_4px_10px_0px_#90909026] border-t-[.5px] border-t-gray-[#F5F5F5]">
          <section className="overflow-y-scroll no-scrollbar flex flex-col justify-center items-center h-full gap-5 py-5 md:px-5 px-2 lg:w-[45%]">
            <div className="space-y-4 px-2">
              <h1 className="text-2xl text-[#414042] font-semibold">
                Confirm OTP
              </h1>
              <p className="text-[#595D62] text-sm pb-2 lg:pb-3">
                Use the phone number you submitted and the PIN shared with you
                over sms
              </p>
            </div>
            <section className="flex flex-col justify-between py-2 gap-5 items-center w-full h-[84%] lg:h-[86%] px-2">
              <form
                className="flex flex-col justify-between items-center w-full px-2 mt-3 gap-5"
                onSubmit={handleLogin}
              >
                <div className="w-full">
                  <Label className="text-[#414042]">Phone Number</Label>
                  <Input
                    type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    name="phone_number"
                    required
                    placeholder="+254 7..."
                    minLength={6}
                    className="px-5 py-2 w-full border-border border-2 rounded-[40px] border-[#BCBEC0]"
                  />
                </div>
                <div className="w-full">
                  <Label className="text-[#414042]">One Time Password</Label>
                  <Input
                    type="password"
                    onChange={(e) => setOTP(e.target.value)}
                    name="password"
                    required
                    placeholder="password"
                    minLength={3}
                    className="px-5 py-3 w-full border-2 rounded-[40px] border-[#BCBEC0]"
                  />
                </div>
                <div className="w-full">
                  <p className="text-[.75rem] text-[#465685] text-start">
                    Didn’t receive the PIN? <RequestPinDialog />
                  </p>
                </div>
                <Button
                  type="submit"
                  className="px-5 py-6 w-full bg-[#3AAFFF] hover:bg-[#359ee4] text-white font-semibold text-[1rem] rounded-[40px]"
                >
                  Confirm OTP
                </Button>
                <div className="w-full">
                  <p className="text-[.75rem] text-[#465685] text-start">
                    Already have an account?{" "}
                    <Link
                      href={"/agent/auth/sign-in"}
                      className="text-[#3AAFFF] font-medium underline"
                    >
                      Sign In
                    </Link>{" "}
                  </p>
                </div>
              </form>

              <div className="flex justify-between bg-[#FAFAFA] border-[1px] rounded-[18px] border-[#F5F5F5]">
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
                      New GMotivate Mentors are onboarded by the admins and
                      their login credentials sent to you over sms. Are you
                      onboarded yet?
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

export default ConfirmOTP;
