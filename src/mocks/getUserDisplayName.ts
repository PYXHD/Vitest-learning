import { fetchUserById } from "./utils/fetchUserById";

async function getUserDisplayName(userId: number): Promise<string> {
  const user = await fetchUserById(userId);

  return user ? user.name : "Anonymous";
}

export { getUserDisplayName };
