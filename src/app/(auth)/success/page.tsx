"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginButton from "@/components/LoginButton";

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center vertical-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl">Registration Successfull</CardTitle>
          <CardDescription>Please Login to Continue</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton />
        </CardContent>
      </Card>
    </div>
  );
}
