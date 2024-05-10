import supabase from './supabase'

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null
  //   console.log('session', session)
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)

  return data?.user
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) throw new Error(error.message)
  return data
}
