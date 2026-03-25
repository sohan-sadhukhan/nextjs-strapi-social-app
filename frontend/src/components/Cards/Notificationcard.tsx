import { Notifications } from "@/lib/type";
import { LucideIcon, MessageCircle, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Card } from "../shadcnui/card";

type TypeConfig = {
  like: {
    label: string;
    icon: LucideIcon;
    iconClass: string;
    badgeClass: string;
  };
  comment: {
    label: string;
    icon: LucideIcon;
    iconClass: string;
    badgeClass: string;
  };
};

const typeConfig: TypeConfig = {
  like: {
    label: "liked your post",
    icon: ThumbsUpIcon,
    iconClass: "text-blue-500 fill-blue-500",
    badgeClass: "bg-blue-100 dark:bg-blue-950",
  },
  comment: {
    label: "commented on your post",
    icon: MessageCircle,
    iconClass: "text-sky-500 fill-sky-100 dark:fill-sky-950",
    badgeClass: "bg-sky-100 dark:bg-sky-950",
  },
};

type NotificationcardProp = {
  notification: Notifications;
};

const Notificationcard = ({
  notification: { id, isRead, postThumb, timeAgo, type, user },
}: NotificationcardProp) => {
  // Select config based on notification type
  const cfg = typeConfig[type];

  // Dynamic Lucide icon component
  const Icon = cfg.icon;

  // Generate initials for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n: any) => n[0])
    .join("");

  return (
    <Card
      aria-label={`${user.name} ${cfg.label}, ${timeAgo}`}
      className={`cursor-pointer flex-row items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 hover:shadow-md ${
        isRead ?
          "border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-900"
        : "border-sky-200 bg-sky-50 dark:border-blue-800 dark:bg-sky-950/30"
      }`}>
      {/* Unread dot */}
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full transition-all ${
          isRead ? "bg-transparent" : "animate-pulse bg-blue-500"
        }`}
      />

      {/* Avatar with type badge */}
      <div className="relative">
        <Avatar className="h-11 w-11 ring-2 ring-white dark:ring-zinc-900">
          <AvatarImage
            src={user.avatar}
            alt={`${user.name}'s profile picture`}
          />
          <AvatarFallback className="bg-zinc-200 text-sm font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Type icon badge */}
        <span
          aria-hidden="true"
          className={`absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-900 ${cfg.badgeClass}`}>
          <Icon className={`h-2.5 w-2.5 ${cfg.iconClass}`} />
        </span>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug text-zinc-800 dark:text-zinc-200">
          <span className="font-semibold">{user.name} </span>
          <span className="text-zinc-500 dark:text-zinc-400">{cfg.label}</span>
        </p>
        <time
          aria-label={`Posted ${timeAgo}`}
          className="mt-0.5 block text-xs font-medium text-blue-500">
          {timeAgo}
        </time>
      </div>

      {/* Post thumbnail */}
      <Image
        src={postThumb}
        height={400}
        width={400}
        alt="Post thumbnail"
        aria-hidden="true"
        className="h-12 w-12 rounded-xl border border-zinc-100 object-cover dark:border-zinc-800"
      />
    </Card>
  );
};

export default Notificationcard;
