import React from "react";
import Link from "next/link";
import ButtonComponent from "./ButtonComponent";

export default function RegisterButton() {
  return (
    <div>
      <Link href="/register">
        <ButtonComponent
          btnText="Register"
          cssClass={
            "bg-gray-600 border border-gray-500 text-white font-semibold hover:bg-gray-700 hover:text-white"
          }
        />
      </Link>
    </div>
  );
}
