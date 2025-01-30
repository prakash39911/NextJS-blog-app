"use server";

import prisma from "@/lib/PrismaClient";

export async function ApproveBlog(blogId: string) {
  try {
    const result = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        isApproved: true,
      },
    });

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

      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: finalArray,
        },
      });
    } else {
      userExistingPermissionArray?.permissions.push("CREATE");

      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: userExistingPermissionArray?.permissions,
        },
      });
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

      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: finalArray,
        },
      });
    } else {
      userExistingPermissionArray?.permissions.push("EDIT");

      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: userExistingPermissionArray?.permissions,
        },
      });
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

      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: finalArray,
        },
      });
    } else {
      userExistingPermissionArray?.permissions.push("DELETE");

      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          permissions: userExistingPermissionArray?.permissions,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
