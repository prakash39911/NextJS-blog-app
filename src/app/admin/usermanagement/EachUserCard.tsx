"use client";

import React, { useState } from "react";
import { SwitchComponent } from "./SwitchComponent";
import {
  ToggleCreatePermission,
  ToggleDeletePermission,
  ToggleEditPermission,
} from "@/app/actions/adminActions";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function EachUserCard({ user }: { user: userType }) {
  const router = useRouter();
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (user.role === "ADMIN") return;

  const isCreatePermitted = user.permissions.includes("CREATE");
  const isEditPermitted = user.permissions.includes("EDIT");
  const isDeletePermitted = user.permissions.includes("DELETE");

  const onCreateChange = async () => {
    setCreateLoading(true);
    await ToggleCreatePermission(user.id);
    setCreateLoading(false);
    router.refresh();
  };
  const onEditChange = async () => {
    setEditLoading(true);
    await ToggleEditPermission(user.id);
    setEditLoading(false);
    router.refresh();
  };
  const onDeleteChange = async () => {
    setDeleteLoading(true);
    await ToggleDeletePermission(user.id);
    setDeleteLoading(false);
    router.refresh();
  };

  return (
    <div className="w-[1180px] h-[130px] bg-gray-100 rounded-md p-2 ml-1 grid grid-cols-5 gap-2 cursor-pointer mt-2">
      <div className="col-span-1 flex items-center justify-center">
        {user.name}
      </div>

      <div className="col-span-1 flex items-center justify-center font-semibold">
        {user.email}
      </div>

      <div className="col-span-1 flex items-center justify-center font-semibold">
        {createLoading ? (
          <LoadingSpinner size={7} />
        ) : (
          <SwitchComponent
            userPermitted={isCreatePermitted}
            idText={"create"}
            labelText={"Create"}
            onChange={onCreateChange}
          />
        )}
      </div>

      <div className="col-span-1 flex items-center justify-center">
        {editLoading ? (
          <LoadingSpinner size={7} />
        ) : (
          <SwitchComponent
            userPermitted={isEditPermitted}
            idText={"edit"}
            labelText={"Edit"}
            onChange={onEditChange}
          />
        )}
      </div>

      <div className="col-span-1 flex justify-center">
        {deleteLoading ? (
          <LoadingSpinner size={7} />
        ) : (
          <SwitchComponent
            userPermitted={isDeletePermitted}
            idText={"delete"}
            labelText={"Delete"}
            onChange={onDeleteChange}
          />
        )}
      </div>
    </div>
  );
}
