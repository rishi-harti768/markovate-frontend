import React from "react";
import { motion } from "motion/react";
import "./loadingView.css";

const LoadingView = () => {
  return (
    <>
      <motion.section className="default-load-view">
        <h1>Loading</h1>
      </motion.section>
    </>
  );
};

export default LoadingView;
