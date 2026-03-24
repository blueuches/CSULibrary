import { supabase } from '@/lib/supabase'
import type {
  CurriculumData,
  CurriculumDetail,
  CollegeCurriculum,
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
        .select('id, program_name, created_at, college_id, colleges(code, name), curricula(id, effectivity_term, created_at)')
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
    .select('id, program_name, created_at, college_id, colleges(code, name), curricula(id, effectivity_term, created_at)')
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
  const { data, error } = await supabase
    .from(CURRICULA_TABLE)
    .select('id, program_id, revision_year, revision_no, legal_basis, effectivity_term, description, created_at')
    .eq('program_id', programId)
    .order('revision_year', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error('Error fetching curriculum detail:', error)
    throw error
  }

  return (data?.[0] as CurriculumDetail | undefined) ?? null
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
