import z from "zod";
import { signInSchema, signUpSchema } from "./zodSchema";

export type UserInfo = {
  data: {
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    documentId: string;
    email: string;
    id: number;
    provider: string;
    publishedAt: string;
    updatedAt: string;
    username: string;
  };
};

export type AccountInfo = {
  data: {
    data: {
      avatar: string;
      bio: string;
      coverImage: string;
      createdAt: string;
      documentId: string;
      id: number;
      name: string;
      publishedAt: string;
      updatedAt: string;
      user: {
        blocked: boolean;
        confirmed: boolean;
        createdAt: string;
        documentId: string;
        email: string;
        id: number;
        provider: string;
        publishedAt: string;
        updatedAt: string;
        username: string;
      };
    }[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
};

export type Post = {
  data: {
    data: {
      createdAt: string;
      description: string;
      documentId: string;
      id: number;
      image: string;
      publishedAt: string;
      updatedAt: string;
      account: {
        avatar: string;
        bio: string;
        coverImage: string;
        createdAt: string;
        documentId: string;
        id: number;
        name: string;
        publishedAt: string;
        updatedAt: string;
        username: string;
      };
    }[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
};

export type SuggestedUserType = {
  id: number;
  name: string;
  handle: string;
  mutual: string;
  initials: string;
  bg: string;
  text: string;
};

export type Notifications = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  type: "like" | "comment";
  timeAgo: string;
  postThumb: string;
  isRead: boolean;
};

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
