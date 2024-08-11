import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/bentoGrid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { getAllBlogs } from "@/actions/blog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import LoadMoreButton from "./loadMoreButton";

export default async function Blogs() {
  let blogsArr = [];

  const blogs = await getAllBlogs();

  if (blogs?.err)
    return <h4 className="text-3xl text-center"> {blogs.err} </h4>;

  blogsArr = blogs?.blogs;

  return (
    <>
      <BentoGrid className="mx-auto">
        {blogsArr &&
          blogsArr.map((item: any, i: number) => (
            <BentoGridItem
              key={item.article_id}
              title={item.title}
              source={item.source_name}
              link={item.link}
              description={item.description}
              header={item.image_url}
              icon={item.source_icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
      </BentoGrid>

      {/* <div className="flex justify-center my-4">
        <LoadMoreButton nextPage={blogs?.nextPage} />
      </div> */}
    </>
  );
}
