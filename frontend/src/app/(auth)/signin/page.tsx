import SigninForm from "@/components/Forms/SigninForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import Link from "next/link";

const page = () => {
  return (
    <section
      aria-labelledby="signin-title"
      className="mx-auto grid h-dvh w-full place-items-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle id="signin-title">Sign in</CardTitle>
          <CardDescription>Access your account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm />
          <p className="text-muted-foreground mt-4 text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
