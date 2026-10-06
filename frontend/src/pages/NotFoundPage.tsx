import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section>
      <h1>Страница не найдена</h1>
      <p>Проверьте адрес или вернитесь к списку заданий.</p>
      <Link to="/assignments">К списку заданий</Link>
    </section>
  )
}