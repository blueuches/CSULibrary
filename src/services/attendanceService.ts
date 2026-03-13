import { supabase } from "@/lib/supabase"

type AttendanceFilters = {
  search?: string
  program?: string
  college?: string
  yearLevel?: string
  attendanceType?: string
  date?: string
  status?: "" | "checked_in" | "checked_out"
}

// GET LOGS
export const getAttendanceLogs = async (filters: AttendanceFilters = {}) => {
  let query = supabase
    .from("attendance_logs")
    .select(`
      *,
      students!inner (
        id_number,
        first_name,
        last_name,
        program,
        college,
        year_level
      )
    `)
    .order("time_in", { ascending: false })

  if (filters.attendanceType) {
    query = query.eq("attendance_type", filters.attendanceType)
  }

  if (filters.program) {
    query = query.eq("students.program", filters.program)
  }

  if (filters.college) {
    query = query.eq("students.college", filters.college)
  }

  if (filters.yearLevel) {
    query = query.eq("students.year_level", filters.yearLevel)
  }

  if (filters.date) {
    query = query
      .gte("time_in", `${filters.date}T00:00:00`)
      .lte("time_in", `${filters.date}T23:59:59`)
  }

  if (filters.status === "checked_in") {
    query = query.is("time_out", null)
  }

  if (filters.status === "checked_out") {
    query = query.not("time_out", "is", null)
  }

  if (filters.search?.trim()) {
    const search = filters.search.trim()

    query = query.or(
      `id_number.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`,
      { foreignTable: "students" }
    )
  }

  const { data, error } = await query

  if (error) throw error
  return data
}