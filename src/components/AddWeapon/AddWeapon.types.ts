import { WeaponType } from "@/queries/Weapons/Weapons.types"

export interface AddWeaponProps {
  charId: number
  charWeaponType: WeaponType
  onConfirm: () => void
}
