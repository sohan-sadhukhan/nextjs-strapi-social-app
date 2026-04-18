"use server";

import axios from "axios";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import sharp from "sharp";

const createPost = async (
  description: string | undefined,
  accountId: string,
  file: File,
) => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("session")?.value;

    if (!jwt) {
      redirect("/signin");
    }

    const imageName = `${nanoid()}.jpeg`;

    if (file) {
      const imgArrayBuffer = await file.arrayBuffer();
      // Optimizes and resizes image using Sharp
      await sharp(imgArrayBuffer)
        .resize({
          width: 1350,
          height: 1080,
        })
        .jpeg({
          quality: 87,
          mozjpeg: true,
        })
        .toFile(`./public/posts/${imageName}`);
    }

    const postRes = await axios.post(
      `${process.env.STRAPI_ENDPOINT}/api/posts`,
      {
        data: {
          image: file ? imageName : null,
          description: description,
          account: accountId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    if (postRes.status !== 200 && postRes.status !== 201) {
      return {
        isSuccess: false,
        message: "Failed to create post",
      };
    }

    return {
      isSuccess: true,
      message: "Post created successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: "An error occurred while creating the post",
    };
  }
};

export default createPost;
