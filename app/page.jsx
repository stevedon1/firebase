"use client";
import { auth } from "@/libs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export default function Auth() {
  const [user, setUser] = useState('')
  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
      setUser(result.user)
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
    <div className="p-4">
      {!user ? (
        // Show Sign-In button if no user is logged in
        <button onClick={handleSignIn} className="bg-blue-500 text-white p-2 rounded">
          Sign In with Google
        </button>
      ) : (
        <div>
          {/* Display user details */}
          <div className="p-4 border rounded shadow-md">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h2 className="text-lg font-bold">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Sign-Out button */}
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white p-2 rounded mt-4"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
