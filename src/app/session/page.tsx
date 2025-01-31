import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import ClientSessionData from "./ClientSessionData";

export default async function page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-2 w-full">
      <div className="flex flex-col col-span-1">
        SERVER-Side Session Data--
        {JSON.stringify(session?.user)}
      </div>
      <div className="col-span-1">
        <ClientSessionData />
      </div>
    </div>
  );
}
