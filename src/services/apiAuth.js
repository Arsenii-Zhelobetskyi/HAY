import supabase from './supabase'

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null
  //   console.log('session', session)
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)

  return data?.user
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) throw new Error(error.message)
  return data
}

export async function signUp({ email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw new Error(error.message)
  // console.log('data', data)
  return data
}

export async function signInWithEmail(email) {
  // magic link
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false
    }
  })

  if (error) throw new Error(error.message)
  return data
}

export async function sendResetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/reset-password'
  })

  if (error) throw new Error(error.message)
  return data
}
export async function updatePassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw new Error(error.message)
  return data
}

export async function updateEmail(newEmail) {
  const { data, error } = await supabase.auth.updateUser({
    email: newEmail
  })

  if (error) throw new Error(error.message)
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.massage)
}

export async function updateUser({ email, password, data }) {
  const { data: userData, error } = await supabase.auth.updateUser({ email, password, data })
  if (error) throw new Error(error.message)
  return userData
}
