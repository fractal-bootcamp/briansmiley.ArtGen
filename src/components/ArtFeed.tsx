/* eslint-disable react-hooks/exhaustive-deps */
//component which loads the 10 most recently created artblocks from the database and displays them

"use client";

import { useEffect, useState } from "react";
import ArtBlock, { ArtBlockProps } from "./ArtBlock";
import { GetArtBlocksResponse } from "@/app/api/feed/route";
import { ArtBlockDataLocal } from "@/services/ArtBlock";
import ArtFeedBlock from "./ArtFeedBlock";

/**Query db for a batch of blocks and whether there are more to get */
const fetchArtBlocks = async (
  artBlocks: ArtBlockDataLocal[]
): Promise<GetArtBlocksResponse> => {
  try {
    const lastId =
      artBlocks.length > 0 ? artBlocks[artBlocks.length - 1].id : null;
    const count = 5;
    const response = await fetch(`/api/feed?lastId=${lastId}&count=${count}`);
    const data: GetArtBlocksResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching art blocks:", error);
    return { artBlocks: [], moreToFetch: false };
  }
};
export default function ArtFeed() {
  const [artBlocks, setArtBlocks] = useState<ArtBlockDataLocal[]>([]); //array of ArtBlockDataLocal objects
  const [moreToFetch, setMoreToFetch] = useState(true); //flag sets to false when db says we have exhausted all blocks
  //Fetch a batch of blocks and add them to state
  const fetchMoreArtBlocks = async () => {
    const data = await fetchArtBlocks(artBlocks);
    setArtBlocks(prev => [...prev, ...data.artBlocks]);
    setMoreToFetch(data.moreToFetch);
  };
  //fetch *one* batch of blocks on initial load
  useEffect(() => {
    (async () => setArtBlocks((await fetchArtBlocks(artBlocks)).artBlocks))();
  }, []);
  return (
    // Display linear feed of artblocks
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-wrap justify-center gap-10">
        {artBlocks.map(artBlock => (
          <ArtFeedBlock key={artBlock.id} {...artBlock} />
        ))}
      </div>
      {/* button that calls fetchArtBlocks when clicked */}
      <button
        className="btn bg-purple-400 mt-3 mb-5"
        onClick={fetchMoreArtBlocks}
        disabled={!moreToFetch}
      >
        {moreToFetch ? "Load More..." : "That's All Folks"}
      </button>
    </div>
  );
}
