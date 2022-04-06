import { SpaceBar } from "@mui/icons-material";
import { FormControl, MenuItem, Select } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { css } from "@mui/material/styles";
import { memo } from "react";

import { Configurations } from "@/components/common";

const spacesArray = [2, 4, 0] as const;
export type Spaces = typeof spacesArray[number];
export const isSpaces = (x: number): x is Spaces => spacesArray.includes(x as Spaces);

type OnSelectChange<T> = NonNullable<SelectInputProps<T>["onChange"]>;

export type Props = {
  spaces: Spaces;
  onSpacesChange: OnSelectChange<Spaces>;
};

const select = css`
  & .MuiSelect-select:focus {
    background-color: transparent;
  }
`;

const StyledComponent = ({ spaces, onSpacesChange }: Props) => (
  <Configurations
    configurations={[
      {
        icon: <SpaceBar />,
        title: "Indentation",
        input: (
          <FormControl variant="standard">
            <Select value={spaces} onChange={onSpacesChange} css={select}>
              {spacesArray.map(value => (
                <MenuItem key={value} {...{ value }}>
                  {value === 0 ? "minified" : `${value} spaces`}
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
