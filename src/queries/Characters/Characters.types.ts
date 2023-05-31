import { Weapon, WeaponType } from "../Weapons/Weapons.types"

export enum SkillType {
  AUTO = 0,
  ELEMENTAL,
  BURST
}

export interface Skill {
  type: SkillType
  level: number
  wanted: number
}

export interface Character {
  id: number
  name: string
  phase: number
  wantedPhase: number
  level: number
  wanted: number
  path: string
  elementPath: string
  skill: Skill[]
  weapon?: Weapon
  type: WeaponType
  rating: number
}
