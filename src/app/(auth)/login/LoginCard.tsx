"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchameType, loginSchema } from "@/lib/schema/loginSchama";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";

export default function LoginCard() {
  const session = useSession();
  console.log(session);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchameType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onActualSubmit = async (data: loginSchameType) => {
    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInResponse?.ok) {
      router.push("/allblogs");
      router.refresh();
      toast("Login Successfull");
    } else {
      toast("Something went wrong");
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>
          Does not have an account.{" "}
          <span
            className="font-semibold text-blue-600 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onActualSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <div className="text-sm text-red-600">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <div className="text-sm text-red-600">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button
              type="submit"
              variant="outline"
              className="font-semibold bg-gray-500 text-gray-50 hover:bg-gray-700 hover:text-white"
            >
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
