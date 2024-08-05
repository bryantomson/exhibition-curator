import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

type Artwork = {
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

export type CollectionItem = {
  artwork: Artwork
}

type CollectionState = {
  items: Artwork[],
  setItems: (items: Artwork[]) => void,
  addItem: (artwork: Artwork) => void,
  removeItem: (id: string) => void,
  clearCollection: () => void
}

export const useCollection = create<CollectionState>() (
  persist(
    (set) => ({
      items: [] as Artwork[],
      setItems: (items: Artwork[]) => set({ items }),
      addItem: (artwork) => set((state) => {
        return {
          ...state,
          items: [...state.items, artwork]
        }
      }),
      removeItem: (id) => set((state) => {
        return {
          items: state.items.filter((item) => item.id !== id)
        }
      }),
      clearCollection: () => set({ items: [] })
    }),
    {
      name: "collection-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
