import { Grid } from "@mui/material";
import equal from "fast-deep-equal";
import { memo } from "react";

import ToolCard, { Props as ToolCardProps } from "./ToolCard";

export type Props = {
  tools: ToolCardProps[];
};

const StyledComponent = ({ tools }: Props) => (
  <Grid container rowSpacing={4} columnSpacing={2}>
    {tools.map(({ icon, title, description, href, disabled }) => (
      <Grid key={title} item>
        <ToolCard {...{ icon, title, description, href, disabled }} />
      </Grid>
    ))}
  </Grid>
);

export const Component = memo(StyledComponent, equal);

export default Component;
