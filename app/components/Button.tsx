"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  lable: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({
  lable,
  disabled,
  outline,
  small,
  custom,
  onClick,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-[#0067ed] flex items-center justify-center gap-2 ${
        outline ? "bg-white" : "bg-[#0067ed]"
      } ${outline ? "text-blue-700" : "text-white"} ${
        small ? "text-sm font-light" : "tex-md font-semibold"
      } ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"} ${
        custom ? custom : ""
      }`}
    >
      {Icon && <Icon size={24} />}
      {lable}
    </button>
  );
};

export default Button;
