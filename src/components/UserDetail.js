import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
      <div className="border p-4 rounded shadow">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Catchphrase:</strong> {user.company.catchPhrase}</p>
        <p><strong>BS:</strong> {user.company.bs}</p>
      </div>
    </div>
  );
};

export default UserDetail;
