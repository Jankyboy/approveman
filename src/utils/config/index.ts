import { GITHUB_ENTERPRISE_APP_ACTOR_NOT_FOUND } from "./err_msg";
/* eslint-disable @typescript-eslint/no-unused-vars */
import minimatch from "minimatch";
/* eslint-enable @typescript-eslint/no-unused-vars */

export const APP_CHECK_NAME = "ApproveMan";

/**
 * The filename pattern that represents the configuration files for
 * the repository.
 */
export const GITHUB_REPOSITORY_CONFIG_FILE_PATTERN = "**/.github/**/*";

/**
 * The default app actor name, this is assigned by GitHub
 * Marketplace, so all GitHub user will see this.
 * By contrast, GitHub Enterprise users will see otherwise.
 */
export const DEFAULT_APP_ACTOR_NAME = "approveman[bot]";

/**
 * Resolve the app actor name that should be used.
 *
 * The app installed on GitHub, no matter with personal or
 * orgranization account will have the app actor name as
 * {@link DEFAULT_APP_ACTOR_NAME}, but GitHub enterprise
 * will have a different name since the app is running in
 * a enterprise defined environment.
 *
 * TODO(tianhaoz95): try to see if the actor name can be
 * detected automatically to some degree.
 *
 * @returns The resolved app actor name.
 */
export const getAppActorName = (): string => {
  if (process.env.GHE_HOST) {
    /* istanbul ignore else */
    if (process.env.APP_ACTOR_NAME_OVERRIDE) {
      return process.env.APP_ACTOR_NAME_OVERRIDE;
    } else {
      /**
       * Since there is already a static health check at
       * the beginning of the server boot up. This branch
       * will never run in practice. However, it's left
       * here for some unknown situations since the host
       * environment can get weird sometimes.
       */
      throw Error(GITHUB_ENTERPRISE_APP_ACTOR_NOT_FOUND);
    }
  }
  return DEFAULT_APP_ACTOR_NAME;
};

/**
 * The minimatch option that should be used to match
 * user defined files against pull requests.
 */
export const MATCH_OPTIONS: minimatch.IOptions = {
  dot: true,
};
