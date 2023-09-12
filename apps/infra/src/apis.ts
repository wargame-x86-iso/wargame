import * as gcp from '@pulumi/gcp'

// const serviceControlAPI = new gcp.projects.Service('service-control-api', {
//   service: 'servicecontrol.googleapis.com',
//   disableOnDestroy: false,
// })

// const serviceUsageAPI = new gcp.projects.Service(
//   'service-usage-api',
//   {
//     service: 'serviceusage.googleapis.com',
//     disableOnDestroy: false,
//   },
//   { dependsOn: [serviceControlAPI] }
// )

const cloudResourceManagerAPI = new gcp.projects.Service(
  'cloud-resource-manager-api',
  {
    service: 'cloudresourcemanager.googleapis.com',
    disableOnDestroy: false,
  },
  {
    // dependsOn: [serviceUsageAPI],
  }
)

const containerRegistryAPI = new gcp.projects.Service(
  'container-registry-api',
  {
    service: 'containerregistry.googleapis.com',
    disableOnDestroy: false,
  },
  // { dependsOn: [cloudResourceManagerAPI] }
)

export const enabledAPIs = [containerRegistryAPI]
