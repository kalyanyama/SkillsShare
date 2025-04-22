import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_METHOD } from "../authentication/get-methods";

export const Dashboard = () => {
  const [skills, setSkills] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchTutorInfo = async () => {
      try {
        setLoading(true);
        const res = await GET_METHOD("api/users/me");
        const data = await res.json();
        if (data.success) {
          setProfile(data.user);
          if (data.user.role === "tutor" && data.skills) {
            const extractedSkills = data.skills.map((entry) => entry.skill);
            setSkills(extractedSkills);
          }
          setRooms(data.rooms || []);
        }
      } catch (error) {
        console.error("Error fetching tutor dashboard info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] grid place-content-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[700px] mt-24 container mx-auto space-y-12 px-5">
      <div className="border-b py-3">
        <h1 className="text-4xl sm:text-6xl font-bold">Dashboard</h1>
      </div>

      {profile?.role === "tutor" ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Skills</h2>
          {skills.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-8 h-8"
                    />
                    <h3 className="text-lg font-semibold text-blue-600">
                      {skill.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No skills found.</p>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rooms</h2>
            {rooms.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 ">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-blue-600 line-clamp-1">
                      Room ID: {room.roomId}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Created on: {new Date(room.createdAt).toLocaleString()}
                    </p>
                    <Link
                      className="mt-5 text-sm hover:underline text-blue-500"
                      to={`/chat/${room.roomId}`}
                    >
                      View Room
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No rooms created.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          <p className="text-gray-600">
            Your profile is not a tutor. Here are your details:
          </p>
          <div className="border p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600">
              Name: {profile.name}
            </h3>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rooms</h2>
            {rooms.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 ">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-blue-600 line-clamp-1">
                      Room ID: {room.roomId}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Created on: {new Date(room.createdAt).toLocaleString()}
                    </p>
                    <Link
                      className="mt-5 text-sm hover:underline text-blue-500"
                      to={`/chat/${room.roomId}`}
                    >
                      View Room
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No rooms available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
