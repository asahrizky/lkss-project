import { httpClient } from "~/Utils/http-client";
import { PostInterface } from "~/Types/Post";

export const getPosts = async () => {
  try {
    const { data } = await httpClient.get<PostInterface[]>("/posts");

    return data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (payload: PostInterface) => {
  try {
    const { data } = await httpClient.post("/posts", payload);

    return data;
  } catch (error) {
    throw error;
  }
};
