import { login, signup } from '../services/auth'

export async function action({ request }) {
  const formData = await request.formData()
  const mode = formData.get('mode')
  const from = formData.get('from')
  const email = formData.get('email')
  const password = formData.get('password')
  const name = formData.get('name')
  try {
    if (mode === 'login') {
      await login(email, password)
      return { success: 'Login successful', redirectTo: from }
    }
    if (mode === 'signup') {
      await signup(name, email, password)
      return { success: 'Signup successful', redirectTo: from }
    }
    return { error: 'Invalid mode' }
  } catch (err) {
    return {
      error:
        err?.response?.data?.message ||
        err.message ||
        'Something went wrong, please try again.',
    }
  }
}
