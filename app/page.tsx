"use client";
import { auth } from "@/libs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export default function Auth() {
  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn} className="bg-blue-500 text-white p-2 rounded">
        Sign In with Google
      </button>
      <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded mt-2">
        Sign Out
      </button>
      <div></div>
    </div>
  );
}
