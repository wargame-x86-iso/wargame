import type { Express } from 'express'
import * as yaml from 'yaml'
import * as fs from 'fs/promises'

export function addRosterRoutes(app: Express) {
  app.get('/roster', async (req, res) => {
    try {
      const raw = await fs.readFile(
        __dirname + '/assets/roster/weapons.yml',
        'utf8'
      )
      const roster = yaml.parse(raw)
      res.json(roster)
    } catch (e) {
      console.error(e)
      res.status(503).json({ error: 'unavailable' })
    }
  })
}
