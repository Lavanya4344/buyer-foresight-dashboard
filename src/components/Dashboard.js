import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;

    const fieldA =
      sortField === "company" ? a.company.name.toLowerCase() : a[sortField].toLowerCase();
    const fieldB =
      sortField === "company" ? b.company.name.toLowerCase() : b[sortField].toLowerCase();

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Directory</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <table className="min-w-full border">
        <thead>
          <tr>
            <th
              className="cursor-pointer border p-2"
              onClick={() => handleSort("name")}
            >
              Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th
              className="cursor-pointer border p-2"
              onClick={() => handleSort("company")}
            >
              Company {sortField === "company" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
