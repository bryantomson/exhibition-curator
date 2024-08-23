import React from "react";
import { useCollection } from "@/hooks/use-collection";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CircleMinus, Grip } from "lucide-react";
import { usePathname } from "next/navigation";

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

interface Props {
  item: Artwork;
}

const CollectionItem = ({ item }: Props) => {
  const { removeItem } = useCollection();
  const pathname = usePathname();
  const imageHeight = pathname === "/collection" ? "h-40" : "h-24";

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


 

  return (
    <div
      ref={setNodeRef}
      style={style}
      key={item.id}
      className={`bg-base-300 m-2 flex ${imageHeight} w-container  text-xs items-center`}
    >
      <div className="aspect-[1/1] overflow-hidden h-full w-auto flex-shrink-0 sticky left-0 ">
        <img
          src={item.image_url}
          alt={item.image_alt}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="w-full m-2 align-center overflow-hidden whitespace-nowrap text-ellipsis ">
        <p className="text-base p-0.5 font-semibold">{item.title}</p>

        <p className="text-sm p-0.5">{item.artist}</p>
        <p className="text-xs p-0.5 text-info">{item.style}</p>
      </div>
      <button
        className="cursor-move tooltip tooltip-left"
        data-tip="Drag to reorder artworks"
        aria-label="drag-item"
        {...attributes}
        {...listeners}
      >
        <Grip />
      </button>
      <button
        aria-label="remove-item"
        className="m-2 ml-4 tooltip tooltip-left"
        data-tip="Remove artwork from collection"
        onClick={() => removeItem(item.id)}
      >
        <CircleMinus className="text-accent m-2  sticky right-0" />
      </button>
    </div>
  );
};

export default CollectionItem;
