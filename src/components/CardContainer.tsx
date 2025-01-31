import React, { ReactNode } from "react";

export default function CardContainer({
  children,
  cardTitle,
  cssStyle,
}: {
  children: ReactNode;
  cardTitle: string[];
  cssStyle: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-[1200px] bg-gray-100 rounded-lg p-2 mt-3">
      <div className={cssStyle}>
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
