import { getTicketsForUser } from "@/app/actions/ticketActions";
import React from "react";
import TicketWrapper from "./TicketWrapper";

export default async function AllTickets() {
  const allTickets = await getTicketsForUser();

  if (!allTickets || (allTickets && allTickets.length === 0))
    return (
      <div className="flex vertical-center items-center justify-center font-semibold text-2xl text-gray-500">
        No Tickets Found...
      </div>
    );

  return (
    <div className="container mx-auto mt-10 bg-gray-100 p-5 rounded-lg overflow-auto">
      <div className="flex w-full justify-start font-bold text-2xl mb-3">
        All Tickets
      </div>
      <TicketWrapper allTickets={allTickets} />
    </div>
  );
}
