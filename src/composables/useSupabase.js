import { createClient } from '@supabase/supabase-js'
import useAuthUser from '@/composables/useAuthUser'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()
  user.value = session?.user || null
})

export default function useSupabase() {
  return { supabase }
}
