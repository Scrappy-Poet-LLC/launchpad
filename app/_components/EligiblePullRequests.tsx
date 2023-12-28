'use client';
import {
  Box,
  CircularProgress,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';

import { PullRequest, PullRequestState } from '@/types';
import { Chips } from '@/_components/constants';
import { useTargetEnvironment } from '@/_components/TargetEnvironment';
import usePullRequests from '@/_components/utils/usePullRequests';

interface Props {
  components: string[];
  actions: { [key in PullRequestState]: React.ReactNode[] };
}
export default function EligiblePullRequests({ components, actions }: Props) {
  var { targetEnv } = useTargetEnvironment();
  // TODO(dabrady) Make a component for owning the PRs of one component, then
  // pre-render them all and provide a filter.
  var [pullRequests, loaded] = usePullRequests(components, targetEnv);

  if (!loaded) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align='center'>Pull Request</TableCell>
            <TableCell align='center'>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object
            .values(pullRequests)
            .flat()
            .map(
              function renderItem(pullRequest: PullRequest, index) {
                var {
                  componentId,
                  number,
                  title,
                  url,
                  state,
                  author: {
                    handle: authorHandle,
                    url: authorUrl,
                  },
                } = pullRequest;
                return (
                  <TableRow key={index} hover>
                    <TableCell align='center' width={150}>
                      {Chips[state]}
                    </TableCell>
                    <TableCell width={150}>
                      <Link href={url} underline='hover'>
                        <code>{componentId} #{number}</code>
                      </Link>
                      <br/>
                      {title}
                    </TableCell>
                    <TableCell align='center' width={150}>
                      <Link href={authorUrl} underline='hover'>{authorHandle}</Link>
                    </TableCell>
                    <TableCell width={150}>
                      <Stack spacing={1} direction="row" justifyContent='center'>
                        {...actions[state](pullRequest)}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              },
            )
          }
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TableContainer>
  );
}