import { PropsWithChildren } from 'react';
import { styled, Typography } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const Paragraph = ({ children }: PropsWithChildren) => {
  return <StyledTypography variant="body2">{children}</StyledTypography>;
};
