import { Link } from 'react-router'
import type { Assignment, AssignmentStatus } from '../types/assignment'

type AssignmentCardProps = { assignment: Assignment }

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

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  return (
    <article className="assignment-card">
      <h2>
        <Link to={`/assignments/${assignment.id}`}>{assignment.title}</Link>
      </h2>
      <p>{assignment.description}</p>
      <p>Курс: {assignment.course}</p>
      <p>Срок: {assignment.dueDate}</p>
      <p>Статус: {statusLabels[assignment.status]}</p>
      <p>Сложность: {complexityLabels[assignment.complexity]}</p>
    </article>
  )
}