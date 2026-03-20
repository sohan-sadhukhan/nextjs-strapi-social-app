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

type Stats = {
  label: string;
  value: number;
};

const UserProfileCard = () => {
  const userProfileInfo: ProfileData = {
    name: "Sohan Sadhukhan",
    username: "@sohan2323",
    bio: "Hate me or love me, either way, I'm still on your mind 🤩",
    joinedDate: "Joined 1 day ago",
    posts: 25,
    followers: 105,
    following: 7,
    avatarUrl: "/avatar.jpg",
    coverUrl: "/cover.jpg",
  };

  const stats: Stats[] = [
    { label: "Posts", value: userProfileInfo.posts },
    { label: "Followers", value: userProfileInfo.followers },
    { label: "Following", value: userProfileInfo.following },
  ];

  const nameArray = userProfileInfo.name.split(" ");

  const charactersArray = nameArray.map((n) => {
    return n.charAt(0);
  });

  return (
    <>
      <Card className="w-full self-start rounded-2xl pt-0 shadow-xl xl:col-span-4">
        {/* Cover Banner  */}
        <Image
          height={300}
          width={700}
          src={"/cover.jpg"}
          alt="Cover picture"
          className="relative h-44 w-full rounded-t-xl object-cover"
        />

        <CardContent className="px-6 pt-0 pb-6">
          {/* ── Avatar + Edit button ── */}
          <header className="-mt-14 mb-4 flex items-end justify-between">
            <Avatar className="ring-primary h-28 w-28 shadow-lg ring-4">
              <AvatarImage
                src={userProfileInfo.avatarUrl}
                alt={userProfileInfo.name}
              />
              <AvatarFallback className="bg-sky-100 text-3xl font-bold text-sky-600">
                {charactersArray.join("")}
              </AvatarFallback>
            </Avatar>

            <EditProfileDialog userProfileInfo={userProfileInfo} />
          </header>

          {/* ── Name & Username ── */}
          <div aria-label="User identity">
            <h1 className="text-primary-900 text-2xl font-bold">
              {userProfileInfo.name}
            </h1>
            <p className="text-primary-500 mt-0.5 text-sm">
              {userProfileInfo.username}
            </p>
          </div>

          {/* ── Bio ── */}
          <div
            aria-label="Bio"
            className="mt-3">
            <h2 className="text-primary-700 mb-0.5 text-sm font-semibold">
              Bio
            </h2>
            <p className="text-primary-600 text-sm">{userProfileInfo.bio}</p>
          </div>

          {/* ── Joined date ── */}
          <p className="text-primary-400 mt-3 flex items-center gap-1.5 text-xs">
            <CalendarDays
              size={14}
              className="text-sky-400"
              aria-hidden="true"
            />
            <span>{userProfileInfo.joinedDate}</span>
          </p>

          <Separator className="my-4" />

          {/* ── Stats ── */}
          <div className="flex items-center gap-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center">
                <div className="text-primary-900 text-xl font-bold">
                  {stat.value}
                </div>
                <div className="text-primary-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfileCard;
