"use client";
import React from "react";
import Link from "next/link";
import AllUsuarios from "./components/all-usuarios";

const Home = () => {
  return (
    <div>
      <div className="d-flex mb-2">
        <Link className="btn btn-primary" href="../add/">
          Add Usuario
        </Link>
      </div>
      <div>
        <AllUsuarios />
      </div>
    </div>
  );
};

export default Home;
