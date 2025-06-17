export const users: { email: string; password: string }[] = [];

export function registerUser(email: string, password: string) {
  const exists = users.find((u) => u.email === email);
  if (exists) throw new Error("User already exists");
  users.push({ email, password });
}

export function loginUser(email: string, password: string) {
  return users.find((u) => u.email === email && u.password === password);
}
