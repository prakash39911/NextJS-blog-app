import { pusherClient } from "@/lib/pusher";
import { Channel } from "pusher-js";
import { useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { BlogStore } from "./BlogStore";
import { TicketStore } from "./TicketStore";
// import { getAllBlogsForParticularUser } from "@/app/actions/blogActions";

export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null);

  const setUpdatedBlog = BlogStore((state) => state.setUpdatedBlog);
  const setUpdatedPermissionArray = BlogStore(
    (state) => state.setUpdatedPermissionArray
  );

  const setUpdatedTicket = TicketStore((state) => state.setUpdatedTicket);

  const handleApproveBlogNotification = useCallback(
    async (data: {
      id: string;
      title: string;
      image: string | null;
      userId: string;
      image_public_id: string | null;
      isApproved: boolean;
    }) => {
      toast(`Your blog Title-${data.title} is APPROVED.`, {
        duration: 5000,
        className: "text-blue-600 font-bold text-xl",
      });

      const updatedBlog = { id: data.id, isApproved: data.isApproved };

      setUpdatedBlog(updatedBlog);

      // const allBlogs = await getAllBlogsForParticularUser(data.userId);
      // if (allBlogs) {
      //   setBlog(allBlogs);
      // }
    },
    [setUpdatedBlog]
  );

  const handleCreateAllowed = async (data: {
    id: string;
    permissions: ["CREATE" | "EDIT" | "DELETE"];
  }) => {
    const isCreate = data.permissions.includes("CREATE");

    toast(`You have been given ${isCreate ? "CREATE" : ""} permission`, {
      duration: 5000,
      className: "text-bold text-xl text-green-500",
    });
  };

  const handleCreateWithdrawn = (data: {
    id: string;
    permissions: ["CREATE" | "EDIT" | "DELETE"];
  }) => {
    const isCreate = data.permissions.includes("CREATE");

    toast(`You ${isCreate ? "" : "CREATE"} permission have been withdrawn`, {
      duration: 5000,
      className: "text-bold text-xl text-red-600",
    });
  };

  const handleTicketResolved = useCallback(
    (data: {
      id: string;
      createdAt: Date;
      userId: string;
      issue: string;
      description: string;
      resolved: boolean;
    }) => {
      toast(`You Ticket having Issue-${data.issue} is Resolved`, {
        duration: 5000,
        className: "text-xl text-green-500, font-bold",
      });

      const updatedTicketValue = { id: data.id, resolved: data.resolved };

      setUpdatedTicket(updatedTicketValue);
    },
    [setUpdatedTicket]
  );

  const handEditTrue = useCallback(
    (data: Array<"CREATE" | "EDIT" | "DELETE">) => {
      toast("You have been given EDIT permission", {
        duration: 5000,
        className: "text-xl font-bold text-green-500",
      });

      setUpdatedPermissionArray(data);
    },
    [setUpdatedPermissionArray]
  );

  const handleEditFalse = useCallback(
    (data: Array<"CREATE" | "EDIT" | "DELETE">) => {
      toast("You EDIT permission have been withdrawn", {
        duration: 5000,
        className: "text-xl font-bold text-red-600",
      });

      setUpdatedPermissionArray(data);
    },
    [setUpdatedPermissionArray]
  );

  const handleDeleteTrue = useCallback(
    (data: ("CREATE" | "EDIT" | "DELETE")[]) => {
      toast("You have been given DELETE permission", {
        duration: 5000,
        className: "text-xl font-bold text-red-600",
      });

      setUpdatedPermissionArray(data);
    },
    [setUpdatedPermissionArray]
  );

  const handleDeleteFalse = useCallback(
    (data: ("CREATE" | "EDIT" | "DELETE")[]) => {
      toast("You DELETE permission have been withdrawn", {
        duration: 5000,
        className: "text-xl font-bold text-red-600",
      });

      setUpdatedPermissionArray(data);
    },
    [setUpdatedPermissionArray]
  );

  useEffect(() => {
    if (!userId) return;

    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`);
      channelRef.current.bind("blog:approve", handleApproveBlogNotification);
      channelRef.current.bind("create:true", handleCreateAllowed);
      channelRef.current.bind("create:false", handleCreateWithdrawn);
      channelRef.current.bind("ticket:resolved", handleTicketResolved);
      channelRef.current.bind("edit:true", handEditTrue);
      channelRef.current.bind("edit:false", handleEditFalse);
      channelRef.current.bind("delete:true", handleDeleteTrue);
      channelRef.current.bind("delete:false", handleDeleteFalse);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(
          "blog:approve",
          handleApproveBlogNotification
        );
        channelRef.current.unbind("create:true", handleCreateAllowed);
        channelRef.current.unbind("create:false", handleCreateWithdrawn);
        channelRef.current.unbind("ticket:resolved", handleTicketResolved);
        channelRef.current.unbind("edit:true", handEditTrue);
        channelRef.current.unbind("edit:false", handleEditFalse);
        channelRef.current.unbind("delete:true", handleDeleteTrue);
        channelRef.current.bind("delete:false", handleDeleteFalse);

        channelRef.current = null;
      }
    };
  }, [
    userId,
    handleApproveBlogNotification,
    handEditTrue,
    handleEditFalse,
    handleTicketResolved,
    handleDeleteTrue,
    handleDeleteFalse,
  ]);
};
