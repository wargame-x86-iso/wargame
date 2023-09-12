import {
  containerRegistryServiceAccount,
  githubActionSecrets,
  // containerRegistry,
} from './src'

// export const containerRegistryURI = containerRegistry.bucketSelfLink

export const containerRegistryServiceAccountName =
  containerRegistryServiceAccount.displayName

export const githubActionSecretNames = githubActionSecrets.map(
  (s) => s.secretName
)

export { project, location, githubRepository, stack } from './src'
