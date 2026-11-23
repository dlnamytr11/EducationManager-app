import { useEffect, useState } from 'react'
import {
  getAssignments,
  createAssignment as createAssignmentRequest,
  updateAssignment as updateAssignmentRequest,
  deleteAssignment as deleteAssignmentRequest,
} from './services/assignments'
import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { AssignmentsPage } from './pages/AssignmentsPage'
import { AssignmentDetailsPage } from './pages/AssignmentDetailsPage'
import { NewAssignmentPage } from './pages/NewAssignmentPage'
import { EditAssignmentPage } from './pages/EditAssignmentPage'
import { NotFoundPage } from './pages/NotFoundPage'
import type { Assignment, AssignmentDraft } from './types/assignment'
import './App.css'
import { useAuth } from './hooks/useAuth'
import { RequireAuth } from './app/RequireAuth'
import { AuthPage } from './pages/AuthPage'

type ListLoad =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success' }

export default function App() {
  const auth = useAuth()
  const userId = auth.status === 'authenticated' ? auth.session.user.id : null

  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [listLoad, setListLoad] = useState<ListLoad>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    setAssignments([])
    setListLoad({ status: 'loading' })
    if (!userId) return

    let active = true
    getAssignments()
      .then((data) => {
        if (!active) return
        setAssignments(data)
        setListLoad({ status: 'success' })
      })
      .catch((error: unknown) => {
        if (!active) return
        setListLoad({
          status: 'error',
          message: error instanceof Error ? error.message : 'Не удалось загрузить задания.',
        })
      })

    return () => {
      active = false
    }
  }, [userId, attempt])

    async function reloadAssignments() {
    setAssignments(await getAssignments())
  }

  async function createAssignment(draft: AssignmentDraft): Promise<string> {
    const created = await createAssignmentRequest(draft)
    await reloadAssignments()
    return created.id
  }

  async function updateAssignment(id: string, draft: AssignmentDraft): Promise<void> {
  await updateAssignmentRequest(id, draft)
  await reloadAssignments()
}

async function deleteAssignment(id: string): Promise<void> {
  await deleteAssignmentRequest(id)
  await reloadAssignments()
}

  const listGate =
    userId && listLoad.status === 'loading' ? (
      <p role="status">Загружаем задания…</p>
    ) : listLoad.status === 'error' ? (
      <div>
        <p role="alert">{listLoad.message}</p>
        <button type="button" onClick={() => setAttempt((n) => n + 1)}>Повторить</button>
      </div>
    ) : null

  return (
    <Routes>
      <Route element={<AppLayout auth={auth} />}>
        <Route
          index
          element={<Navigate to={auth.status === 'authenticated' ? '/assignments' : '/auth'} replace />}
        />
        <Route
          path="auth"
          element={
            auth.status === 'authenticated'
              ? <Navigate to="/assignments" replace />
              : <AuthPage />
          }
        />
        <Route element={<RequireAuth auth={auth} />}>
          <Route
            path="assignments"
            element={listGate ?? <AssignmentsPage assignments={assignments} />}
          />
          <Route
            path="assignments/new"
            element={<NewAssignmentPage onCreate={createAssignment} />}
          />
          <Route
            path="assignments/:id"
            element={listGate ?? <AssignmentDetailsPage assignments={assignments} onDelete={deleteAssignment} />}
          />
          <Route
            path="assignments/:id/edit"
            element={listGate ?? <EditAssignmentPage assignments={assignments} onUpdate={updateAssignment} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}