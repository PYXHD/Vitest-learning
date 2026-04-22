type User = {
  id: number;
  name: string;
};

export async function fetchUserById(_userId: number): Promise<User | null> {
  throw new Error("Not implemented");
}
