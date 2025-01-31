"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
// import { ImCross } from "react-icons/im";
import ButtonComponent from "@/components/ButtonComponent";
import { MarkTicketResolved } from "@/app/actions/adminActions";
import { formatDate } from "@/lib/usefulFunctions";

export default function EachTicketView({ ticket }: { ticket: ticketType }) {
  const router = useRouter();

  const ResolveTicket = async (ticketId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await MarkTicketResolved(ticketId);
    router.refresh();
  };

  // const RejectTicket = async (ticketId: string, e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   await MarkTicketRejected(ticketId);
  //   router.refresh();
  // };

  return (
    <div className="w-[1180px] h-[130px] bg-gray-200 rounded-md p-2 ml-1 grid grid-cols-5 gap-2 mt-2">
      <div className="col-span-1 flex justify-center items-center font-semibold">
        {ticket.user.email}
      </div>

      <div className="col-span-1 flex items-center justify-center font-semibold">
        {ticket.issue}
      </div>

      <div className="col-span-1 flex flex-wrap justify-center items-center overflow-auto">
        {ticket.description}
      </div>

      <div className="col-span-1 flex items-center justify-center">
        {formatDate(ticket.createdAt)}
      </div>

      <div className="col-span-1 flex justify-center">
        {ticket.resolved ? (
          <div className="flex justify-center items-center">
            <ButtonComponent
              btnText={"Closed"}
              cssClass="text-green-600 border-2 border-green-400 w-[120px]"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <ButtonComponent
              onButtonClick={(e: React.MouseEvent) =>
                ResolveTicket(ticket.id, e)
              }
              btnText={"Mark Resolved"}
              cssClass="text-blue-600 border-2 border-blue-400 w-[140px]"
              reactIcon={FaCheck}
            />

            {/* <ButtonComponent
              onButtonClick={(e: React.MouseEvent) =>
                RejectTicket(ticket.id, e)
              }
              btnText={"Reject Request"}
              cssClass="text-red-700 border-2 border-red-400 w-[100px]"
              reactIcon={ImCross}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}
