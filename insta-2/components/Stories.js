import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

function Stories() {
  const [userList, setUserList] = useState([]);
  const {data : session} = useSession()

  useEffect(() => {
    const suggestion = [...Array(20)].map((_, i) => ({
      avatar: faker.image.avatar(),
      username: faker.internet.userName(),
      id: i,
    }));
    setUserList(suggestion);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} username={session.user.username} /> 
      )}
      {userList.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
