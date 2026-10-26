import { useState } from 'react'
import type { FormEvent } from 'react'
import type { AssignmentDraft } from '../types/assignment'

type AssignmentFormProps = {
  initialValues: AssignmentDraft
  onSave: (draft: AssignmentDraft) => void
  onCancel: () => void
}

export function AssignmentForm(props: AssignmentFormProps) {
  const [draft, setDraft] = useState(() => ({ ...props.initialValues }))
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const title = draft.title.trim()
    if (title.length < 3 || title.length > 100) {
      setError('Название должно содержать от 3 до 100 символов.')
      return
    }

    if (!draft.dueDate) {
      setError('Укажите срок задания.')
      return
    }

    if (!draft.course.trim()) {
      setError('Укажите курс, к которому относится задание.')
      return
    }

    if (draft.status === 'done' && !draft.description.trim()) {
      setError('Для выполненного задания укажите описание результата.')
      return
    }

    setError('')
    props.onSave({ ...draft, title, course: draft.course.trim() })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="assignment-title">Название</label>
      <input
        id="assignment-title"
        value={draft.title}
        required
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />

      <label htmlFor="assignment-course">Курс</label>
      <input
        id="assignment-course"
        value={draft.course}
        required
        onChange={(e) => setDraft({ ...draft, course: e.target.value })}
      />

      <label htmlFor="assignment-description">Описание</label>
      <textarea
        id="assignment-description"
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
      />

      <label htmlFor="assignment-date">Срок</label>
      <input
        id="assignment-date"
        type="date"
        value={draft.dueDate}
        required
        onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
      />

      <label htmlFor="assignment-status">Статус</label>
      <select
        id="assignment-status"
        value={draft.status}
        onChange={(e) => {
          const status = e.target.value
          if (status === 'not_started' || status === 'in_progress' || status === 'done') {
            setDraft({ ...draft, status })
          }
        }}
      >
        <option value="not_started">Не начато</option>
        <option value="in_progress">В процессе</option>
        <option value="done">Выполнено</option>
      </select>

      <label htmlFor="assignment-complexity">Сложность</label>
      <select
        id="assignment-complexity"
        value={draft.complexity}
        onChange={(e) => {
          const complexity = e.target.value
          if (complexity === 'low' || complexity === 'medium' || complexity === 'high') {
            setDraft({ ...draft, complexity })
          }
        }}
      >
        <option value="low">Низкая</option>
        <option value="medium">Средняя</option>
        <option value="high">Высокая</option>
      </select>

      {error && <p role="alert">{error}</p>}

      <button type="submit">Сохранить</button>
      <button type="button" onClick={props.onCancel}>Отмена</button>
    </form>
  )
}