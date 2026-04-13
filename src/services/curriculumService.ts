import { supabase } from '@/lib/supabase'
import type {
  CurriculumData,
  CurriculumDetail,
  CollegeCurriculum,
  ProgramSpecialization,
  ProgramStudyPlanRow,
  ProgramCurriculum,
  SemesterCurriculum,
} from '@/types/Curriculum'

const CURRICULA_TABLE = 'curricula'

type CollegeLookupRow = {
  code: string
  name: string
}

type ProgramWithCurriculaRow = {
  id: string
  program_name: string
  created_at?: string
  college_id: string
  colleges:
    | {
        code: string
        name: string
      }
    | Array<{
        code: string
        name: string
      }>
    | null
  curricula: Array<{
    id: string
    effectivity_term: string | null
    created_at?: string
  }>
  program_specializations?: Array<{
    id: string
    program_id: string
    program_sp_name: string
    program_sp_code?: string | null
  }>
}

const mapProgramsToCurriculumData = (
  programRows: ProgramWithCurriculaRow[],
  collegeRows: CollegeLookupRow[],
): CurriculumData[] => {
  const result: CurriculumData[] = []

  // Preserve colleges with no programs so cards still render.
  for (const college of collegeRows) {
    result.push({
      id: `college-${college.code}`,
      college_code: college.code,
      college_name: college.name,
      program_name: '',
      semester_label: '',
      subjects: [],
    })
  }

  for (const program of programRows) {
    const college = Array.isArray(program.colleges) ? program.colleges[0] : program.colleges

    if (!college) {
      continue
    }

    if (!program.curricula.length) {
      result.push({
        id: `${program.id}-base`,
        program_id: program.id,
        college_code: college.code,
        college_name: college.name,
        program_name: program.program_name,
        semester_label: '',
        subjects: [],
        created_at: program.created_at,
      })
      continue
    }

    for (const curriculum of program.curricula) {
      result.push({
        id: curriculum.id,
        program_id: program.id,
        college_code: college.code,
        college_name: college.name,
        program_name: program.program_name,
        semester_label: curriculum.effectivity_term ?? '',
        subjects: [],
        created_at: curriculum.created_at,
      })
    }
  }

  return result.sort((a, b) => {
    const collegeCompare = a.college_code.localeCompare(b.college_code)
    if (collegeCompare !== 0) return collegeCompare

    const programCompare = (a.program_name || '').localeCompare(b.program_name || '')
    if (programCompare !== 0) return programCompare

    return (a.semester_label || '').localeCompare(b.semester_label || '')
  })
}

/**
 * Fetch all curriculums from database
 */
export const getCurriculums = async (): Promise<CurriculumData[]> => {
  const [{ data: collegesData, error: collegesError }, { data: programsData, error: programsError }] =
    await Promise.all([
      supabase
        .from('colleges')
        .select('code, name')
        .order('code', { ascending: true }),
      supabase
        .from('programs')
        .select('id, program_name, created_at, college_id, colleges(code, name), curricula(id, effectivity_term, created_at), program_specializations(id, program_id, program_sp_name, program_sp_code)')
        .eq('is_active', true)
        .order('program_name', { ascending: true }),
    ])

  if (collegesError) {
    console.error('Error fetching colleges:', collegesError)
    throw collegesError
  }

  if (programsError) {
    console.error('Error fetching program curriculums:', programsError)
    throw programsError
  }

  return mapProgramsToCurriculumData(
    (programsData as ProgramWithCurriculaRow[]) || [],
    (collegesData as CollegeLookupRow[]) || [],
  )
}

/**
 * Fetch curriculums by college code
 */
export const getCurriculumsByCollege = async (collegeCode: string): Promise<CurriculumData[]> => {
  const { data: collegeData, error: collegeError } = await supabase
    .from('colleges')
    .select('id, code, name')
    .eq('code', collegeCode)
    .single()

  if (collegeError) {
    console.error('Error fetching college:', collegeError)
    throw collegeError
  }

  const { data: programsData, error: programsError } = await supabase
    .from('programs')
    .select('id, program_name, created_at, college_id, colleges(code, name), curricula(id, effectivity_term, created_at), program_specializations(id, program_id, program_sp_name, program_sp_code)')
    .eq('is_active', true)
    .eq('college_id', collegeData.id)
    .order('program_name', { ascending: true })

  if (programsError) {
    console.error('Error fetching college curriculums:', programsError)
    throw programsError
  }

  return mapProgramsToCurriculumData((programsData as ProgramWithCurriculaRow[]) || [], [
    { code: collegeData.code, name: collegeData.name },
  ])
}

/**
 * Transform flat curriculum data into grouped structure
 */
export const transformCurriculumsToCollege = (curriculumData: CurriculumData[]): CollegeCurriculum[] => {
  const collegeMap = new Map<string, CollegeCurriculum>()

  for (const item of curriculumData) {
    if (!item.college_code) {
      continue
    }

    // Get or create college
    if (!collegeMap.has(item.college_code)) {
      collegeMap.set(item.college_code, {
        code: item.college_code,
        name: item.college_name,
        programs: [],
      })
    }

    const college = collegeMap.get(item.college_code)!

    // College-level rows are used to keep empty colleges visible.
    if (!item.program_name) {
      continue
    }

    let program = college.programs.find((p) => p.name === item.program_name)

    // Create program if it doesn't exist
    if (!program) {
      program = {
        id: item.program_id || `${item.college_code}-${item.program_name}`,
        name: item.program_name,
        curriculum: [],
        college_code: item.college_code,
      }
      college.programs.push(program)
    }

    // Add semester if it doesn't exist
    if (!item.semester_label) {
      continue
    }

    let semester = program.curriculum.find((s) => s.label === item.semester_label)
    if (!semester) {
      semester = {
        label: item.semester_label,
        subjects: [],
      }
      program.curriculum.push(semester)
    }

    // Add subjects
    semester.subjects = item.subjects
  }

  return Array.from(collegeMap.values())
}

/**
 * Fetch the latest curriculum detail for a specific program.
 */
export const getCurriculumDetailByProgramId = async (
  programId: string,
): Promise<CurriculumDetail | null> => {
  const baseSelection =
    'id, program_id, revision_year, revision_no, legal_basis, effectivity_term, description, created_at'
  const extendedSelection = `${baseSelection}, specialization, requirements, study_plan`

  const { data: extendedData, error: extendedError } = await supabase
    .from(CURRICULA_TABLE)
    .select(extendedSelection)
    .eq('program_id', programId)
    .order('revision_year', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(1)

  if (!extendedError) {
    return (extendedData?.[0] as CurriculumDetail | undefined) ?? null
  }

  // Backward-compatible fallback for environments where new optional fields are not yet in schema.
  const { data: baseData, error: baseError } = await supabase
    .from(CURRICULA_TABLE)
    .select(baseSelection)
    .eq('program_id', programId)
    .order('revision_year', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(1)

  if (baseError) {
    console.error('Error fetching curriculum detail:', baseError)
    throw baseError
  }

  return (baseData?.[0] as CurriculumDetail | undefined) ?? null
}

/**
 * Fetch all specializations linked to a program.
 */
export const getProgramSpecializationsByProgramId = async (
  programId: string,
  programName?: string,
): Promise<ProgramSpecialization[]> => {
  const extendedSelect =
    'id, program_id, program_sp_name, program_sp_code, description, revision_year, revision_no, legal_basis, effectivity_term'
  const baseSelect = 'id, program_id, program_sp_name, program_sp_code'

  const { data, error } = await supabase
    .from('program_specializations')
    .select(extendedSelect)
    .eq('program_id', programId)
    .order('program_sp_name', { ascending: true })

  if (!error) {
    const rows = (data as ProgramSpecialization[] | null) ?? []
    if (rows.length) {
      return rows
    }
  }

  // Fallback for databases that don't yet have metadata columns on program_specializations.
  const { data: baseData, error: baseError } = await supabase
    .from('program_specializations')
    .select(baseSelect)
    .eq('program_id', programId)
    .order('program_sp_name', { ascending: true })

  if (baseError) {
    // Last fallback: query through programs join for environments with stricter direct-table policies.
    const { data: programRow, error: programRowError } = await supabase
      .from('programs')
      .select('program_specializations(id, program_id, program_sp_name, program_sp_code, description, revision_year, revision_no, legal_basis, effectivity_term)')
      .eq('id', programId)
      .maybeSingle()

    if (programRowError) {
      console.error('Error fetching program specializations:', programRowError)
      throw programRowError
    }

    const joinedSpecializations = (
      programRow as
        | {
            program_specializations?: ProgramSpecialization[]
          }
        | null
    )?.program_specializations

    return joinedSpecializations ?? []
  }

  const baseRows = (baseData as ProgramSpecialization[] | null) ?? []
  if (baseRows.length) {
    return baseRows
  }

  // Fallback by program name context for datasets where program_id linkage is inconsistent.
  if (programName) {
    const { data: joinedRows, error: joinedRowsError } = await supabase
      .from('program_specializations')
      .select('id, program_id, program_sp_name, program_sp_code, description, revision_year, revision_no, legal_basis, effectivity_term, programs(id, program_name)')

    if (!joinedRowsError && joinedRows) {
      const mapped = (joinedRows as Array<{
        id: string
        program_id?: string
        program_sp_name: string
        program_sp_code?: string | null
        description?: string | null
        revision_year?: number | null
        revision_no?: string | null
        legal_basis?: string | null
        effectivity_term?: string | null
        programs?: { id?: string; program_name?: string } | Array<{ id?: string; program_name?: string }> | null
      }>)
        .filter((row) => {
          const rel = Array.isArray(row.programs) ? row.programs[0] : row.programs
          return rel?.id === programId || rel?.program_name === programName || row.program_id === programId
        })
        .map((row) => ({
          id: row.id,
          program_id: row.program_id,
          program_sp_name: row.program_sp_name,
          program_sp_code: row.program_sp_code,
          description: row.description,
          revision_year: row.revision_year,
          revision_no: row.revision_no,
          legal_basis: row.legal_basis,
          effectivity_term: row.effectivity_term,
        }))

      if (mapped.length) {
        return mapped
      }
    }
  }

  return []
}

/**
 * Fetch a single specialization row by id.
 */
export const getProgramSpecializationById = async (
  specializationId: string,
): Promise<ProgramSpecialization | null> => {
  const extendedSelect =
    'id, program_id, program_sp_name, program_sp_code, description, revision_year, revision_no, legal_basis, effectivity_term'
  const baseSelect = 'id, program_id, program_sp_name, program_sp_code'

  const { data, error } = await supabase
    .from('program_specializations')
    .select(extendedSelect)
    .eq('id', specializationId)
    .maybeSingle()

  if (!error) {
    return (data as ProgramSpecialization | null) ?? null
  }

  // Fallback for databases that don't yet have metadata columns on program_specializations.
  const { data: baseData, error: baseError } = await supabase
    .from('program_specializations')
    .select(baseSelect)
    .eq('id', specializationId)
    .maybeSingle()

  if (baseError) {
    console.error('Error fetching specialization metadata:', baseError)
    throw baseError
  }

  return (baseData as ProgramSpecialization | null) ?? null
}

/**
 * Fetch study plans for a specialization, falling back to program-level plans when needed.
 */
export const getProgramStudyPlans = async (
  programId: string,
  programSpecializationId?: string | null,
): Promise<ProgramStudyPlanRow[]> => {
  if (programSpecializationId) {
    const { data: specializationPlans, error: specializationPlansError } = await supabase
      .from('program_study_plans')
      .select('*')
      .eq('program_specialization_id', programSpecializationId)
      .order('year_level', { ascending: true })
      .order('semester', { ascending: true })
      .order('display_order', { ascending: true })

    if (!specializationPlansError && specializationPlans?.length) {
      return specializationPlans as ProgramStudyPlanRow[]
    }

    if (specializationPlansError) {
      console.error('Error fetching specialization study plans:', specializationPlansError)
    }
  }

  const { data: programPlans, error: programPlansError } = await supabase
    .from('program_study_plans')
    .select('*')
    .eq('program_id', programId)
    .order('year_level', { ascending: true })
    .order('semester', { ascending: true })
    .order('display_order', { ascending: true })

  if (programPlansError) {
    console.error('Error fetching program study plans:', programPlansError)
    return []
  }

  return (programPlans as ProgramStudyPlanRow[] | null) ?? []
}

/**
 * Create curriculum entry
 */
export const createCurriculum = async (curriculumData: Partial<CurriculumData>) => {
  const { data, error } = await supabase
    .from(CURRICULA_TABLE)
    .insert([curriculumData])
    .select()
    .single()

  if (error) {
    console.error('Error creating curriculum:', error)
    throw error
  }

  return data
}

/**
 * Update curriculum entry
 */
export const updateCurriculum = async (
  id: string,
  updates: Partial<CurriculumData>,
) => {
  const { data, error } = await supabase
    .from(CURRICULA_TABLE)
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating curriculum:', error)
    throw error
  }

  return data
}

/**
 * Delete curriculum entry
 */
export const deleteCurriculum = async (id: string) => {
  const { data, error } = await supabase
    .from(CURRICULA_TABLE)
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting curriculum:', error)
    throw error
  }

  return data
}
