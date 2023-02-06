import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { useSession, signIn,signOut } from "next-auth/react"

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const user = [...Array(5)].map((_, i) => ({
      avatar: faker.image.avatar(),
      username: faker.internet.userName(),
      place: `${faker.company.name()}`,
      id: i,
    }));
    setSuggestions(user);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold cursor-pointer">
          See all
        </button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-4"
        >
          <img
            className="w-10 h-10 border p-[2px] rounded-full"
            src={profile.avatar}
            alt="Profile"
          />
          <div className="flex-1 ml-5">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">{profile.place}</h3>
          </div>
          <button className="text-blue-400 text-sm font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
