import { ComponentPropsWithoutRef, memo } from "react";

import { Main, ToolCardGrid } from "@/components/common";
import { allTools } from "@/data/tools";

type Props = ComponentPropsWithoutRef<typeof ToolCardGrid>;

const StyledComponent = ({ tools }: Props) => (
  <Main title="All tools">
    <ToolCardGrid {...{ tools }} />
  </Main>
);

export const Component = memo(StyledComponent);

const Container = () => <Component tools={allTools} />;

export default Container;
