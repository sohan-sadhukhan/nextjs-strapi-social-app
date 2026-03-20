import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Social App",
  description:
    "Modern social media platform to share posts, connect with people, and discover communities.",
};

const page = () => {
  return <section className="grid h-[90dvh] place-items-center">Home</section>;
};

export default page;
