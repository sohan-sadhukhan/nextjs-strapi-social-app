import axios from "axios";
import { cookies } from "next/headers";
import { AccountInfo, Post, UserInfo } from "./type";

export const getAllPosts = async () => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("session")?.value;

    const res: Post = await axios.get(
      `${process.env.STRAPI_ENDPOINT}/api/posts?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    if (!res) {
      return {
        isSuccess: false,
        data: [],
      };
    }

    return {
      isSuccess: true,
      data: res.data.data,
    };
  } catch (error) {
    return {
      isSuccess: false,
      data: [],
    };
  }
};

export const getAccountDetails = async () => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("session")?.value;

    const userInformation: UserInfo = await axios.get(
      `${process.env.STRAPI_ENDPOINT}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    const accountRes: AccountInfo = await axios.get(
      `${process.env.STRAPI_ENDPOINT}/api/accounts?filters[user][documentId][$eq]=${userInformation.data.documentId}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    if (!accountRes) {
      return {
        isSuccess: false,
        data: [],
      };
    }

    return {
      isSuccess: true,
      data: accountRes.data.data,
    };
  } catch (error) {
    return {
      isSuccess: false,
      data: [],
    };
  }
};
