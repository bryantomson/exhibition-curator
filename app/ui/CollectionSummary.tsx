"use client";

import { useCollection } from "@/hooks/use-collection";
import React from "react";
import CollectionItem from "./CollectionItem";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";

interface Artwork {
  id: string;
  artist: string;
  title: string;
  description: string;
  thumbnail: string;
  image_alt: string;
  image_url: string;
  date: string;
  style: string;
  source: string;
}



const CollectionSummary = () => {
  const { items, setItems } = useCollection();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;


    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);
    }
  };

  

  return (
    <div className="">
      <DndContext
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
          {items.map((item) => (
            <CollectionItem item={item} key={item.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CollectionSummary;
