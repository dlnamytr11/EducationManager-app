import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../lib/supabase'

type Mode = 'signin' | 'signup'

export function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!email.trim()) {
      setError('Введите email.')
      return
    }
    if (mode === 'signup' && password.length < 8) {
      setError('Пароль должен содержать не менее 8 символов.')
      return
    }
    if (mode === 'signin' && !password) {
      setError('Введите пароль.')
      return
    }

    try {
      setPending(true)
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin },
        })
        if (error) throw error
        if (data.session) {
          navigate('/assignments', { replace: true })
        } else {
          setMessage('Проверьте почту и подтвердите регистрацию, затем войдите.')
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (error) throw error
        navigate('/assignments', { replace: true })
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Не удалось выполнить запрос.')
    } finally {
      setPending(false)
    }
  }

  return (
    <section>
      <h1>{mode === 'signin' ? 'Вход' : 'Регистрация'}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="auth-email">Email</label>
        <input
          id="auth-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="auth-password">Пароль</label>
        <input
          id="auth-password"
          type="password"
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p role="alert">{error}</p>}
        {message && <p role="status">{message}</p>}

        <button type="submit" disabled={pending}>
          {pending ? 'Подождите…' : mode === 'signin' ? 'Войти' : 'Зарегистрироваться'}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin')
            setError('')
            setMessage('')
          }}
        >
          {mode === 'signin' ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Вход'}
        </button>
      </form>
    </section>
  )
}