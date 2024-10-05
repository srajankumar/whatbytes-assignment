import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="h-24 w-full border-b flex items-center justify-between px-5">
      <Link
        href={"/"}
        className="flex md:text-3xl text-2xl font-bold gap-2 items-center"
      >
        <Image
          src={"/logo.svg"}
          alt="WhatBytes"
          width={500}
          height={500}
          className="md:w-12 w-8 md:h-12 h-8"
        />
        <p>WhatBytes</p>
      </Link>
      <div className="flex text-lg font-bold gap-3 items-center border rounded-md shadow-sm px-3 py-2">
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SK</AvatarFallback>
        </Avatar>
        <h1>Srajan Kumar</h1>
      </div>
    </nav>
  );
};

export default Header;
