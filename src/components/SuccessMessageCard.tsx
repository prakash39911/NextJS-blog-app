import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SuccessMessageCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center vertical-center">
      <Card className="w-[400px] shadow-md shadow-blue-400">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center ">
          {children && children}
        </CardContent>
      </Card>
    </div>
  );
}
