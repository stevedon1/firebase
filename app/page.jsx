"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/libs/firebaseConfig";

export default function FirestoreExample() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });
      setName("");
      setEmail("");
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      await updateDoc(doc(db, "users", id), { name: `${name} (Updated)` });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Firestore Example</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <button onClick={handleAddUser} className="bg-green-500 text-white p-2 rounded">
          Add User
        </button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 border rounded mb-2 flex justify-between">
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <div>
              <button
                onClick={() => handleUpdateUser(user.id)}
                className="bg-blue-500 text-white p-1 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
