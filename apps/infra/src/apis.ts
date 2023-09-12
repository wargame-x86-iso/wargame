import * as gcp from '@pulumi/gcp'

const cloudResourceManagerAPI = new gcp.projects.Service(
  'cloud-resource-manager-api',
  {
    service: 'cloudresourcemanager.googleapis.com',
    disableOnDestroy: false,
  }
)

const containerRegistryAPI = new gcp.projects.Service(
  'container-registry-api',
  {
    service: 'containerregistry.googleapis.com',
    disableOnDestroy: false,
  },
  { dependsOn: [cloudResourceManagerAPI] }
)

export const enabledAPIs = [cloudResourceManagerAPI, containerRegistryAPI]
