import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  css,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { memo, ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
} & Pick<LinkProps, "href">;

const cardStyle = css`
  text-align: left;
  width: 160px;
  height: 300px;
`;

const cardActionArea = css`
  height: 100%;
`;

const cardMedia = (theme: Theme) => css`
  text-align: center;
  padding: ${theme.spacing(4)};
`;

const cardMediaIconWrapper = (theme: Theme) => css`
  padding: ${theme.spacing(2)};
  height: 96px;
  > * {
    width: 100%;
    height: 100%;
  }
`;

const cardContent = css`
  padding-top: 0;
`;

const cardTitle = css`
  font-size: 14px;
  font-weight: 500;
`;

const cardDescription = (theme: Theme) => css`
  font-size: 12px;
  color: ${theme.palette.grey[600]};
`;

const StyledComponent = ({ icon, title, description, href, disabled }: Props) => {
  const card = (
    <Card css={cardStyle}>
      <NextLink {...{ href }} passHref>
        <CardActionArea
          {...{ disabled }}
          css={cardActionArea}
          style={{ opacity: disabled ? 0.5 : 1.0 }}
        >
          <CardMedia css={cardMedia}>
            <Box css={cardMediaIconWrapper}>{icon}</Box>
          </CardMedia>
          <CardContent css={cardContent}>
            <Typography gutterBottom variant="h3" css={cardTitle}>
              {title}
            </Typography>
            <Typography variant="body2" css={cardDescription}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );

  return disabled ? (
    <Tooltip title="coming soon!" placement="top" arrow>
      {card}
    </Tooltip>
  ) : (
    card
  );
};

export const Component = memo(StyledComponent);

export default Component;
