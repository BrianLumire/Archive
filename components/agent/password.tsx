"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/agent/ui/dialog";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/agent_provider";
import { Input } from "@/components/agent/ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const Password = () => {
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [disabled, setDisabled] = useState(true);

  const { accessToken } = useAuth();

  useEffect(() => {
    setDisabled(false);
  }, [oldPassword, newPassword, confirmPassword]);

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const patchData = async () => {
      try {
        //Implement debounce
        setDisabled(true);
        toast.loading("Updating info", {
          duration: 1000,
        });
        await axios({
          method: "post",
          url: "https://api.gmotivate.com/api/v1/users/user/password/change/",
          data: {
            old_password: oldPassword,
            password: newPassword,
            password2: confirmPassword,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => {
          if (res.status === 200) {
            toast.success("Password Updated");
          } else if (res.status === 400) {
            toast.error("Incorrect current password.");
          }
        });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error?.response?.data.message);
      }
    };
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm passwords dont match.");
    } else patchData();
  }

  return (
    <Dialog>
      <DialogTrigger className="flex gap-3 lg:py-2 lg:px-2 lg:text-sm hover:bg-slate-100 w-full rounded-sm">
        <Image
          src={"/mage_lock.svg"}
          height={24}
          width={24}
          alt="Lock Icon"
          className="hidden lg:block"
        />
        Change Password
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle className="mb-4">Change Password</DialogTitle>
          <hr className="h-1" />
          <div className="py-3">
            <p className="text-[#595D62] py-2">Security Details</p>
            <hr className="h-1" />
          </div>
          <form onSubmit={handleUpdate}>
            <section className="grid-cols-1 lg:grid-cols-2 space-y-5">
              <div className="flex flex-col lg:flex-row w-full lg:gap-10 items-center justify-center">
                <div className="col-span-1 space-y-1 my-2 w-full lg:w-1/2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-1 space-y-1 my-2 w-full lg:w-1/2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-span-1 lg:col-span-2 space-y-1 my-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Repeat Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </section>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                disabled={disabled}
                className="bg-[#3AAFFF] rounded-2xl mt-2 font-semibold py-6 lg:py-8 hover:bg-[#38a3eb] lg:w-[14rem]"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Password;
