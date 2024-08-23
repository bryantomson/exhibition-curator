import React from "react";
import CollectionCount from "./CollectionCount";
import CollectionSummary from "./CollectionSummary";
import { Expand, Images, RotateCcw } from "lucide-react";
import Link from "next/link";
import ClearCollection from "./ClearCollection";
import { X } from "lucide-react";

const CollectionDrawer = () => {
  return (
    <div>
      <div className="drawer drawer-end ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4" className="drawer-button">
            <div className="m-3 flex items-center cursor-pointer bg-base-200 p-2 rounded-lg">
              <Images size={48} absoluteStrokeWidth className="text-primary" />
              <p className="ml-2  ">
                View Collection <CollectionCount />
              </p>
            </div>
          </label>
        </div>
        <div className="drawer-side 	 ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>

          <div className="shadow-sm menu w-[40%] overflow-hidden p-4 h-screen bg-base-200 text-base-content flex flex-col">
            <div className="flex-grow  overflow-x-hidden pb-16 relative w-full">
              <label htmlFor="my-drawer-4" className="drawer-button">
                <div className="flex items-center ">
                  <div
                    className="cursor-pointer tooltip  drawer-button tooltip-right"
                    data-tip="Hide collection"
                  >
                    <X />
                  </div>
                  <h1 className="text-xl text-primary font-bold ml-4">
                    My Collection
                  </h1>
                </div>
              </label>

              <CollectionSummary />
            </div>
            <div className="absolute bottom-2 flex  flex-row justify-between left-0 right-0  bg-base-200 p-2">
              <ClearCollection />

              <button
                className="tooltip tooltip-left mr-5"
                data-tip="Expand collection"
                aria-label="Expand collection"
              >
                <Link href="/collection">
                  <Expand />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDrawer;
