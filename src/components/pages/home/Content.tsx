import { memo } from "react";

import { Main, ToolCardGrid, ToolCardGridProps } from "@/components/common";
import { homeTools } from "@/data/tools";

type Props = ToolCardGridProps;

const StyledComponent = ({ tools }: Props) => (
  <Main title="All tools" height="fit-content">
    <ToolCardGrid {...{ tools }} />
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => <Component tools={homeTools} />;

export default Container;
