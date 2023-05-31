import TaskTab from '@/components/TaskTab'
import TabHolder from '@/components/TabHolder'
import CollectionTab from '@/components/CollectionTab'
import type { TabType } from '@/components/TabHolder/TabHolder.types'

// const val: TrueObject = { obj: "toto", id: 1 }
// const { obj } = val

// const squared (val) => val.id * val.id
// const squared ({ id }: TrueObject) => id * id
// squared({ obj: "tata", id: 42 })

// `My variable is : ${(variable) => { return variable }}` -> f"My variable is : {variable}"

const TABS: TabType[] = [{
  key: 'collection',
  title: 'Collection',
  content: (<CollectionTab />)
}, {
  key: 'task',
  title: 'Daily Task',
  content: (<TaskTab />)
}]

const Home = (): JSX.Element => {
  return (
    <TabHolder tabs={TABS} />
  )
}

export default Home
