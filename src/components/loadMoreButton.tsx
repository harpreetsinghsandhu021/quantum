"use client";

import React from "react";
import { Button } from "./ui/button";

const LoadMoreButton = ({ nextPage }: { nextPage: string }) => {
  return (
    <Button>
      <p className="uppercase">Load More</p>
    </Button>
  );
};

export default LoadMoreButton;
