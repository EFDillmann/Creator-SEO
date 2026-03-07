export const GOOGLE_OAUTH_SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl";

export const GOOGLE_OAUTH_QUERY_PARAMS = {
  access_type: "offline",
  prompt: "consent",
} as const;
