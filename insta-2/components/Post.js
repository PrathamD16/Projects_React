import React, { useEffect, useState } from "react";
import {
  PaperAirplaneIcon,
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  Bars4Icon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import {
  doc,
  addDoc,
  collection,
  query,
  serverTimestamp,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Button } from "@mui/material";

function Post({ id, username, userImg, Img, caption }) {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  //Fetching commments from db
  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "posts", id, "comments"));
      const snapshot = await getDocs(q);
      setComments(snapshot.docs);
    };
    getData();
  }, [db, id]);

  //Fetching likes from db
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  });

  //Like and Unlike functionality
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  //Like Functionality
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  console.log(hasLiked);
  console.log(likes);

  // Comments fetched from backend to frontend

  const sendComment = async (e) => {
    /****Comment goes from frontend to backend */
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timeStamp: serverTimestamp(),
    });
    /****Comment goes from frontend to backend */
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center py-3 px-4">
        <img
          className="h-12 w-12 p-1 mr-3 object-contain rounded-full"
          src={session?.user?.image}
          alt="-"
        />
        <p className="flex-1 text-sm font-bold">{username}</p>
        <Bars4Icon className="h-5 mr-5" />
      </div>

      {/* img */}
      <img src={Img} className="object-cover w-full" />

      {/* Button */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <button onClick={likePost}>
                <Favorite className="Btn" color="error" />
              </button>
            ) : (
              <FavoriteBorder onClick={likePost} className="Btn" />
            )}
            <ChatBubbleLeftEllipsisIcon className="Btn" />
            <PaperAirplaneIcon className="Btn" />
          </div>
          <BookmarkIcon className="Btn" />
        </div>
      )}

      {/* Caption */}
      <p className="p-5 truncate">
      {
        likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )
      }
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {/* Comment */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>
                {"  "}
                {comment.data().comment}
              </p>
              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input Box */}
      <form className="flex items-center p-4">
        {session && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              type="text"
              className="border-none flex-1 focus:ring-0 outline-none"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              onClick={sendComment}
              className="font-semibold text-blue-400"
            >
              Post
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Post;
