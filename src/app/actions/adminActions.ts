"use server";

import prisma from "@/lib/PrismaClient";
import { pusherServer } from "@/lib/pusher";

export async function ApproveBlog(blogId: string) {
  try {
    const result = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        isApproved: true,
      },
      select: {
        id: true,
        userId: true,
        image: true,
        image_public_id: true,
        title: true,
        isApproved: true,
      },
    });

    await pusherServer.trigger(
      `private-${result.userId}`,
      "blog:approve",
      result
    );

    return { success: "true", data: result };
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteBlog(blogId: string) {
  try {
    const result = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });

    return { success: "true", data: result };
  } catch (error) {
    console.log(error);
  }
}

export async function ToggleCreatePermission(userId: string) {
  try {
    const userExistingPermissionArray = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        permissions: true,
      },
    });

    const isCreatePermission =
      userExistingPermissionArray?.permissions.includes("CREATE");

    if (isCreatePermission) {
      const finalArray = userExistingPermissionArray?.permissions.filter(
        (value) => value !== "CREATE"
      );

      const updatedvalue = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: finalArray,
        },
        select: {
          id: true,
          permissions: true,
        },
      });

      await pusherServer.trigger(
        `private-${userId}`,
        "create:false",
        updatedvalue
      );

      return updatedvalue;
    } else {
      userExistingPermissionArray?.permissions.push("CREATE");

      const updatedValue = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: userExistingPermissionArray?.permissions,
        },
        select: {
          id: true,
          permissions: true,
        },
      });

      await pusherServer.trigger(
        `private-${userId}`,
        "create:true",
        updatedValue
      );

      return updatedValue;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function ToggleEditPermission(userId: string) {
  try {
    const userExistingPermissionArray = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        permissions: true,
      },
    });

    const isEditPermission =
      userExistingPermissionArray?.permissions.includes("EDIT");

    if (isEditPermission) {
      const finalArray = userExistingPermissionArray?.permissions.filter(
        (value) => value !== "EDIT"
      );

      const updatedData = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: finalArray,
        },
      });

      const updatedPermissionArray = updatedData.permissions;

      await pusherServer.trigger(
        `private-${userId}`,
        "edit:false",
        updatedPermissionArray
      );

      return updatedData;
    } else {
      userExistingPermissionArray?.permissions.push("EDIT");

      const updatedData = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: userExistingPermissionArray?.permissions,
        },
      });

      const updatedPermissionArray = updatedData.permissions;

      await pusherServer.trigger(
        `private-${userId}`,
        "edit:true",
        updatedPermissionArray
      );

      return updatedData;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function ToggleDeletePermission(userId: string) {
  try {
    const userExistingPermissionArray = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        permissions: true,
      },
    });

    const isEditPermission =
      userExistingPermissionArray?.permissions.includes("DELETE");

    if (isEditPermission) {
      const finalArray = userExistingPermissionArray?.permissions.filter(
        (value) => value !== "DELETE"
      );

      const updatedData = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: finalArray,
        },
      });

      const updatedPermissionArray = updatedData.permissions;

      await pusherServer.trigger(
        `private-${userId}`,
        "delete:false",
        updatedPermissionArray
      );

      return updatedData;
    } else {
      userExistingPermissionArray?.permissions.push("DELETE");

      const updatedData = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: userExistingPermissionArray?.permissions,
        },
      });

      const updatedPermissionArray = updatedData.permissions;

      await pusherServer.trigger(
        `private-${userId}`,
        "delete:true",
        updatedPermissionArray
      );

      return updatedData;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function MarkTicketResolved(ticketId: string, userId: string) {
  try {
    const isResolved = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        resolved: true,
      },
    });

    await pusherServer.trigger(
      `private-${userId}`,
      "ticket:resolved",
      isResolved
    );

    return { status: "success", data: isResolved };
  } catch (error) {
    console.log(error);
  }
}
