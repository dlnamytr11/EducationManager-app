import { useState } from 'react'
import { Link } from 'react-router'
import { AssignmentCard } from '../components/AssignmentCard'
import type { Assignment, AssignmentStatus } from '../types/assignment'

type AssignmentsPageProps = { assignments: Assignment[] }

export function AssignmentsPage({ assignments }: AssignmentsPageProps) {
  const [status, setStatus] = useState<AssignmentStatus | 'all'>('all')

  const visibleAssignments = assignments.filter(
    (assignment) => status === 'all' || assignment.status === status
  )

  return (
    <section>
      <h1>Мои задания</h1>
      <Link to="/assignments/new">Добавить задание</Link>

      <div className="filter-bar">
        <label htmlFor="status-filter">Статус</label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => {
            const value = e.target.value
            if (value === 'all' || value === 'not_started' || value === 'in_progress' || value === 'done') {
              setStatus(value)
            }
          }}
        >
          <option value="all">Все</option>
          <option value="not_started">Не начато</option>
          <option value="in_progress">В процессе</option>
          <option value="done">Выполнено</option>
        </select>
        <button type="button" onClick={() => setStatus('all')}>
          Сбросить фильтр
        </button>
      </div>

      {assignments.length === 0 ? (
        <p>Заданий пока нет.</p>
      ) : visibleAssignments.length === 0 ? (
        <p>Нет заданий с выбранным статусом.</p>
      ) : (
        <div className="assignment-list">
          {visibleAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      )}
    </section>
  )
}