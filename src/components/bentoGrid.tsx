import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "./ui/badge";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  source,
  link,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  source: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:bg-muted/10 dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {/* <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div> */}
      {header && (
        <img
          src={header as string}
          alt={title as string}
          className="min-h-[10rem] object-cover "
        />
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <Badge className="bg-gray-600" variant="outline">
          {source}
        </Badge>
        <div className="font-sans font-bold line-clamp-3 text-neutral-600 dark:text-neutral-200 mb-2">
          {title}
        </div>
      </div>
    </Link>
  );
};
