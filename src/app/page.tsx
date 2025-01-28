"use client";
import Image from "next/image";
import { motion } from "motion/react";

const Home = () => {
  return (
    <>
      <h1 style={{ marginTop: 200 }}>Markovate@official</h1>
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}>
        dialog
      </motion.button>
    </>
  );
};
export default Home;
