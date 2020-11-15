// Task lanes will be pre-populated with this data
const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Drink coffee' },
    'task-2': { id: 'task-2', content: 'Get a new job' },
    'task-3': { id: 'task-3', content: 'Buy a house' }
  },
  lanes: {
    'lane-1': {
      id: 'lane-1',
      title: 'To Do',
      taskIds: [ 'task-3' ]
    },
    'lane-2': {
      id: 'lane-2',
      title: 'In Progress',
      taskIds: [ 'task-2' ]
    },
    'lane-3': {
      id: 'lane-3',
      title: 'Done',
      taskIds: [ 'task-1' ]
    }
  }
}

export default initialData
