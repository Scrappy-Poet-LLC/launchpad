/**
 * A mapping of the standard GitHub branches used for our product environments,
 * keyed by more semantic names.
 */
export enum Environment {
  PRODUCTION = 'main',
  STAGING = 'staging',
};

export enum PullRequestState {
  READY = 'ready',
  NOT_READY = 'not ready',
};

export enum DeploymentState {
  DEPLOYING = 'deploying',
  ROLLING_BACK = 'rolling back',
  NEEDS_QA = 'needs QA',
  REVERTED = 'reverted',
  FAILED = 'failed',
  REJECTED = 'rejected',
  SHIPPED = 'shipped',
};

export type PullRequest = {
  id: string;
  componentId: string;
  number: number;
  title: string;
  head: string;
  target: Environment;
  url: string;
  author: {
    handle: string;
    url: string;
  };
  repo: {
    name: string;
    owner: string;
  };
  timestamp: string;
  state: PullRequestState;
};
// NOTE(dabrady) Some data is injected by the client, not stored in the DB.
export type RawPullRequest = Omit<PullRequest, 'state'>;