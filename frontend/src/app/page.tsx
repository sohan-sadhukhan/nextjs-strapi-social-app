import CreatePostCard from "@/components/Cards/CreatePostCard";
import PostCard from "@/components/Cards/PostCard";
import ProfileOverview from "@/components/Cards/ProfileOverview";
import SuggestedUsers from "@/components/Cards/SuggestedUsers";
import { PostType, SuggestedUserType, UserInfoType } from "@/lib/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Social App",
  description:
    "Modern social media platform to share posts, connect with people, and discover communities.",
};

const page = () => {
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

  const postsData: PostType[] = [
    {
      authorName: "Sohan Sadhukhan",
      authorUsername: "@sohan2323",
      authorAvatar: "avatar.jpg",
      timeAgo: "Joined 1 day ago",
      description: "Hate me or love me, either way, I'm still on your mind 🤩",
      postImage: "/avatar.jpg",
      reactionCount: 51,
      isFollowing: false,
      isOwnPost: false,
    },
    {
      authorName: "Sohan Sadhukhan",
      authorUsername: "@sohan2323",
      authorAvatar: "avatar.jpg",
      timeAgo: "Joined 1 day ago",
      description: "Hate me or love me, either way, I'm still on your mind 🤩",
      postImage: "/avatar.jpg",
      reactionCount: 11,
      isFollowing: true,
      isOwnPost: true,
    },
    {
      authorName: "Sohan Sadhukhan",
      authorUsername: "@sohan2323",
      authorAvatar: "avatar.jpg",
      timeAgo: "Joined 1 day ago",
      description: "Hate me or love me, either way, I'm still on your mind 🤩",
      postImage: "/avatar.jpg",
      reactionCount: 21,
      isFollowing: true,
      isOwnPost: false,
    },
  ];

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
      <section className="grid grid-cols-8 gap-10 sm:px-4">
        {/* Left sidebar sticky */}
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

        {/* Center feed */}
        <div className="col-span-8 flex flex-col gap-6 pt-14 sm:pt-18 lg:col-span-6 xl:col-span-4">
          <CreatePostCard
            currentAvatar={avatarUrl}
            authorName={name}
          />

          <div className="flex flex-col gap-14">
            {postsData.map((post, index) => (
              <PostCard
                key={index}
                authorName={post.authorName}
                authorUsername={post.authorUsername}
                authorAvatar={post.authorAvatar}
                timeAgo={post.timeAgo}
                description={post.description}
                postImage={post.postImage}
                reactionCount={post.reactionCount}
                isFollowing={post.isFollowing}
                isOwnPost={post.isOwnPost}
              />
            ))}
          </div>
        </div>

        {/* Right sidebar sticky */}
        <aside className="sticky top-18 col-span-2 hidden h-fit xl:block">
          <SuggestedUsers usersData={suggestedUsersData} />
        </aside>
      </section>
    </>
  );
};

export default page;
