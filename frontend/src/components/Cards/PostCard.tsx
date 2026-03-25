"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import { Button } from "@/components/shadcnui/button";
import { Card } from "@/components/shadcnui/card";

import { Separator } from "@/components/shadcnui/separator";
import { PostType } from "@/lib/type";
import {
  BookmarkIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  LinkIcon,
  Share2Icon,
  ThumbsUpIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CommentSection from "../CommentSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";

const PostCard = ({
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
  const [following, setFollowing] = useState(isFollowing);
  const [reacted, setReacted] = useState(false);
  const [count, setCount] = useState(reactionCount);

  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const reactionLabel =
    count === 0 ? ""
    : reacted && count === 1 ? "You"
    : reacted ? `You and ${count - 1} others`
    : `${count} others`;

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

        {/* Follow + menu */}
        <div className="flex items-center gap-1">
          {!isOwnPost && (
            <Button
              size="sm"
              onClick={() => setFollowing((prev) => !prev)}
              aria-label={
                following ? `Unfollow ${authorName}` : `Follow ${authorName}`
              }
              aria-pressed={following}
              className={`h-8 cursor-pointer rounded-full px-4 text-xs font-semibold text-white ${following ? "text-primary border-primary hover:bg-primary/5 border bg-transparent" : "bg-blue-600 hover:bg-blue-700"}`}>
              {following ? "Following" : "Follow"}
            </Button>
          )}

          {/* 3-dot dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="More options"
                className="rounded-full p-0">
                <EllipsisVerticalIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Save post
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LinkIcon className="mr-2 h-4 w-4" />
                Copy link
              </DropdownMenuItem>
              {isOwnPost ?
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  Delete post
                </DropdownMenuItem>
              : <>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <FlagIcon className="mr-2 h-4 w-4" />
                    Report post
                  </DropdownMenuItem>
                </>
              }
            </DropdownMenuContent>
          </DropdownMenu>
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
            src={`/${authorAvatar}`}
            alt={`Photo shared by ${authorName}`}
            width={800}
            height={500}
            className="w-full object-cover"
          />
        </figure>
      )}

      {/* Reaction count */}
      {count > 0 && (
        <div className="px-4 pt-3">
          <p
            aria-live="polite"
            aria-label={`${reactionLabel} reacted to this post`}
            className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span
              aria-hidden="true"
              className="text-base">
              👍
            </span>
            {reactionLabel}
          </p>
        </div>
      )}

      <Separator className="mt-3 w-auto" />

      {/* Action bar */}
      <footer
        role="toolbar"
        aria-label="Post actions"
        className="flex items-center justify-around px-2 py-1">
        {/* React */}
        <Button
          variant="ghost"
          onClick={() => {
            setReacted((prev) => !prev);
            setCount((prev) => (reacted ? prev - 1 : prev + 1));
          }}
          aria-label={reacted ? "Remove reaction" : "React to post"}
          aria-pressed={reacted}
          className={`gap-2 rounded-xl text-sm font-medium ${
            reacted ?
              "text-blue-600 hover:text-blue-700"
            : "text-muted-foreground hover:text-foreground"
          } cursor-pointer`}>
          <ThumbsUpIcon
            className="size-5 sm:size-4"
            aria-hidden="true"
          />
          <span className="hidden sm:inline">Like</span>
        </Button>

        {/* Comment */}
        <CommentSection
          authorName={authorName}
          authorUsername={authorUsername}
          authorAvatar={authorAvatar}
          timeAgo={timeAgo}
          description={description}
          postImage={timeAgo}
          reactionCount={reactionCount}
          isFollowing={isFollowing}
          isOwnPost={isOwnPost}
          comments={comments}
        />

        {/* Share */}
        <Button
          variant="ghost"
          aria-label="Share post"
          className="text-muted-foreground hover:text-foreground gap-2 rounded-xl text-sm font-medium">
          <Share2Icon
            className="size-5 sm:size-4"
            aria-hidden="true"
          />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </footer>
    </Card>
  );
};

export default PostCard;
