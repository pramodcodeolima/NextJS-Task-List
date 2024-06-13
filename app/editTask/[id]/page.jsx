
import EditTaskForm from '@/components/EditTaskForm';

const getTaskById = async(id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      cache: 'no-store',
    })

    if(!res.ok){
      throw new Error('Failed to Fetch Data...')
    }

    return res.json();
  } catch (error) {
    console.log(error)
  }
}

export default async function editTask({ params }) {
  const { id } = params
  const tasklist = await getTaskById(id);
  const newid = tasklist.task._id
  const task = tasklist.task.task
  const description = tasklist.task.description

  return (
    <EditTaskForm  id={newid} task={task} description={description} />
  )
}
