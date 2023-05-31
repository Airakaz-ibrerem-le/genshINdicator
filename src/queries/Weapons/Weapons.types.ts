export enum WeaponType {
  SWORD = 0,
  CLAYMORE,
  BOW,
  CATALYST,
  POLEARM
}

export interface Weapon {
  id: number
  level: number
  wanted: number
  path: string
  name: string
  phase: number
  wantedPhase: number
  type: WeaponType
}