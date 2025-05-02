"use client";

import { useRouter } from "next/navigation";
import { FaBlog } from "react-icons/fa";

export default function BlogLogo() {
  const router = useRouter();

  return (
    <div
      className="flex flex-row gap-2 items-center cursor-pointer"
      onClick={() => router.push("/")}
    >
      <span>
        <FaBlog size={28} />
      </span>
      <span className="font-bold text-4xl">Blog</span>
    </div>
  );
}
