import { H3Event } from "h3";
import { getGoogleInfos } from "~/server/app/providers/googleService";

export default eventHandler(async (event: H3Event) => {
  console.log("Called");
  const runtimeConfig = useRuntimeConfig();
  const { code } = await readBody(event);
  console.log(code);
  const response = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${runtimeConfig.public.github.clientId}&client_secret=${runtimeConfig.public.github.clientSecret}&code=${code}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    },
  );
  console.log(response);
  return response;
});
