import { supabase } from "@/lib/supabase"

export type AttendanceFilters = {
  search?: string
  program?: string
  college?: string
  yearLevel?: string
  attendanceType?: string
  date?: string
  status?: "" | "checked_in" | "checked_out"
}

type GetAttendanceLogsParams = {
  filters?: AttendanceFilters
  page?: number
  pageSize?: number
}

// GET LOGS - optimized server-side filtering + pagination
export const getAttendanceLogs = async ({
  filters = {},
  page = 1,
  pageSize = 10,
}: GetAttendanceLogsParams = {}) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("attendance_logs")
    .select(
      `
      *,
      students!inner (
        id_number,
        first_name,
        last_name,
        program,
        college,
        year_level
      )
    `,
      { count: "exact", head: false }
    )
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
      .gte("time_in", `${filters.date}T00:00:00+08:00`)
      .lte("time_in", `${filters.date}T23:59:59+08:00`)
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

  const { data, error, count } = await query.range(from, to)

  if (error) throw error

  return {
    data: data || [],
    count: count ?? 0,
  }
}