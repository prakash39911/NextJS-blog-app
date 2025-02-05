"use client";

import React, { useEffect } from "react";
import { EachTicketView } from "./EachTicketView";
import { TicketStore } from "@/hooks/TicketStore";

export default function TicketWrapper({
  allTickets,
}: {
  allTickets: userTicketType[];
}) {
  const setTickets = TicketStore((state) => state.setTickets);
  const tickets = TicketStore((state) => state.allTickets);
  const reset = TicketStore((state) => state.reset);

  useEffect(() => {
    setTickets(allTickets);

    return () => {
      reset();
    };
  }, [allTickets, reset, setTickets]);

  return (
    <div className="flex flex-wrap gap-5">
      {tickets &&
        tickets.map((ticket) => (
          <div key={ticket.id}>
            <EachTicketView ticket={ticket} />
          </div>
        ))}
    </div>
  );
}
