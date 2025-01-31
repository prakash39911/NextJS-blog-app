"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function ClientSessionData() {
  const session = useSession();
  return (
    <div>
      CLIENT-Side Session Data----
      {JSON.stringify(session)}
    </div>
  );
}
