import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  Plus,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import RecentHistory from "./recents";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="grid min-h-screen w-full">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src={"/logo.svg"}
                width={10}
                height={10}
                alt="logo"
                className="h-8 w-8"
              />
              <span className="">Quantum </span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Button
                variant={"outline"}
                className="flex items-center gap-3 rounded-full w-56 py-2 transition-all hover:text-white hover:bg-zinc-500"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
              <br />
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-white hover:bg-zinc-500"
              >
                <ShoppingCart className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-white hover:bg-zinc-500"
              >
                <ShoppingCart className="h-4 w-4" />
                Discover
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-white hover:bg-zinc-500"
              >
                <Users className="h-4 w-4" />
                Library
              </Link>

              <RecentHistory />
            </nav>
          </div>
          <div className="grid items-start px-2 pb-8 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex  items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <User className="h-4 w-4" />
              Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
