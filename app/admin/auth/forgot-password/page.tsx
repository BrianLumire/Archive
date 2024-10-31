"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Auth_UI } from "@/components/dashboard/shared/auth_ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, useForm } from "react-hook-form";
import {
  IEmailSchema,
  ILoginSchema,
  loginSchema,
} from "@/components/dashboard/schema/main.schema";
import { Input } from "@/components/ui/input";
import { FaArrowLeft } from "react-icons/fa";
const ForgotPassword = () => {
  const form = useForm<IEmailSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (e: FieldValues) => {};
  return (
    <>
      <Auth_UI
        title="Welcome back,"
        description="There could be Updates Waiting for You"
      >
        <Card className=" w-full md:w-[350px]  flex-col ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" h-full  rounded-md   p-1 gap-2 flex flex-col min-h-[390px] "
            >
              <CardHeader>
                <div className="flex  items-center gap-4">
                  <Link href={"/admin/auth/signin"} className="cursor-pointer">
                    <FaArrowLeft className="text-2xl" />
                  </Link>
                  <CardTitle className="text-primary text-xl font-bold ">
                    Confirm your Email
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 h-full w-full">
                {/* grow, fill height */}
                <div className="flex-grow h-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="youremail@gmail.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter your email address to sign in
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className=" ">
                <div className="fx-col gap-2">
                  <p className="flex text-sm">
                    <span className="">Forgot Password?</span>
                    <Link
                      className="text-primary ml-1 underline"
                      href="/admin/auth/forgot-password"
                    >
                      Reset Password
                    </Link>
                  </p>
                  <div className="flex justify-end">
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </Auth_UI>
    </>
  );
};

export default ForgotPassword;
