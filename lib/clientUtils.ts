export const getLogOutUrl = () => {
  const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const logoutUri = process.env.NEXT_PUBLIC_APP_URL;

  if (!cognitoDomain || !clientId || !logoutUri) {
    console.error("Missing Cognito logout environment variables");
    return "/";
  }

  return `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
};
