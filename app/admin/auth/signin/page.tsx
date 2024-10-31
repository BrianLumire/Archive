"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Auth_UI } from "@/components/dashboard/shared/auth_ui";
import { zodResolver } from "@hookform/resolvers/zod";

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
  ILoginSchema,
  loginSchema,
} from "@/components/dashboard/schema/main.schema";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/dashboard/auth/AuthContext";
import { toast } from "sonner";

export const dynamic = 'force-dynamic';

const SignIn = () => {
  const { login } = useAuth();
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const onSubmit = (e: FieldValues, f?: React.BaseSyntheticEvent) => {
    console.log(f);
    f?.preventDefault();
    toast.promise(login(e.email, e.password), {
      loading: "Logging in...",
      success: "Logged in successfully",
      error: (err) => err.message,
    });
  };
  return (
    <>
      <Auth_UI
        title="Welcome back,"
        description="There could be Updates Waiting for You"
      >
        <Card className=" w-full md:w-[350px] min-h-[390px] flex-col ">
          <CardHeader>
            <CardTitle className="text-xl  font-bold text-primary">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" mb:max-h-[80vh] 
    max-h-[80vh] rounded-md  flex flex-col  overflow-y-scroll p-1 gap-2"
              >
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="********"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your password to sign in
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              </form>
            </Form>
          </CardContent>
        </Card>
      </Auth_UI>
    </>
  );
};

export default SignIn;
