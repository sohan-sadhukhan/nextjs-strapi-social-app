import CreatePostCard from "@/components/Cards/CreatePostCard";
import PostCard from "@/components/Cards/PostCard";
import ProfileOverview from "@/components/Cards/ProfileOverview";
import SuggestedUsers from "@/components/Cards/SuggestedUsers";
import { getAccountDetails, getAllPosts } from "@/lib";
import { SuggestedUserType } from "@/lib/type";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home | Social App",
  description:
    "Modern social media platform to share posts, connect with people, and discover communities.",
};

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
} = {
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

const postsData = [
  {
    authorName: "Sohan Sadhukhan",
    authorUsername: "@sohan2323",
    authorAvatar: "avatar.jpg",
    timeAgo: "Joined 1 day ago",
    description: "Hate me or love me, either way, I'm still on your mind 🤩",
    postImage: "avatar.jpg",
    reactionCount: 51,
    isFollowing: false,
    isOwnPost: false,
    comments: [
      {
        id: 1,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment:
          "Nice pic try The lighting in this photo really highlights the scenery",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
      {
        id: 2,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment: "Confidence looks amazing on you.",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
      {
        id: 3,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment: "You absolutely understood the assignment.",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
    ],
  },
  {
    authorName: "Sohan Sadhukhan",
    authorUsername: "@sohan2323",
    authorAvatar: "avatar.jpg",
    timeAgo: "Joined 1 day ago",
    description: "Hate me or love me, either way, I'm still on your mind 🤩",
    postImage: "avatar.jpg",
    reactionCount: 11,
    isFollowing: true,
    isOwnPost: true,
    comments: [
      {
        id: 1,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment:
          "Nice pic try The lighting in this photo really highlights the scenery",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
      {
        id: 2,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment: "Confidence looks amazing on you.",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
      {
        id: 3,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment: "You absolutely understood the assignment.",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
    ],
  },
  {
    authorName: "Sohan Sadhukhan",
    authorUsername: "@sohan2323",
    authorAvatar: "avatar.jpg",
    timeAgo: "Joined 1 day ago",
    description: "Hate me or love me, either way, I'm still on your mind 🤩",
    postImage: "avatar.jpg",
    reactionCount: 21,
    isFollowing: true,
    isOwnPost: true,
    comments: [
      {
        id: 1,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment:
          "Nice pic try The lighting in this photo really highlights the scenery",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
      {
        id: 2,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment: "Confidence looks amazing on you.",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
      {
        id: 3,
        name: "sohan",
        avatarUrl: "avatar.jpg",
        comment: "You absolutely understood the assignment.",

        timeAgo: "1 day",
        userName: "sohan1234",
        isOwn: true,
      },
    ],
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
const page = async () => {
  const accountData = await getAccountDetails();
  const account = accountData.data[0];

  const { data } = await getAllPosts();

  if (!data[0] || !accountData.data[0]) {
    redirect("/signin");
  }

  return (
    <>
      <section className="grid grid-cols-8 gap-10 sm:px-4">
        {/* Left sidebar sticky */}
        <aside className="col-span-2 hidden h-fit pt-2 lg:block">
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
        <div className="col-span-8 flex flex-col gap-6 pt-0 sm:pt-2 lg:col-span-6 xl:col-span-4">
          <CreatePostCard
            currentAvatar={account.avatar}
            authorName={account.name}
            accountId={account.documentId}
          />

          <div className="flex flex-col gap-14">
            {data.map((post, index) => (
              <PostCard
                key={index}
                authorName={post.account.name}
                authorUsername={post.account.username}
                authorAvatar={post.account.avatar}
                timeAgo={post.createdAt}
                description={post.description}
                postImage={post.image}
                reactionCount={postsData[0].reactionCount}
                isFollowing={postsData[0].isFollowing}
                isOwnPost={postsData[0].isOwnPost}
                comments={postsData[0].comments}
              />
            ))}
          </div>
        </div>

        {/* Right sidebar sticky */}
        <aside className="col-span-2 hidden h-fit pt-2 xl:block">
          <SuggestedUsers usersData={suggestedUsersData} />
        </aside>
      </section>
    </>
  );
};

export default page;
