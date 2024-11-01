"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/agent/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/lib/agent_provider";
import { GetUserInfo } from "@/lib/agent-api/getUserInfo";
import { GetRegions } from "@/lib/agent-api/getRegions";
import { Input } from "@/components/agent/ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const ManageProfile = () => {
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [institution, setInstitution] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [region, setRegion] = useState<number>();
  const [disabled, setDisabled] = useState(true);

  const { userData } = GetUserInfo();
  const { accessToken } = useAuth();
  const { regions } = GetRegions();

  useEffect(() => {
    setDisabled(false);
  }, [fullName, email, institution, phoneNumber, region]);

  function getInitials(name: string) {
    if (!name?.trim()) {
      return "";
    }

    const nameArray = name.trim().split(/\s+/);
    const firstNameInitial = nameArray[0]?.charAt(0).toUpperCase() || "";
    const lastNameInitial =
      nameArray.length > 1
        ? nameArray[nameArray.length - 1].charAt(0).toUpperCase()
        : "";

    return firstNameInitial + lastNameInitial;
  }

  const nameInitials = getInitials(userData?.full_name as string);

  //Search regions array and return selected region id
  function regionFormatter(selectedRegion: string) {
    const region = regions?.find((region) => region?.name === selectedRegion);
    return region ? region?.id : undefined;
  }

  // Handlers for input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setter(e.target.value);
    setDisabled(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      fullName !== null ||
      email !== null ||
      institution !== null ||
      phoneNumber !== null ||
      region !== undefined
    ) {
      const filteredFormData = {
        ...(fullName && { full_name: fullName }),
        ...(email && { email }),
        ...(institution && { institution }),
        ...(phoneNumber && { phone_number: phoneNumber }),
        ...(region !== null && { region }), // Add region if it's not null
      };
      try {
        //IMplement debounce
        setDisabled(true);
        toast.loading("Updating info", {
          duration: 1000,
        });
        await axios({
          method: "patch",
          url: "https://api.gmotivate.com/api/v1/users/user/",
          data: filteredFormData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        toast.success("Profile updated successfully");
      } catch (error) {
        setDisabled(false);
        console.error(error);
        toast.error("An error occurred while updating the profile");
      }
    } else {
      toast.error("No changes were made.");
    }
  };

  return (
      <Dialog>
        <DialogTrigger className="flex gap-3 lg:py-2 lg:px-2 lg:text-sm hover:bg-slate-100 w-full rounded-sm">
          <Image
            src={"/basil_user-outline(1).svg"}
            height={25}
            width={25}
            alt="Profile Icon"
            className="hidden lg:block"
          />
          Manage Profile
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="lg:text-xl">
            <DialogTitle className="mb-4">Manage Profile</DialogTitle>
            <hr className="h-1" />
            <div className="flex flex-col justify-center items-center py-2 lg:py-8 gap-2">
              <div className="bg-[#F1F1F1] h-12 w-12 flex items-center justify-center rounded-full">
                {nameInitials}
              </div>
              <p>{userData?.full_name}</p>
            </div>
            <div className="text-left">
              <p className="text-[#595D62] py-1">Profile Details</p>
              <hr className="h-1" />
            </div>
            <form onSubmit={handleUpdate}>
              <section className="grid grid-cols-1 lg:gap-3 lg:gap-x-10 lg:grid-cols-2 text-left">
                <div className="col-span-1 space-y-1 my-1">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    name="full_name"
                    placeholder="Jane Doe"
                    defaultValue={userData?.full_name}
                    onChange={(e) => handleInputChange(e, setFullName)}
                  />
                </div>
                <div className="col-span-1 space-y-1 my-1">
                  <Label>Region</Label>
                  <Select
                    onValueChange={(value) => {
                      setRegion(regionFormatter(value));
                      setDisabled(false);
                    }}
                    defaultValue={userData?.region?.name}
                  >
                    <SelectTrigger className="w-full py-7 rounded-xl">
                      <SelectValue placeholder="Select a Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="w-full h-[25svh]">
                        {regions?.map((region) => (
                          <SelectItem key={region.id} value={region.name}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1 space-y-1 my-1">
                  <Label>Institution</Label>
                  <Input
                    type="text"
                    name="institution"
                    placeholder="An Awesome Institution"
                    defaultValue={userData?.institution}
                    onChange={(e) => handleInputChange(e, setInstitution)}
                  />
                </div>
                <div className="col-span-1 space-y-1 my-1">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="jane.doe@mail.com"
                    defaultValue={userData?.email}
                    onChange={(e) => handleInputChange(e, setEmail)}
                  />
                </div>
                <div className="col-span-1 space-y-1 my-1">
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    name="phone_number"
                    placeholder="+254 723 456 789"
                    defaultValue={userData?.phone_number}
                    onChange={(e) => handleInputChange(e, setPhoneNumber)}
                  />
                </div>
              </section>
              <div className="w-full flex justify-end">
                <Button
                  disabled={disabled}
                  type="submit"
                  className="bg-[#3AAFFF] rounded-2xl mt-2 font-semibold py-6 hover:bg-[#38a3eb] lg:py-8 lg:w-[14rem]"
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

export default ManageProfile;
