import { NavLink, Outlet } from 'react-router'
import { supabase } from '../lib/supabase'
import type { AuthState } from '../hooks/useAuth'

export function AppLayout({ auth }: { auth: AuthState }) {
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) console.error(error.message)
  }

  return (
    <div className="app">
      <header>
        <p className="app-title">Учебный менеджер</p>
        <nav aria-label="Основная навигация">
          {auth.status === 'authenticated' ? (
            <>
              <NavLink to="/assignments" end>Задания</NavLink>
              <NavLink to="/assignments/new">Создать</NavLink>
            </>
          ) : (
            <NavLink to="/auth">Вход</NavLink>
          )}
        </nav>
        {auth.status === 'authenticated' && (
          <p>
            {auth.session.user.email}{' '}
            <button type="button" onClick={handleSignOut}>Выйти</button>
          </p>
        )}
      </header>
      <main><Outlet /></main>
    </div>
  )
}