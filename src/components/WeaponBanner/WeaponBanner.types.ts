import { Weapon } from "@/queries/Weapons/Weapons.types"

export interface WeaponBannerProps {
  onClick: () => void
  weapon?: Weapon
}
