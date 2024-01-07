import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

export default function Link({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      <MuiLink {...props}>
        {children}
      </MuiLink>
    </NextLink>
  );
}