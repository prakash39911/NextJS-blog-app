"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function LogOutUser() {
  return <div onClick={() => signOut()}>Logout</div>;
}
