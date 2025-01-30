import React from "react";
import Link from "next/link";
import ButtonComponent from "./ButtonComponent";

export default function LoginButton() {
  return (
    <div>
      <Link href="/login">
        <ButtonComponent
          btnText={"Login"}
          cssClass="bg-gray-600 border border-gray-500 text-white font-semibold hover:bg-gray-700 hover:text-white"
        />
      </Link>
    </div>
  );
}
