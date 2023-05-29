import { UseMutationResult, UseQueryResult, useQuery, useQueryClient, useMutation } from 'react-query'
import type { AxiosError } from 'axios'

import useClient from '@/hooks/useClient'
import type { Character } from './Characters.types'

const buildCharacter = (data: any): Character => {
  console.log(data)
  return {
    ...data,
    skill: data.skillDtos,
    weapon: data.weaponDto
  }
} 

export const useFetchOwnedCharQuery = (): UseQueryResult<Character[], AxiosError> => {
  const client = useClient()

  return useQuery(['fetchOwnedCharacters'], async () => await client.get('/ownedcharacters'), {
    select: ({ data }) => data.map((val: any) => buildCharacter(val))
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

  return useMutation(['addCharacter'], async (char) => client.put('/ownedcharacters/add', char), {
    onSuccess: (data) => {
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
      queryClient.refetchQueries('fetchAvailableCharacters')
    }
  })
}
