import React from "react";
import { Button } from "./ui/button";
import { IconType } from "react-icons";

type Props = {
  onButtonClick?: (e: React.MouseEvent) => void;
  cssClass?: string;
  reactIcon?: IconType; // Icon component passed dynamically
  btnText: string;
};

export default function ButtonComponent({
  btnText,
  reactIcon: Icon, // Destructure and rename for clarity
  cssClass,
  onButtonClick,
}: Props) {
  return (
    <Button onClick={onButtonClick} variant="outline" className={cssClass}>
      {Icon && <Icon />} {/* Render the icon if provided */}
      {btnText}
    </Button>
  );
}
