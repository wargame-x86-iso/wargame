import { useContext } from 'react'

import { GridLayout } from '../../components'

import { ArmoryContext } from './context'
import { WeaponCard } from './weapon-card'

export function HeavyWeapons() {
  const ctx = useContext(ArmoryContext)
  return (
    <GridLayout
      items={ctx.heavyWeapons}
      keyOf={(weapon) => weapon.id}
      renderItem={(weapon) => (
        <WeaponCard
          name={weapon.name}
          description={weapon.description}
          damage={weapon.damage}
          maxDamage={12}
          accuracy={weapon.accuracy}
          maxAccuracy={10}
          ammo={weapon.ammo}
          maxAmmo={10}
          range={weapon.range}
          maxRange={24}
          rate={weapon.rate}
          maxRate={4}
          attributes={weapon.attributes}
        />
      )}
    />
  )
}
