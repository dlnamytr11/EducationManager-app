import { Link, useParams } from 'react-router'
import { assignments } from '../data/assignments'
import type { AssignmentStatus, Assignment } from '../types/assignment'

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

export function AssignmentDetailsPage() {
  const { id } = useParams()
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
      <Link to="/assignments">К списку заданий</Link>
    </section>
  )
}