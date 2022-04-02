import { FontDownload } from "@mui/icons-material";
import { FormControlLabel, Switch } from "@mui/material";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { memo } from "react";

import { Configurations } from "@/components/common";

type SwitchChecked = NonNullable<SwitchBaseProps["checked"]>;
type OnSwitchChange = NonNullable<SwitchBaseProps["onChange"]>;

type Props = {
  uppercase: SwitchChecked;
  onCaseChange: OnSwitchChange;
};

const StyledComponent = ({ uppercase, onCaseChange }: Props) => (
  <Configurations
    configurations={[
      {
        icon: <FontDownload />,
        title: "Uppercase",
        input: (
          <FormControlLabel
            labelPlacement="start"
            label={uppercase ? "On" : "Off"}
            control={<Switch checked={uppercase} onChange={onCaseChange} />}
          />
        ),
      },
    ]}
  />
);

export const Component = memo(StyledComponent);

export default Component;
