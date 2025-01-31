import { getTicketsForUser } from "@/app/actions/ticketActions";
import React from "react";
import { EachTicketView } from "./EachTicketView";

export default async function AllTickets() {
  const allTickets = await getTicketsForUser();

  if (allTickets && allTickets.length === 0)
    return (
      <div className="flex vertical-center items-center">No Tickets Found</div>
    );

  return (
    <div className="container mx-auto mt-10 bg-gray-100 p-5 rounded-lg overflow-auto">
      <div className="flex w-full justify-start font-bold text-2xl mb-3">
        All Tickets
      </div>
      <div className="flex flex-wrap gap-5">
        {allTickets &&
          allTickets.map((ticket) => (
            <div key={ticket.id}>
              <EachTicketView ticket={ticket} />
            </div>
          ))}
      </div>
    </div>
  );
}
