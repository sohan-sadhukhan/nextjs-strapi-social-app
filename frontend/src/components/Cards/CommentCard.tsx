import { CopyIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";
import { Card, CardContent } from "../shadcnui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";

type CommentCardProp = {
  avatarUrl: string;
  name: string;
  username: string;
  timeAgo: string;
  comment: string;
  isOwn: boolean;
};

const CommentCard = ({
  avatarUrl,
  comment,
  isOwn,
  name,
  timeAgo,
  username,
}: CommentCardProp) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
  };
  return (
    <>
      <article
        aria-label={`Comment by ${name}`}
        className="w-full font-sans">
        <Card className="rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <CardContent className="p-5">
            {/* Header */}
            <header className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <Avatar className="h-11 w-11 ring-2 ring-white ring-offset-1 dark:ring-zinc-900">
                  <AvatarImage
                    src={avatarUrl}
                    alt={`${name}'s profile picture`}
                  />
                  <AvatarFallback
                    aria-hidden="true"
                    className="bg-zinc-200 text-sm font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-200">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Name & Meta */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm leading-tight font-semibold text-zinc-900 dark:text-zinc-100">
                    {name}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                    <span>{username}</span>
                    <span aria-hidden="true">·</span>
                    <time
                      aria-label={`Posted ${timeAgo}`}
                      className="font-medium text-sky-500">
                      {timeAgo}
                    </time>
                  </div>
                </div>
              </div>

              {/* Options Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                    aria-label="Comment options">
                    <MoreVerticalIcon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-44 rounded-xl">
                  {/* Always available */}
                  <DropdownMenuItem
                    className="cursor-pointer gap-2 text-sm"
                    onClick={() => navigator.clipboard.writeText(comment)}>
                    <CopyIcon
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Copy text
                  </DropdownMenuItem>

                  {/* Own post only */}
                  {isOwn && (
                    <DropdownMenuItem
                      className="cursor-pointer gap-2 text-sm text-red-500 focus:text-red-500"
                      onClick={handleDelete}>
                      <Trash2Icon
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            {/* Comment Body */}
            <p className="mt-3.5 pl-[3.25rem] text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {comment}
            </p>
          </CardContent>
        </Card>
      </article>
    </>
  );
};

export default CommentCard;
