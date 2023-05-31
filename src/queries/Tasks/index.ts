import type { AxiosError, AxiosResponse } from 'axios'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query'

import useClient from '@/hooks/useClient'
import { Task } from './Tasks.types'

export const useFetchTasksQuery = (): UseQueryResult<Task[], AxiosError> => {
  const client = useClient()

  return useQuery(['fetchTasks'], async () => await client.get('/tasks'), {
    select: ({ data }) => data
  })
}

export const useAddTask = (): UseMutationResult<AxiosResponse<Task, any>, AxiosError, null> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(['addTask'], async () => await client.put('/tasks/add'), {
    onSuccess: () => {
      queryClient.prefetchQuery(['fetchTasks'])
    }
  })
}

export const useRefreshTask = (): UseMutationResult<AxiosResponse<Task[], any>, AxiosError, undefined> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(['refreshTask'], async () => await client.put('/tasks/regen'), {
    onSuccess: () => {
      queryClient.prefetchQuery(['fetchTasks'])
    }
  })
}

export const useTaskDone = (): UseMutationResult<AxiosResponse, AxiosError, Task> => {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(['taskDone'], async (task) => await client.delete(`/tasks/${task.id}`), {
    onSuccess: () => {
      queryClient.prefetchQuery(['fetchTasks'])
    }
  })
}
