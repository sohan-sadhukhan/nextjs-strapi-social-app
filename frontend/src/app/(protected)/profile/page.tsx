import CreatePostCard from "@/components/Cards/CreatePostCard";
import SuggestedUsers from "@/components/Cards/SuggestedUsers";
import UserProfileCard from "@/components/Cards/UserProfileCard";
import { SuggestedUserType, UserInfoType } from "@/lib/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Social App",
  description:
    "Modern social media platform to share posts, connect with people, and discover communities.",
};

const page = () => {
  const userInfo: UserInfoType = {
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

  return (
    <>
      <section className="grid gap-4 pt-0 sm:px-4 sm:pt-2 lg:grid-cols-5">
        {/* Left side (Main content area) */}
        <div className="mb-auto grid gap-4 lg:col-span-4">
          <UserProfileCard
            name={userInfo.name}
            username={userInfo.username}
            bio={userInfo.bio}
            joinedDate={userInfo.joinedDate}
            posts={userInfo.posts}
            followers={userInfo.followers}
            following={userInfo.following}
            coverUrl={userInfo.coverUrl}
            avatarUrl={userInfo.avatarUrl}
          />

          {/* Create Post Section */}
          <CreatePostCard
            currentAvatar={userInfo.avatarUrl}
            authorName={userInfo.name}
          />
        </div>

        {/* Right side (Suggested users only visible on large screens) */}
        <div className="hidden lg:col-span-1 lg:block">
          <SuggestedUsers usersData={suggestedUsersData} />
        </div>
      </section>
    </>
  );
};

export default page;
