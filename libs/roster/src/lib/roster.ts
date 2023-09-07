export interface Weapon {
  id: string
  name: string
  description: string
  accuracy: number
  range: number
  damage: number
  ammo: number
  rate: number
  attributes: string[]
}

export interface Soldier {
  id: string
  name: string
  description: string
  speed: number
  armor: number
}

export interface Team {
  id: string
  name: string
  personnel: Soldier[]
}

export interface Vehicle {
  id: string
  name: string
  speed: number
  armor: number
  team: Team
  weapon: Weapon
  secondaryWeapon: Weapon | null
}

export interface Gun {
  id: string
  name: string
  speed: number
  armor: number
  team: Team
  weapon: Weapon
  secondaryWeapon: Weapon | null
}
