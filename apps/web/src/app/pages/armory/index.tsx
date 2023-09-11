import { ArmoryContextProvider } from './context'
import { HeavyWeapons } from './heavy-weapons'
import { ArmoryLayout } from './layout'
import { SmallArms } from './small-arms'

export function Armory() {
  return (
    <ArmoryContextProvider>
      <ArmoryLayout
        header={<div>Header</div>}
        smallArms={<SmallArms />}
        heavyWeapons={<HeavyWeapons />}
      />
    </ArmoryContextProvider>
  )
}
