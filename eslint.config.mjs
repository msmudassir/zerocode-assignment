"use client";
import { useState, useEffect } from "react";
import RegisterPage from "./register/page";
import LoginPage from "./login/page";

export default function Home() {
  const [view, setView] = useState<"register" | "login" | "chat">("register");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // 🧠 NEW

  useEffect(() => {
    setHasMounted(true); // ✅ Ensures hydration starts AFTER mount

    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
      setView("chat");
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    setView("chat");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    setView("login");
  };

  // ✅ Prevent render until mounted
  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10">
      <header className="text-red-600 p-4 border-b-2 w-full text-center text-2xl font-bold">
        Shopper
      </header>

      <nav className="my-4 space-x-4">
        <button
          onClick={() => setView("register")}
          className={`px-4 py-2 rounded font-semibold ${
            view === "register" ? "bg-red-500 text-white" : "bg-white border text-red-500"
          }`}
        >
          Register
        </button>
        <button
          onClick={() => setView("login")}
          className={`px-4 py-2 rounded font-semibold ${
            view === "login" ? "bg-green-500 text-white" : "bg-white border text-green-500"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setView("chat")}
          className={`px-4 py-2 rounded font-semibold ${
            view === "chat" ? "bg-blue-500 text-white" : "bg-white border text-blue-500"
          }`}
        >
          Dashboard
        </button>
      </nav>

      <main className="w-full max-w-md transition-all duration-300 ease-in-out">
        {view === "register" && <RegisterPage />}
        {view === "login" && <LoginPage onLoginSuccess={handleLoginSuccess} />}
        {view === "chat" &&
          (isLoggedIn ? (
            <div className="bg-white p-6 rounded shadow text-center">
              <h2 className="text-xl font-semibold">Welcome to the Dashboard</h2>
              <p className="text-gray-600 mt-2">You are logged in!</p>
              <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow text-center text-red-500 font-medium">
              Please login first to access the dashboard.
            </div>
          ))}
      </main>
    </div>
  );
}
