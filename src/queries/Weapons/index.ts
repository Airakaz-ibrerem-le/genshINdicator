import { UseMutationResult, UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query'
import type { AxiosError } from 'axios'

import useClient from '@/hooks/useClient'
import { Character } from '../Characters/Characters.types'
import { Weapon, WeaponType } from './Weapons.types'

export const useFetchAvailableWeaponsQuery = (weaponType: WeaponType): UseQueryResult<Weapon[], AxiosError> => {
  const client = useClient()

  return useQuery(['fetchAvailableWeapons'], async () => await client.get('/availableweapons', {
    params: {
      type: weaponType
    }
  }), {
    select: ({ data }) => data
  })
}

export const useAddWeapon = (charId: Number): UseMutationResult<Character, AxiosError, Weapon> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(['addWeapon', charId], async (weapon) => await client.put(`/ownedcharacters/${charId}/weapon`, weapon), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['fetchOwnedCharacter'])
    }
  })
}
