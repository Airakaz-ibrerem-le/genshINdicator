import { UseMutationResult, UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query'
import type { AxiosError } from 'axios'

import useClient from '@/hooks/useClient'
import type { Character } from './Characters.types'

const buildCharacter = (data: any): Character => {
  return {
    ...data,
    skill: data.skillDtos,
    weapon: data.weaponDto
  }
} 

const toDTO = (character: Character): any => {
  console.log(character.weapon)
  const res = {
    ...character,
    skillDtos: character.skill,
    weaponDto: character.weapon,
    skill: undefined,
    weapon: undefined
  }
  delete res.skill
  delete res.weapon
  console.log(res)
  return res
}

export const useFetchOwnedCharQuery = (): UseQueryResult<Character[], AxiosError> => {
  const client = useClient()

  return useQuery(['fetchOwnedCharacters'], async () => await client.get('/ownedcharacters'), {
    select: ({ data }) => data.map((val: any) => buildCharacter(val))
  })
}

export const useFetchOwnedCharDetailQuery = (id: number): UseQueryResult<Character, AxiosError> => {
  const client = useClient()

  return useQuery(['fetchOwnedCharacter'], async () => await client.get(`/ownedcharacters/${id}`), {
    select: ({ data }) => buildCharacter(data)
  })
}

export const useModifyOwnedChar = (): UseMutationResult<Character, AxiosError, Character> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(['modifyCharacter'], async (char) => client.put(`/ownedcharacters/${char.id}`, toDTO(char)), {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(['fetchOwnedCharacter'])
    }
  })
}

export const useFetchAvailableCharQuery = (): UseQueryResult<Character[], AxiosError> => {
  const client = useClient()

  return useQuery(['fetchAvailableCharacters'], async () => await client.get('/availablecharacters'), {
    select: ({ data }) => data.map((val: any) => buildCharacter(val))
  })
}

export const useAddCharacter = (): UseMutationResult<Character, AxiosError, Character> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(['addCharacter'], async (char) => client.put('/ownedcharacters/add', toDTO(char)), {
    onSuccess: (data) => {
      console.log('Successfully added character')
      console.log(JSON.stringify(data, null, 2))
      queryClient.refetchQueries('fetchOwnedCharacters')
      queryClient.refetchQueries('fetchAvailableCharacters')
    }
  })
}

export const useDeleteCharacter = (): UseMutationResult<null, AxiosError, Character> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(['addCharacter'], async (char) => client.delete(`/ownedcharacters/${char.id}`), {
    onSuccess: () => {
      queryClient.refetchQueries('fetchOwnedCharacters')
      queryClient.invalidateQueries('fetchOwnedCharacter')
      queryClient.refetchQueries('fetchAvailableCharacters')
    }
  })
}
