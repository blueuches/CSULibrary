import { supabase } from "@/lib/supabase"

// GET LOGS
export const getAttendanceLogs = async () => {
  const { data, error } = await supabase
    .from("attendance_logs")
    .select(`
      *,
      students (
        id_number,
        first_name,
        last_name,
        program,
        college, 
        year_level
      )
    `)

  if (error) throw error
  return data
}
