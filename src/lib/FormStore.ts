import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormStore {
  title: string;
  image: { public_id: string; url: string };
  video: { public_id: string; url: string };
  content: string;
  setTitle: (title: string) => void;
  setImage: ({ public_id, url }: { public_id: string; url: string }) => void;
  setVideo: ({ public_id, url }: { public_id: string; url: string }) => void;
  setContent: (content: string) => void;
  reset: () => void;
}

const initialState = {
  title: "",
  image: { public_id: "", url: "" },
  video: { public_id: "", url: "" },
  content: "",
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTitle: (title) => set({ title }),
      setImage: ({ public_id, url }) => set({ image: { public_id, url } }),
      setVideo: ({ public_id, url }) => set({ video: { public_id, url } }),
      setContent: (content) => set({ content }),
      reset: () => set(initialState),
    }),
    {
      name: "create-post-store",
    }
  )
);
