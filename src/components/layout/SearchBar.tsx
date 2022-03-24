import SearchIcon from "@mui/icons-material/Search";
import { Box, css, InputBase, Paper, Theme } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEventHandler, memo, useCallback } from "react";
import { useRecoilState } from "recoil";

import { pagesPath } from "@/libs/$path";

import { searchTextState } from "./states";

type Props = {
  text: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const container = css`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
`;

const input = (theme: Theme) => css`
  flex: 1;
  margin-left: ${theme.spacing(1)};
`;

const iconWrapper = (theme: Theme) => css`
  padding: ${theme.spacing(1)};
  > * {
    color: rgba(0, 0, 0, 0.54);
    vertical-align: middle;
  }
`;

const StyledComponent = ({ text, onChange }: Props) => (
  <Paper css={container}>
    <InputBase
      placeholder="Type to search for tools..."
      value={text}
      {...{ onChange }}
      css={input}
    />
    <Box css={iconWrapper}>
      <SearchIcon />
    </Box>
  </Paper>
);

export const Component = memo(StyledComponent);

const Container = () => {
  const [text, setText] = useRecoilState(searchTextState);
  const router = useRouter();

  const onChange: Props["onChange"] = useCallback(
    ({ currentTarget: { value } }) => {
      setText(value);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(pagesPath.$url());
    },
    [setText, router]
  );

  return <Component {...{ text, onChange }} />;
};

export default Container;
