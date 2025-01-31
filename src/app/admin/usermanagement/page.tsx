import React from "react";
import CardContainer from "../../../components/CardContainer";
import EachUserCard from "./EachUserCard";
import { getAllUserDetails } from "@/app/actions/authActions";

export default async function UserManagement() {
  const alluser = await getAllUserDetails();
  const cardTitle = [
    "Name",
    "Email",
    "Create Permission",
    "Edit Permission",
    "Delete Permission",
  ];

  if (alluser?.length === 0) return <div>No User has Signed Up!</div>;

  return (
    <div className="flex vertical-center justify-center">
      <CardContainer
        cardTitle={cardTitle}
        cssStyle={"grid grid-cols-5 border border-gray-300 rounded-md p-1.5"}
      >
        {alluser &&
          alluser.map((user) => <EachUserCard key={user.id} user={user} />)}
      </CardContainer>
    </div>
  );
}
