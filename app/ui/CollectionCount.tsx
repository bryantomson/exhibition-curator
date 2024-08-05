"use client";

import { useCollection } from "@/hooks/use-collection";

import React from "react";

const CollectionCount = () => {
  const { items } = useCollection();
  const itemCount = items.length;

  return <>{itemCount > 0 ? "(" + itemCount + ")": ""}</>;
};

export default CollectionCount;
