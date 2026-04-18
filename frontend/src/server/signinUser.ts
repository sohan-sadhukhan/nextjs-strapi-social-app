"use server";

import { SignInFormValues } from "@/lib/type";
import axios from "axios";
import { cookies } from "next/headers";

const signinUser = async ({ emailOrUsername, password }: SignInFormValues) => {
  try {
    const { statusText, data } = await axios.post(
      `${process.env.STRAPI_ENDPOINT}/api/auth/local`,
      {
        identifier: emailOrUsername,
        password,
      },
    );

    if (statusText !== "OK") {
      return {
        success: false,
        message: "Failed to sign in. Please try again.",
      };
    }

    const jwt = data.jwt;
    const cookieStore = await cookies();

    cookieStore.set("session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch {
    return {
      success: false,
      message: "An error occurred during sign-in. Please try again.",
    };
  }
};

export default signinUser;
