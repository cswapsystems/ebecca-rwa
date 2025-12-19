"use server";

import { cookieBasedClient } from "../amplifyDataClient";

// Fetch Tags
export const fetchTags = async () => {
  const { data: tags, errors } = await cookieBasedClient.models.Tag.list();

  if (errors) {
    console.error("Error fetching the list of tags", errors);
    throw new Error("Failed to fetch the list of tags");
  }

  return tags;
};

// Fetch Tag by Tag ID
export const fetchTagByTagId = async (tagId: string) => {
  const { data: tag, errors } = await cookieBasedClient.models.Tag.get({
    tagId: tagId,
  });

  if (errors) {
    console.error("Error fetching the tag using Tag ID", errors);
    throw new Error("Failed to fetch the tag using Tag ID");
  }

  return tag;
};
