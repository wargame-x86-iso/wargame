import * as gcp from '@pulumi/gcp'

import { project, location } from './config'
import { enabledAPIs } from './apis'

// export const containerRegistry = new gcp.container.Registry(
//   'gcr-registry',
//   {
//     project,
//     location,
//   },
//   { dependsOn: enabledAPIs }
// )

export const containerRegistryServiceAccount = new gcp.serviceaccount.Account(
  'gcr-service-account',
  {
    accountId: 'gcr-service-account',
    displayName: 'GCR Service Account',
    description: 'Service account for CI services that interact with GCR',
  }
)

export const containerRegistryServiceAccountStorageAdminBinding =
  new gcp.projects.IAMBinding('gcr-service-account-storage-admin-binding', {
    role: 'roles/storage.admin',
    project,
    members: [
      containerRegistryServiceAccount.email.apply(
        (email) => `serviceAccount:${email}`
      ),
    ],
  })

export const containerRegistryServiceAccountToken = new gcp.serviceaccount.Key(
  'gcr-service-account-token',
  {
    serviceAccountId: containerRegistryServiceAccount.accountId,
    publicKeyType: 'TYPE_X509_PEM_FILE',
  }
)
