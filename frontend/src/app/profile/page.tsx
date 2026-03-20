import UserProfileCard from "@/components/Cards/UserProfileCard";
import ProfileRightPanel from "@/components/ProfileRightPanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Social App",
  description:
    "Modern social media platform to share posts, connect with people, and discover communities.",
};

const page = () => {
  return (
    <section className="grid gap-4 xl:grid-cols-5">
      <UserProfileCard />
      <ProfileRightPanel />
    </section>
  );
};

export default page;
