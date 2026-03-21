"use client";

import { CalendarDays } from "lucide-react";
import Image from "next/image";
import EditProfileDialog from "../EditProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Card, CardContent } from "../shadcnui/card";
import { Separator } from "../shadcnui/separator";

type ProfileData = {
  name: string;
  username: string;
  bio: string;
  joinedDate: string;
  posts: number;
  followers: number;
  following: number;
  avatarUrl: string;
  coverUrl: string;
};

const UserProfileCard = ({
  avatarUrl,
  bio,
  coverUrl,
  followers,
  following,
  joinedDate,
  name,
  posts,
  username,
}: ProfileData) => {
  const nameArray = name.split(" ");

  const charactersArray = nameArray.map((n) => {
    return n.charAt(0);
  });

  return (
    <>
      <Card className="w-full self-start rounded-none pt-0 sm:rounded-2xl sm:shadow-xl">
        {/* Cover Banner  */}
        <div className="">
          <Image
            height={300}
            width={700}
            src={coverUrl}
            alt="Cover picture"
            className="relative h-44 w-full object-cover"
          />
        </div>

        <CardContent className="px-6 pt-0 pb-6">
          {/* Avatar + Edit button */}
          <header className="-mt-14 mb-4 flex items-end justify-between">
            <Avatar className="ring-primary h-28 w-28 shadow-lg ring-4">
              <AvatarImage
                src={avatarUrl}
                alt={name}
              />
              <AvatarFallback className="bg-sky-100 text-3xl font-bold text-sky-600">
                {charactersArray.join("")}
              </AvatarFallback>
            </Avatar>

            <EditProfileDialog
              name={name}
              username={username}
              bio={bio}
              coverUrl={coverUrl}
              avatarUrl={avatarUrl}
            />
          </header>

          {/* Name & Username */}
          <div aria-label="User identity">
            <h1 className="text-primary-900 text-2xl font-bold">{name}</h1>
            <p className="text-primary-500 mt-0.5 text-sm">{username}</p>
          </div>

          {/* Bio */}
          <div
            aria-label="Bio"
            className="mt-3">
            <h2 className="text-primary-700 mb-0.5 text-sm font-semibold">
              Bio
            </h2>
            <p className="text-primary-600 text-sm">{bio}</p>
          </div>

          {/* Joined date */}
          <p className="text-primary-400 mt-3 flex items-center gap-1.5 text-xs">
            <CalendarDays
              size={14}
              className="text-sky-400"
              aria-hidden="true"
            />
            <span>{joinedDate}</span>
          </p>

          <Separator className="my-4" />

          {/* Stats */}
          <div className="flex items-center justify-start gap-10">
            <div className="flex flex-col items-center">
              <div className="text-primary-900 text-xl font-bold">
                {followers}
              </div>
              <div className="text-primary-500 text-sm">Followers</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-primary-900 text-xl font-bold">
                {following}
              </div>
              <div className="text-primary-500 text-sm">Following</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-primary-900 text-xl font-bold">{posts}</div>
              <div className="text-primary-500 text-sm">Posts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfileCard;
