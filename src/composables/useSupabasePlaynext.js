import { ref } from 'vue'
import useSupabase from '@/composables/useSupabase'

export default function useSupabasePlaynext(tableName) {
  const { supabase } = useSupabase()

  const data = ref([])
  const error = ref(null)
  const loading = ref(false)

  async function fetchRecords() {
    try {
      loading.value = true
      let { data: records, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('name', { ascending: true })
      if (fetchError) throw fetchError
      data.value = records
    } catch (error) {
      error.value = error.message || 'Failed to fetch data'
    } finally {
      loading.value = false
    }
  }

  async function addRecord(record) {
    try {
      const { data: addData, error: addError } = await supabase
        .from(tableName)
        .insert([record])
        .select()
      if (addError) throw addError
      const newId = addData[0].id
      data.value.push({ id: newId, ...record })
    } catch (err) {
      error.value = err.message || 'Failed to add record'
    }
  }

  function deleteRecords(ids) {
    ids.forEach(async (id) => {
      try {
        const { error: deleteError } = await supabase.from(tableName).delete().eq('id', id)
        if (deleteError) throw deleteError
        const index = data.value.findIndex((record) => record.id === id)
        if (index !== -1) data.value.splice(index, 1)
      } catch (err) {
        error.value = err.message || 'Failed to delete record'
      }
    })
  }

  async function updateRecord(id, updates) {
    try {
      const { data: updatedRecord, error: updateError } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .single()
      if (updateError) throw updateError
      const index = data.value.findIndex((record) => record.id === id)
      if (index !== -1) data.value[index] = updatedRecord
    } catch (err) {
      error.value = err.message || 'Failed to update record'
    }
  }

  return {
    data,
    error,
    loading,
    fetchRecords,
    addRecord,
    deleteRecords,
    updateRecord
  }
}
