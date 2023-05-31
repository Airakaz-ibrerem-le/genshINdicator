import styled from 'styled-components'
import { BiFilter, BiPlusCircle } from 'react-icons/bi'

import Task from '../Task'
import Button from '../Button'
import { Task as TaskType } from '@/queries/Tasks/Tasks.types'
import { useAddTask, useFetchTasksQuery, useRefreshTask } from '@/queries/Tasks'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundColor};
`

const ButtonSection = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 5%;
    width: 90%;
    height: 2px;
    background: black;
  }
`

const TaskContainer = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  height: 75vh;
  overflow-y: scroll;
  flex-direction: column;
  padding: 15px;
`

const TASKS: TaskType[] = [{
  id: '1',
  text: 'Gather 3 dandelion seed',
  type: 'Material'
}]

const TaskTab = (): JSX.Element => {
  const { data } = useFetchTasksQuery()
  const { mutateAsync } = useAddTask()
  const { mutateAsync: mutateAsyncTasks } = useRefreshTask()

  if (data === undefined) {
    return (
      <Container>
        Loading...
      </Container>
    )
  }
  
  return (
    <Container>
      <ButtonSection>
        <Button onClick={async () => await mutateAsyncTasks(undefined)}>
          REFRESH
        </Button>
        <Button onClick={() => console.log('Filtering')}>
          <BiFilter />
        </Button>
      </ButtonSection>
      <TaskContainer>
        {data.map((task) => (<Task key={task.id} task={task} />))}
        <Button onClick={async () => await mutateAsync(null)}>
          <BiPlusCircle />
        </Button>
      </TaskContainer>
    </Container>
  )
}

export default TaskTab
