import { fetchUserById } from "./utils/fetchUserById";

async function getUserDisplayName(userID: number): Promise<string> {
  const user = await fetchUserById(userID);

  return user ? user.name : "Anonymous";
}

export { getUserDisplayName };
