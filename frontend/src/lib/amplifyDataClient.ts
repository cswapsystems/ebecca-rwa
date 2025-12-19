import outputs from "../../amplify_outputs.json";
import config from "../../amplify_outputs.json";
import { cookies } from "next/headers";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import { type Schema } from "../../amplify/data/resource";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});
