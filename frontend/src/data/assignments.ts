import type { Assignment } from '../types/assignment'

export const assignments: Assignment[] = [
  {
    id: 'a1',
    title: 'Лабораторная работа 2',
    description: 'Добавить страницы и навигацию в проект React Router.',
    course: 'web',
    status: 'in_progress',
    dueDate: '2026-10-12',
    complexity: 'high',
  },
  {
    id: 'a2',
    title: 'Контрольная работа по алгоритмам',
    description: 'Подготовиться к теме сортировок и поиска.',
    course: 'algo',
    status: 'not_started',
    dueDate: '2026-10-20',
    complexity: 'medium',
  },
  {
    id: 'a3',
    title: 'Курсовой проект: черновик',
    description: 'Сдать первую версию пояснительной записки.',
    course: 'design',
    status: 'not_started',
    dueDate: '2026-11-01',
    complexity: 'high',
  },
  {
    id: 'a4',
    title: 'Эссе по истории',
    description: 'Написать эссе на тему научно-технической революции.',
    course: 'history',
    status: 'done',
    dueDate: '2026-09-28',
    complexity: 'low',
  },
  {
    id: 'a5',
    title: 'Лабораторная по базам данных',
    description: 'Спроектировать схему базы данных для учебного проекта.',
    course: 'db',
    status: 'in_progress',
    dueDate: '2026-10-15',
    complexity: 'medium',
  },
]