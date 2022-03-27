import { AutoFixHigh } from "@mui/icons-material";
import { FormControlLabel, Switch } from "@mui/material";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { memo } from "react";

import { Configurations } from "@/components/common";

type SwitchChecked = NonNullable<SwitchBaseProps["checked"]>;
type OnSwitchChange = NonNullable<SwitchBaseProps["onChange"]>;

type Props = {
  format: SwitchChecked;
  onFormatChange: OnSwitchChange;
};

const StyledComponent = ({ format, onFormatChange }: Props) => (
  <Configurations
    configurations={[
      {
        icon: <AutoFixHigh />,
        title: "Format number",
        input: (
          <FormControlLabel
            labelPlacement="start"
            label={format ? "On" : "Off"}
            control={<Switch checked={format} onChange={onFormatChange} />}
          />
        ),
      },
    ]}
  />
);

export const Component = memo(StyledComponent);

export default Component;
