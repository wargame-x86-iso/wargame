import * as gcp from '@pulumi/gcp'

export const enabledAPIs = [
  new gcp.projects.Service('container-registry-api', {
    service: 'containerregistry.googleapis.com',
    disableOnDestroy: false,
  }),
]
