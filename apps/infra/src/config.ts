import * as pulumi from '@pulumi/pulumi'
import * as gcp from '@pulumi/gcp'

export const project = gcp.config.project || ''
export const location = gcp.config.region || 'us-central1'

export const stack = pulumi.getStack()
export const stackSuffix = stack.toUpperCase()

const github = new pulumi.Config('github')
export const githubRepository = github.require('repository')

const wargame = new pulumi.Config('wargame')
export const altLocation = wargame.require('alt_location')
