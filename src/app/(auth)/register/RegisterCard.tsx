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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  registerSchemaType,
} from "@/lib/schema/registerSchema";
import { RegisterUser } from "@/app/actions/authActions";
import { toast } from "sonner";

export default function RegisterCard() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onActualSubmit = async (data: registerSchemaType) => {
    const result = await RegisterUser(data);

    if (!result.success) toast("User registration failed");

    if (result.success) toast("User Registed successfully");
    router.push("/register/success");
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription>
          Already have an account.{" "}
          <span
            className="font-semibold text-blue-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onActualSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <div className="text-sm text-red-600">
                  {errors.name.message}
                </div>
              )}
            </div>
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
                type="password"
                id="password"
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
              Register
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
