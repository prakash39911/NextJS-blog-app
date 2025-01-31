"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CardContainer from "../../../components/CardContainer";
import EachTicketView from "./EachTicketView";

export default function TabsComponent({
  allTickets,
}: {
  allTickets: ticketType[] | undefined;
}) {
  const [activeTab, setActiveTab] = React.useState("pending");

  const cardTitle = ["Email", "Issue", "Description", "Created", "Action"];

  return (
    <div>
      <Tabs
        defaultValue="pending"
        className="w-[400px]"
        onValueChange={setActiveTab}
      >
        <TabsList className="w-[350px] h-[50px] flex flex-row gap-1">
          <TabsTrigger
            value="pending"
            className={cn(
              "w-full h-full transition-colors font-bold text-xl",
              "data-[state=active]:bg-red-500 data-[state=active]:text-white ",
              activeTab === "pending" ? "hover:text-red-500" : ""
            )}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="resolved"
            className={cn(
              "w-full h-full transition-colors font-bold text-xl",
              "data-[state=active]:bg-blue-500 data-[state=active]:text-white",
              activeTab === "resolved" ? "hover:text-blue-500" : ""
            )}
          >
            Resolved
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <CardContainer
            cardTitle={cardTitle}
            cssStyle={
              "grid grid-cols-5 border border-gray-300 rounded-md p-1.5"
            }
          >
            {allTickets &&
              allTickets.map((ticket) => {
                return (
                  <div key={ticket.id}>
                    {!ticket.resolved && <EachTicketView ticket={ticket} />}
                  </div>
                );
              })}
          </CardContainer>
        </TabsContent>
        <TabsContent value="resolved">
          <CardContainer
            cardTitle={cardTitle}
            cssStyle={
              "grid grid-cols-5 border border-gray-300 rounded-md p-1.5"
            }
          >
            {allTickets &&
              allTickets.map((ticket) => {
                return (
                  <div key={ticket.id}>
                    {ticket.resolved && <EachTicketView ticket={ticket} />}
                  </div>
                );
              })}
          </CardContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
