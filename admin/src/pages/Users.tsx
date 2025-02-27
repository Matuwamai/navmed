import React, { useEffect, useState } from "react";

interface User {
  id: number;
  fullName: string;
  email: string;
  contact: string;
  created_at: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from API (Replace with your actual API endpoint)
    fetch("http://localhost:5000/api/users/users-lists")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(`Error fetching users:`, err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Registered Users</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3 text-sm md:text-base">ID</th>
              <th className="p-3 text-sm md:text-base">Name</th>
              <th className="p-3 text-sm md:text-base">Email</th>
              <th className="p-3 text-sm md:text-base">Contact</th>
              <th className="p-3 text-sm md:text-base">Created</th>
              <th className="p-3 text-sm md:text-base text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                <td className="p-3 text-xs md:text-sm">{user.id}</td>
                <td className="p-3 text-xs md:text-sm">{user.fullName}</td>
                <td className="p-3 text-xs md:text-sm">{user.email}</td>
                <td className="p-3 text-xs md:text-sm">{user.contact}</td>
                <td className="p-3 text-xs md:text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-center">
                  <button className="bg-gray-700 text-white text-xs md:text-sm px-3 py-1 rounded-md hover:bg-gray-900 transition">
                    View User
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-3">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
