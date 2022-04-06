import equal from "fast-deep-equal";
import Fuse from "fuse.js";
import { memo } from "react";
import { selector, useRecoilValue } from "recoil";

import { Main, ToolCardGrid, ToolCardGridProps } from "@/components/common";
import { searchTextState } from "@/components/layout/states";
import { homeTools } from "@/data/tools";

type Props = ToolCardGridProps;

const StyledComponent = ({ tools }: Props) => (
  <Main title="Searched tools">
    <ToolCardGrid {...{ tools }} />
  </Main>
);

export const Component = memo(StyledComponent, equal);

const filteredToolsState = selector({
  key: "filteredToolsState",
  get: ({ get }) => {
    const searchText = get(searchTextState).trim();

    if (searchText === "") {
      return { filteredTools: homeTools };
    }

    const searchWords = searchText.split(" ").map(word => ({ keywords: word }));

    const fuse = new Fuse(homeTools, { keys: ["keywords"], threshold: 0.5 });
    const result = fuse.search({ $and: searchWords });
    const filteredTools = result.map(({ item }) => item);

    return { filteredTools };
  },
});

const Container = () => {
  const { filteredTools } = useRecoilValue(filteredToolsState);

  return <Component tools={filteredTools} />;
};

export default Container;
