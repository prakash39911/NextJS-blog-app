import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TicketStore {
  allTickets: userTicketType[];
  updatedTicket: { id: string; resolved: boolean }[];
  setTickets: (tickets: userTicketType[]) => void;
  setUpdatedTicket: (updatedTicketValue: {
    id: string;
    resolved: boolean;
  }) => void;
  reset: () => void;
}

const initialState = {
  allTickets: [],
  updatedTicket: [],
};

export const TicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTickets: (tickets) => set({ allTickets: tickets }),
      setUpdatedTicket: (updatedTicketValue) =>
        set((state) => ({
          updatedTicket: [updatedTicketValue, ...state.updatedTicket],
        })),
      reset: () => set(initialState),
    }),
    {
      name: "Ticket-store",
    }
  )
);
