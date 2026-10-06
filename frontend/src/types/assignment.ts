export type AssignmentStatus = 'not_started' | 'in_progress' | 'done'

export type Assignment = {
  id: string
  title: string
  description: string
  course: string
  status: AssignmentStatus
  dueDate: string
  complexity: 'low' | 'medium' | 'high'
}