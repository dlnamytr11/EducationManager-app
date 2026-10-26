import { Link, useNavigate, useParams } from 'react-router'
import { AssignmentForm } from '../components/AssignmentForm'
import type { Assignment, AssignmentDraft } from '../types/assignment'

type EditAssignmentPageProps = {
  assignments: Assignment[]
  onUpdate: (id: string, draft: AssignmentDraft) => void
}

export function EditAssignmentPage({ assignments, onUpdate }: EditAssignmentPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const assignment = assignments.find((item) => item.id === id)

  if (!assignment) {
    return (
      <section>
        <h1>Задание не найдено</h1>
        <Link to="/assignments">К списку</Link>
      </section>
    )
  }

  const initialValues: AssignmentDraft = {
    title: assignment.title,
    description: assignment.description,
    course: assignment.course,
    status: assignment.status,
    dueDate: assignment.dueDate,
    complexity: assignment.complexity,
  }

  return (
    <section>
      <h1>Редактирование задания</h1>
      <AssignmentForm
        key={assignment.id}
        initialValues={initialValues}
        onSave={(draft) => {
          onUpdate(assignment.id, draft)
          navigate(`/assignments/${assignment.id}`)
        }}
        onCancel={() => navigate(`/assignments/${assignment.id}`)}
      />
    </section>
  )
}