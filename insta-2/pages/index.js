import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

const Home = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram</title>
      </Head>
      {/* Header */}
      <Navbar />
      <Feed />

      {/* Modal */}
      <Modal />
    </div>
  );
};

export default Home;
