import React from "react";
import TabsComponent from "./TabsComponent";
import { getAllTickets } from "@/app/actions/ticketActions";

export default async function Ticket() {
  const allTickets = await getAllTickets();

  if (allTickets && allTickets.length === 0)
    return (
      <div className="flex vertical-center font-semibold justify-center items-center text-xl text-gray-500">
        There is No Data...
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      <TabsComponent allTickets={allTickets} />
    </div>
  );
}
