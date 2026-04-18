"use server";

import { SignUpFormValues } from "@/lib/type";
import axios from "axios";
import { cookies } from "next/headers";

const signupUser = async ({
  email,
  name,
  username,
  password,
}: SignUpFormValues) => {
  try {
    const registerRes = await axios.post(
      `${process.env.STRAPI_ENDPOINT}/api/auth/local/register`,
      { username: username, email: email, password: password },
    );
    const jwt = registerRes.data?.jwt as string | undefined;
    const userId = registerRes.data?.user?.documentId as number | undefined;

    let accountRes;
    try {
      accountRes = await axios.post(
        `${process.env.STRAPI_ENDPOINT}/api/accounts`,
        {
          data: {
            name: name,
            username: username,
            avatar: "avatar.jpg",
            coverImage: "cover.jpg",
            bio: "Default bio",
            user: userId,
          },
        },
        {
          headers:
            jwt ?
              {
                Authorization: `Bearer ${jwt}`,
              }
            : undefined,
        },
      );
    } catch {
      // Compensating action: rollback the user if account creation fails.
      if (jwt && userId) {
        try {
          await axios.delete(
            `${process.env.STRAPI_ENDPOINT}/api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            },
          );
        } catch {
          // If rollback fails due to permissions, we still return signup failure.
        }
      }

      return {
        success: false,
        message:
          "Account profile creation failed, so signup was cancelled. Please try again.",
      };
    }

    if (registerRes.status === 200 && accountRes.status === 201 && jwt) {
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
        message: "User registered successfully.",
      };
    }

    return {
      success: false,
      message: "Failed to register user. Please try again.",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during sign-up. Please try again.",
    };
  }
};

export default signupUser;
