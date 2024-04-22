// Reference:
// https://vueschool.io/articles/vuejs-tutorials/use-supabase-auth-with-vue-js-3/
// https://github.com/danielkellyio/supabase-auth-example/tree/main

import { ref } from 'vue'
import useSupabase from '@/composables/useSupabase'

const user = ref(null)

export default function useAuthUser() {
  const { supabase } = useSupabase()

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password })
    if (error) throw error
    return user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  return {
    user,
    login,
    logout,
    isLoggedIn
  }
}
