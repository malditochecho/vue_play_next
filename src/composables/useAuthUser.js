// Reference:
// https://vueschool.io/articles/vuejs-tutorials/use-supabase-auth-with-vue-js-3/
// https://github.com/danielkellyio/supabase-auth-example/tree/main

import { computed, ref } from 'vue'
import useSupabase from '@/composables/useSupabase'

const user = ref(null)

export default function useAuthUser() {
  const { supabase } = useSupabase()

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return user
  }

  const loginWithSocialProvider = async (provider) => {}

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = computed(() => !!user.value)

  const register = async ({ email, password, ...meta }) => {}

  const update = async (data) => {}

  const sendPasswordResetEmail = async (email) => {}

  return {
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordResetEmail
  }
}
