import React, { useEffect, useState } from "react";
import { useCollection } from "../../hooks/use-collection";

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

interface AddCollectionButtonProps {
  artwork: Artwork;
}

const AddCollectionButton: React.FC<AddCollectionButtonProps> = ({
  artwork,
}) => {
  const { addItem, items } = useCollection();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (items.find((item) => item.id === artwork.id)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [items, artwork.id]);

  const handleClick = () => {
    if (!items.find((item) => item.id === artwork.id)) {
      addItem(artwork);
      setAdded(true);
    }
  };

  return (
    <button
      className="btn btn-secondary btn-sm"
      onClick={handleClick}
      disabled={added}
    >
      {added ? "Added to Collection" : "Add to Collection"}
    </button>
  );
};

export default AddCollectionButton;
