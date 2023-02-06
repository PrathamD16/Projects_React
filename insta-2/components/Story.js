import React from "react";
import { useSession } from "next-auth/react";

function Story({ img, username }) {
  const { data: session } = useSession();
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        src={img}
        alt=""
      />
      <p className="text-xs w-14 truncate text-current">{username}</p>
    </div>
  );
}

export default Story;
