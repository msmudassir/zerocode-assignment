"use client"; // Since you're using a client component (RegisterPage)

import RegisterPage from "./register/page"; // ✅ Adjust path based on your structure

export default function Home() {
  return (
    <div>
      <RegisterPage />
    </div>
  );
}
