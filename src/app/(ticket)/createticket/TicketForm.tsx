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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTicketSchema,
  createTicketType,
} from "@/lib/schema/CreateTicketSchema";
import { useRouter } from "next/navigation";
import { createTicket } from "@/app/actions/ticketActions";

export function TicketForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createTicketType>({
    resolver: zodResolver(createTicketSchema),
    mode: "onTouched",
  });

  const actualSubmit = async (data: createTicketType) => {
    const result = await createTicket(data);

    if (result?.success === "true") {
      router.push("/createticket/success");
      reset();
      router.refresh();
    }
  };

  return (
    <Card className="w-[450px] h-[445px]">
      <CardHeader className="flex flex-col items-center mt-[-12px]">
        <CardTitle className="text-xl">Create Ticket</CardTitle>
        <CardDescription>Create Ticket if you have any issue!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(actualSubmit)}>
          <div className="grid w-full items-center gap-1">
            <div className="flex flex-col space-y-2.5 h-[100px]">
              <Label htmlFor="name" className="font-semibold">
                Issue
              </Label>
              <Input
                id="name"
                placeholder="Name of issue"
                {...register("issue")}
              />
              {errors.issue && (
                <div className="text-red-600">{errors.issue.message}</div>
              )}
            </div>
            <div className="h-[180px] flex gap-1 flex-col">
              <Textarea className="h-[160px]" {...register("description")} />
              {errors.description && (
                <div className="text-red-600">{errors.description.message}</div>
              )}
            </div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
