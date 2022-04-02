import { FontDownload, HorizontalRule, Tune } from "@mui/icons-material";
import { FormControl, FormControlLabel, MenuItem, Select, Switch } from "@mui/material";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { css } from "@mui/material/styles";
import { memo } from "react";

import { Configurations } from "@/components/common";

const uuidVersions = [1, 4] as const;
export type UuidVersion = typeof uuidVersions[number];
export const isUuidVersion = (x: number): x is UuidVersion =>
  uuidVersions.includes(x as UuidVersion);

type SwitchChecked = NonNullable<SwitchBaseProps["checked"]>;
type OnSwitchChange = NonNullable<SwitchBaseProps["onChange"]>;
type OnSelectChange<T> = NonNullable<SelectInputProps<T>["onChange"]>;

type Props = {
  hyphens: SwitchChecked;
  uppercase: SwitchChecked;
  uuidVersion: UuidVersion;
  onHyphensChange: OnSwitchChange;
  onCaseChange: OnSwitchChange;
  onUuidVersionChange: OnSelectChange<UuidVersion>;
};

const select = css`
  & .MuiSelect-select:focus {
    background-color: transparent;
  }
`;

const StyledComponent = ({
  hyphens,
  uppercase,
  uuidVersion,
  onHyphensChange,
  onCaseChange,
  onUuidVersionChange,
}: Props) => (
  <Configurations
    configurations={[
      {
        icon: <HorizontalRule />,
        title: "Hyphens",
        input: (
          <FormControlLabel
            labelPlacement="start"
            label={hyphens ? "On" : "Off"}
            control={<Switch checked={hyphens} onChange={onHyphensChange} />}
          />
        ),
      },
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
      {
        icon: <Tune />,
        title: "UUID version",
        input: (
          <FormControl variant="standard">
            <Select value={uuidVersion} onChange={onUuidVersionChange} css={select}>
              {uuidVersions.map(value => (
                <MenuItem key={value} {...{ value }}>
                  {value === 1 ? "1" : "4 (GUID)"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
    ]}
  />
);

export const Component = memo(StyledComponent);

export default Component;
