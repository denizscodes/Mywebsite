"use client";
import { useState } from "react";
import { signIn, signUp } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      const newUser = await signUp(email, password);
      setUser(newUser);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const loggedInUser = await signIn(email, password);
      setUser(loggedInUser);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogOut = async () => {
    await logOut();
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <div>
          <p>Hoş geldin, {user.email}</p>
          <button
            onClick={handleLogOut}
            className="p-2 bg-red-500 text-white rounded"
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSignIn}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Giriş Yap
          </button>
        </div>
      )}
    </div>
  );
}
