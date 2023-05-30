import styled from 'styled-components'
import { BiFilter } from 'react-icons/bi'

import Button from '../Button'
import Task from '../Task'
import { Task as TaskType } from '@/queries/Tasks/Tasks.types'

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
  display: flex;
  align-items: center;
  gap: 15px;
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
  return (
    <Container>
      <ButtonSection>
        <Button onClick={() => console.log('refreshing')}>
          REFRESH
        </Button>
        <Button onClick={() => console.log('Filtering')}>
          <BiFilter />
        </Button>
      </ButtonSection>
      <TaskContainer>
        {TASKS.map((task) => (<Task key={task.id} task={task} />))}
      </TaskContainer>
    </Container>
  )
}

export default TaskTab
