import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/usefulFunctions";
import clsx from "clsx";

export function EachTicketView({ ticket }: { ticket: userTicketType }) {
  const isResolved = ticket.resolved;

  return (
    <Card
      className={clsx(
        "w-[400px]",
        isResolved ? "shadow-sm shadow-green-400" : "shadow-sm shadow-red-400"
      )}
    >
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="flex flex-row gap-2">
          <div className="font-thin">Issue:</div>
          <div>{ticket.issue}</div>
        </CardTitle>
        <CardDescription className="flex flex-col gap-0.5 h-[85px] overflow-auto">
          <div className="font-semibold text-gray-600">Description:</div>
          <div className="font-semibold">{ticket.description}</div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-row gap-2 text-sm font-light">
        <div>Created at:</div>
        <div>{formatDate(ticket.createdAt)}</div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          disabled={isResolved}
          variant="outline"
          className={clsx(
            "",
            isResolved
              ? "text-green-500 border-2 font-bold border-green-500 hover:text-green-700"
              : "text-red-600 border-2 border-red-400 hover:text-white hover:bg-red-700"
          )}
        >
          {ticket.resolved ? "Resolved" : "Reopen"}
        </Button>
      </CardFooter>
    </Card>
  );
}
