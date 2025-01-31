"use server";

import {
  createTicketSchema,
  createTicketType,
} from "@/lib/schema/CreateTicketSchema";
import { getCurrentUserId } from "./authActions";
import prisma from "@/lib/PrismaClient";

export async function createTicket(data: createTicketType) {
  try {
    const userId = await getCurrentUserId();

    const validated = createTicketSchema.safeParse(data);

    if (!validated.success) return { error: "Validation error" };

    const { issue, description } = validated.data;

    const isTicket = await prisma.ticket.create({
      data: {
        issue,
        description,
        userId,
      },
    });

    return { success: "true", data: isTicket };
  } catch (error) {
    console.log(error);
  }
}

export async function getTicketsForUser() {
  try {
    const userId = await getCurrentUserId();

    const tickets = await prisma.ticket.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        issue: true,
        description: true,
        createdAt: true,
        resolved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tickets;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTickets() {
  try {
    const allTickets = await prisma.ticket.findMany({
      select: {
        id: true,
        issue: true,
        description: true,
        createdAt: true,
        resolved: true,
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return allTickets;
  } catch (error) {
    console.log(error);
  }
}
