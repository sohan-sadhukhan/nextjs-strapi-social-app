import ProfileOverview from "@/components/Cards/ProfileOverview";
import SuggestedUsers from "@/components/Cards/SuggestedUsers";
import NotificationSection from "@/components/NotificationSection";
import { Notifications, SuggestedUserType, UserInfoType } from "@/lib/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | Social App",
  description:
    "Stay updated with your latest notifications including likes, comments, and interactions from your network.",
};

const notifications: Notifications[] = [
  {
    id: 1,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: false,
  },
  {
    id: 2,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "comment",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 3,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 4,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: false,
  },
  {
    id: 5,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "comment",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 7,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 8,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 9,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 10,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 11,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 12,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 13,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 14,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 15,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 16,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
  {
    id: 17,
    user: { name: "Melissa Kuhn", avatar: "/avatar.jpg" },
    type: "like",
    timeAgo: "1 day ago",
    postThumb: "/cover.jpg",
    isRead: true,
  },
];

const {
  avatarUrl,
  bio,
  coverUrl,
  followers,
  following,
  joinedDate,
  name,
  posts,
  username,
}: UserInfoType = {
  name: "Sohan Sadhukhan",
  username: "@sohan2323",
  bio: "Hate me or love me, either way, I'm still on your mind 🤩",
  joinedDate: "Joined 1 day ago",
  posts: 25,
  followers: 105,
  following: 7,
  coverUrl: "/cover.jpg",
  avatarUrl: "/avatar.jpg",
};

const suggestedUsersData: SuggestedUserType[] = [
  {
    id: 1,
    name: "Melissa Kuhn",
    handle: "@Melissa1234",
    mutual: "3 mutual connections",
    initials: "MK",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  {
    id: 2,
    name: "Priya Sharma",
    handle: "@priyasharma",
    mutual: "5 mutual connections",
    initials: "PS",
    bg: "bg-pink-100",
    text: "text-pink-700",
  },
  {
    id: 3,
    name: "James Okoro",
    handle: "@jokoro22",
    mutual: "1 mutual connection",
    initials: "JO",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  {
    id: 4,
    name: "Lena Fischer",
    handle: "@lenaf",
    mutual: "2 mutual connections",
    initials: "LF",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  {
    id: 5,
    name: "Lena Fischer",
    handle: "@lenaf",
    mutual: "2 mutual connections",
    initials: "LF",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
];

const page = () => {
  return (
    <section className="grid min-h-dvh grid-cols-8 gap-10 sm:px-4">
      {/* Left Sidebar: User Profile (visible on lg+) */}
      <aside className="sticky top-18 col-span-2 hidden h-fit lg:block">
        <ProfileOverview
          coverImage={coverUrl}
          avatarImage={avatarUrl}
          name={name}
          username={username}
          bio={bio}
          followersCount={followers}
          followingCount={following}
        />
      </aside>

      {/* Center: Notifications feed */}
      <section
        aria-label="Notifications"
        className="col-span-8 flex flex-col pt-2 lg:col-span-6 xl:col-span-4">
        <NotificationSection notifications={notifications} />
      </section>

      {/* Right Sidebar: Suggested users (visible on xl+) */}
      <aside className="sticky top-18 col-span-2 hidden h-fit xl:block">
        <SuggestedUsers usersData={suggestedUsersData} />
      </aside>
    </section>
  );
};

export default page;
