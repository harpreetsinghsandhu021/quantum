import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecentHistory = () => {
  const data = [
    {
      id: 1,
      user: "Alice Johnson",
      timestamp: "2024-08-08T10:15:00",
      messageSnippet: "Can you help me find a good Italian restaurant nearby?",
    },
    {
      id: 2,
      user: "Bob Smith",
      timestamp: "2024-08-08T09:45:00",
      messageSnippet:
        "What are the latest updates on the project we discussed?",
    },
    {
      id: 3,
      user: "Carol Lee",
      timestamp: "2024-08-07T17:30:00",
      messageSnippet: "I need assistance with my account settings.",
    },
    {
      id: 4,
      user: "David Brown",
      timestamp: "2024-08-07T15:15:00",
      messageSnippet: "What’s the weather like this weekend?",
    },
    {
      id: 5,
      user: "Emma Wilson",
      timestamp: "2024-08-06T11:00:00",
      messageSnippet: "Can you recommend a good book for beginners in AI?",
    },
    {
      id: 6,
      user: "Frank Garcia",
      timestamp: "2024-08-05T14:45:00",
      messageSnippet: "How do I reset my password?",
    },
  ];

  return (
    <ul className="border-l-2 ml-4 py-2 pl-1">
      {data.map((d) => {
        return (
          <li className="group text-xs">
            <Link
              className=" flex gap-1 w-max justify-start items-center group-hover:bg-zinc-500 px-2.5 py-0.5 rounded-xl"
              href={`/${d.id}`}
            >
              <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-white" />
              <p className="leading-7 w-56 truncate text-muted-foreground  group-hover:text-white">
                {d.messageSnippet}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default RecentHistory;
