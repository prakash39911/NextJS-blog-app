import React, { ReactNode } from "react";

export default function CardContainer({
  children,
  cardTitle,
}: {
  children: ReactNode;
  cardTitle: string[];
}) {
  return (
    <div className="flex flex-col gap-2 w-[1200px] bg-gray-100 rounded-lg p-2 mt-3">
      <div className="grid grid-cols-5 border border-gray-300 rounded-md p-1.5">
        {cardTitle.map((title) => (
          <div key={title} className="col-span-1 font-bold text-lg text-center">
            {title}
          </div>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
