import SignupForm from "@/components/Forms/SignupForm";
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
      aria-labelledby="signup-title"
      className="mx-auto grid h-dvh w-full max-w-md place-items-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle id="signup-title">Create account</CardTitle>
          <CardDescription>
            Start your account in a few quick steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="text-muted-foreground mt-4 text-sm">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
