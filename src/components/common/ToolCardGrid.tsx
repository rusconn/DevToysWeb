import { Grid } from "@mui/material";
import equal from "fast-deep-equal";
import { ComponentPropsWithoutRef, memo } from "react";

import ToolCard from "./ToolCard";

type Props = {
  tools: ComponentPropsWithoutRef<typeof ToolCard>[];
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
