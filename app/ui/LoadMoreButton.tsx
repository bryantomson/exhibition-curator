import React from "react";

interface LoadMoreButtonProps {
    onClick: () => Promise<void>,
    showNext: (arg: string) => void | null;
}

 const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  showNext,
}) => {
  const handleLoadMore = async () => {
    try {
      await onClick(); 
    } catch (error) {
      console.error("Failed to load more:", error);
    }
  };

  return (
    <button onClick={handleLoadMore} className="btn btn-primary">
      Load More
    </button>
  );
};

export default LoadMoreButton;
