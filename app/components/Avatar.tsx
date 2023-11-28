import React from "react";
import Image from "next/image";
import {
  AiFillInfoCircle,
  AiFillPauseCircle,
  AiFillSketchCircle,
} from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
interface AvartarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvartarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={30}
        width={30}
      />
    );
  }

  return <BsPersonCircle size={24} color="#0067ed" />;
};

export default Avatar;
