import ChangePasswordForm from "@/components/Forms/ChangePasswordForm";
import DeleteAccountForm from "@/components/Forms/DeleteAccountForm";
import PersonalInfoForm from "@/components/Forms/PersonalInfoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Separator } from "@/components/shadcnui/separator";
import { UserInfo } from "@/lib/type";
import axios from "axios";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings | Smile App",
  description:
    "Manage your account settings, update personal information, and change your password.",
};

const page = async () => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("session")?.value;

  if (!jwt) {
    redirect("/signin");
  }

  const userInformation: UserInfo = await axios.get(
    `${process.env.STRAPI_ENDPOINT}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return (
    <section className="pt-0 sm:px-4 sm:pt-2">
      <Card className="w-full rounded-none sm:rounded-xl">
        {/* Personal Information */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Personal Information
          </CardTitle>
          <CardDescription className="text-sm leading-5">
            Update your username and email below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <PersonalInfoForm
            username={userInformation.data.username}
            email={userInformation.data.email}
          />
        </CardContent>

        <Separator />

        {/* Change Password */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Change Password
          </CardTitle>
          <CardDescription className="text-sm leading-5">
            Update your security credentials
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChangePasswordForm />
        </CardContent>

        <Separator />

        {/* Danger Zone */}
        <CardHeader>
          <CardTitle className="text-destructive text-xl font-semibold">
            Danger Zone
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm leading-5">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <DeleteAccountForm />
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
