import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import { Card } from "@/components/shadcnui/card";

import { PostType } from "@/lib/type";
import Image from "next/image";

const ReadOnlyPostCard = ({
  authorName,
  authorUsername,
  authorAvatar,
  timeAgo,
  description,
  postImage,
  reactionCount,
  isFollowing,
  isOwnPost,
  comments,
}: PostType) => {
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <Card
      aria-label={`Post by ${authorName}`}
      className="w-full overflow-hidden rounded-none border-0 shadow-sm sm:rounded-2xl sm:border">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar className="ring-primary h-10 w-10 ring-2">
            <AvatarImage
              src={`/${authorAvatar}`}
              alt={authorName}
              className="object-cover"
            />
            <AvatarFallback className="bg-linear-to-br from-blue-400 to-indigo-600 text-sm font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Name + username + time */}
          <div>
            <p className="text-sm font-semibold">{authorName}</p>
            <p className="text-muted-foreground text-xs">
              @{authorUsername}
              <span
                aria-hidden="true"
                className="mx-1">
                ·
              </span>
              <time dateTime={timeAgo}>{timeAgo}</time>
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      {description && (
        <p className="px-4 pb-3 text-sm leading-relaxed">{description}</p>
      )}

      {/* Post image */}
      {postImage && (
        <figure className="w-full">
          <Image
            src={`/${postImage}`}
            alt={`Photo shared by ${authorName}`}
            width={800}
            height={500}
            className="w-full object-cover"
          />
        </figure>
      )}

      {/* Reaction count */}
      {reactionCount > 0 && (
        <div className="px-4 pt-3">
          <p
            aria-live="polite"
            aria-label={`reacted to this post`}
            className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span
              aria-hidden="true"
              className="text-base">
              👍
            </span>
            {reactionCount}
          </p>
        </div>
      )}
    </Card>
  );
};

export default ReadOnlyPostCard;
