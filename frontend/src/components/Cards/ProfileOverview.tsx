import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcnui/avatar";
import { Button } from "@/components/shadcnui/button";
import { Card, CardContent } from "@/components/shadcnui/card";
import { Separator } from "@/components/shadcnui/separator";
import Link from "next/link";

type ProfileOverviewProps = {
  coverImage: string;
  avatarImage: string;
  name: string;
  username: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
};

const ProfileOverview = ({
  coverImage,
  avatarImage,
  name,
  username,
  bio,
  followersCount,
  followingCount,
}: ProfileOverviewProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="w-full overflow-hidden rounded-2xl border pt-0">
      {/* Cover image */}
      <div className="relative h-24 w-full">
        <img
          src={coverImage}
          alt="Cover"
          className="h-full w-full object-cover"
        />
        {/* Avatar — overlapping cover */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <Avatar className="ring-background h-16 w-16 ring-4">
            <AvatarImage
              src={avatarImage}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="bg-linera-to-br from-blue-400 to-indigo-600 text-lg font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="px-4 pt-10 pb-4 text-center">
        {/* Name & username */}
        <h2 className="text-base leading-tight font-semibold">{name}</h2>
        <p className="text-muted-foreground mt-0.5 text-sm">@{username}</p>
        <Separator className="my-3" />
        {/* Followers / Following */}
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold">{followersCount}</span>
            <span className="text-muted-foreground text-xs">Followers</span>
          </div>
          <div className="bg-border h-8 w-px" />
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold">{followingCount}</span>
            <span className="text-muted-foreground text-xs">Following</span>
          </div>
        </div>
        {/* Bio */}
        {bio && (
          <p className="text-muted-foreground mt-3 text-center text-sm leading-snug">
            {bio}
          </p>
        )}
        {/* Profile button */}{" "}
        <Link href={"/profile"}>
          <Button className="mt-4 w-full cursor-pointer rounded-full bg-blue-600 font-semibold text-white hover:bg-blue-700">
            Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
