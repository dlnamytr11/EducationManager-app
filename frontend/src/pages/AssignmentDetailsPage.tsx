import { Link, useNavigate, useParams } from 'react-router'
import type { Assignment, AssignmentStatus } from '../types/assignment'

type AssignmentDetailsPageProps = {
  assignments: Assignment[]
  onDelete: (id: string) => void
}

const statusLabels: Record<AssignmentStatus, string> = {
  not_started: 'Не начато',
  in_progress: 'В процессе',
  done: 'Выполнено',
}

const complexityLabels: Record<Assignment['complexity'], string> = {
  low: 'Низкая',
  medium: 'Средняя',
  high: 'Высокая',
}

export function AssignmentDetailsPage({ assignments, onDelete }: AssignmentDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const assignment = assignments.find((item) => item.id === id)

  if (!assignment) {
    return (
      <section>
        <h1>Задание не найдено</h1>
        <p>Задания с таким адресом не существует.</p>
        <Link to="/assignments">К списку заданий</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{assignment.title}</h1>
      <p>{assignment.description}</p>
      <p>Курс: {assignment.course}</p>
      <p>Срок: {assignment.dueDate}</p>
      <p>Статус: {statusLabels[assignment.status]}</p>
      <p>Сложность: {complexityLabels[assignment.complexity]}</p>
       <div className="assignment-actions">
      <Link to={`/assignments/${assignment.id}/edit`}>Редактировать</Link>
      <Link to="/assignments">К списку заданий</Link>
      <button
        type="button"
        onClick={() => {
          if (window.confirm(`Удалить задание «${assignment.title}»?`)) {
            onDelete(assignment.id)
            navigate('/assignments', { replace: true })
          }
        }}
      >
        Удалить
      </button>
      </div>
    </section>
  )
}