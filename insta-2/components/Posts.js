import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const DUMMY_DATA = [
  {
    id: "123",
    username: "prathamdoke16",
    userImg: "https://i.ibb.co/F3hLDLD/Photo-Pratham.jpg",
    img: "https://i.postimg.cc/26YP7BST/71283bb49db55cfee5bb6acd1389c465-tree-of-life-the-tree.jpg",
    caption:
      "ASC SKASDJIASJKI VJASODAD ca skpdkapokdpakpksma kpskaop dkpkapo k kk Nusta Hawaa",
  },
  {
    id: "789",
    username: "prathamdoke16",
    userImg: "https://i.ibb.co/F3hLDLD/Photo-Pratham.jpg",
    img: "https://i.postimg.cc/wT3TmnPM/photo-1485550409059-9afb054cada4.jpg",
    caption: "Nusta Hawaa",
  },
];

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts'), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  console.log(posts)

  const { data: session } = useSession();
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          Img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
