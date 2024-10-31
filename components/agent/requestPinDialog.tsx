"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/agent/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "@/components/agent/ui/input";
import { Label } from "../ui/label";

const RequestPinDialog = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [open, setOpen] = useState(false);

  const phoneRegex = /^\+[1-9]\d{10,14}$/;

  const handleResendOTP = async () => {
    if (phoneRegex.test(phoneNumber) === true) {
      try {
        setDisabled(true);
        await axios({
          method: "post",
          url: "https://gmotivate.mwalimufinder.com/api/v1/users/otp/phone/resend/",
          data: {
            phone_number: phoneNumber,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              toast.success("Check your sms for a new OTP.");
            }
            setOpen(false);
            setDisabled(false);
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
        setDisabled(false);
        throw error;
      }
    } else toast.error("Please use a valid phone number");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="text-[#3AAFFF] font-medium underline"
      >
        Request PIN
      </DialogTrigger>
      <DialogContent className="lg:max-w-md rounded-md">
        <DialogHeader className="w-full text-start">
          <DialogTitle>Resend OTP</DialogTitle>
          <DialogDescription>
            Use the phone number you submitted to the admin
          </DialogDescription>
          <div className="space-y-6 pt-5">
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
                className="px-5 py-2 w-full border-border border-2 rounded-[40px] border-[#BCBEC0]"
              />
            </div>
            <Button
              type="submit"
              onClick={handleResendOTP}
              disabled={disabled}
              className="px-5 py-6 w-full bg-[#3AAFFF] hover:bg-[#359ee4] text-white font-semibold text-[1rem] rounded-[40px]"
            >
              Resend OTP
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RequestPinDialog;
