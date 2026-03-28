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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Smile App",
  description:
    "Manage your account settings, update personal information, and change your password.",
};

const userInfo = {
  displayUsername: "sohan",
  email: "s@gmail.com",
};

const page = () => {
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
            username={userInfo.displayUsername ?? ""}
            email={userInfo.email}
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
