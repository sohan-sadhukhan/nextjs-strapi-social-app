import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nextjs Starter Frontend",
  description: "Production grade Next.js starter template",
};

const page = () => {
  return (
    <section className="grid h-[90dvh] place-items-center text-2xl">
      nextjs-strapi-social-app
    </section>
  );
};

export default page;
