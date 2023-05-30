import type { Character } from '@/queries/Characters/Characters.types'

export interface ModifyCharacterProps {
  onClose: () => void
  character: Character
}
