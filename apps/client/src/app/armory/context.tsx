import { createContext, useEffect, useState } from 'react'

import { Weapon } from '@wargame/roster'

export interface ArmoryContext {
  smallArms: Weapon[]
  heavyWeapons: Weapon[]
}

export const ArmoryContext = createContext<ArmoryContext>({
  smallArms: [],
  heavyWeapons: [],
})

export interface ArmoryContextProviderProps {
  children: React.ReactNode
}

export function ArmoryContextProvider(props: ArmoryContextProviderProps) {
  const [result, setResult] = useState<any>(null)
  useEffect(() => {
    if (result) return
    fetch('http://localhost:8080/roster')
      .then((res) => res.json())
      .then((result) => {
        setResult(result)
      })
      .catch((err) => {
        console.error(err)
      })
  })
  const { small_arms = [], heavy_weapons = [] } = result || {}
  console.log(result)
  return (
    <ArmoryContext.Provider
      value={{
        smallArms: small_arms,
        heavyWeapons: heavy_weapons,
      }}
    >
      {props.children}
    </ArmoryContext.Provider>
  )
}
