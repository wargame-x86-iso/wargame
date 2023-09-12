import * as github from '@pulumi/github'

import { stackSuffix, githubRepository } from './config'
import { containerRegistryServiceAccountToken } from './container-registry'

// const privateKeyJSON = containerRegistryServiceAccountToken.privateKey.apply(
//   (x) =>
//     Buffer.from(x, 'base64')
//       .toString('utf-8')
//       .replace(/(\r\n|\n|\r)/gm, '')
// )

export const githubActionSecrets: github.ActionsSecret[] = [
  // new github.ActionsSecret('gcr-service-account-token-action-secret', {
  //   secretName: `GCR_SERVICE_ACCOUNT_TOKEN_${stackSuffix}`,
  //   plaintextValue: privateKeyJSON,
  //   repository: githubRepository,
  // }),
]
