import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import type { Assignment, AssignmentStatus } from '../types/assignment'

type AssignmentDetailsPageProps = {
  assignments: Assignment[]
  onDelete: (id: string) => Promise<void>
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
  const [pending, setPending] = useState(false)
  const [deleteError, setDeleteError] = useState('')
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

       {deleteError && <p role="alert">{deleteError}</p>}
       <div className="assignment-actions">
        <Link to={`/assignments/${assignment.id}/edit`}>Редактировать</Link>
        <Link to="/assignments">К списку заданий</Link>
        <button
          type="button"
          disabled={pending}
          onClick={async () => {
            if (!window.confirm(`Удалить задание «${assignment.title}»?`)) return
            try {
              setPending(true)
              setDeleteError('')
              await onDelete(assignment.id)
              navigate('/assignments', { replace: true })
            } catch (err: unknown) {
              setDeleteError(
                err instanceof Error ? err.message : 'Не удалось удалить задание.',
              )
              setPending(false)
            }
          }}
        >
          {pending ? 'Удаляем…' : 'Удалить'}
        </button>
      </div>
    </section>
  )
}