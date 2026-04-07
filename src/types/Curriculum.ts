export interface CurriculumSubject {
  name: string
  code?: string
}

export interface SemesterCurriculum {
  label: string
  subjects: CurriculumSubject[]
}

export interface ProgramCurriculum {
  id: string
  name: string
  curriculum: SemesterCurriculum[]
  college_code: string
  created_at?: string
}

export interface CollegeCurriculum {
  code: string
  name: string
  programs: ProgramCurriculum[]
  note?: string
}

export interface CurriculumData {
  id: string
  program_id?: string
  college_code: string
  college_name: string
  program_name: string
  semester_label: string
  subjects: CurriculumSubject[]
  created_at?: string
  updated_at?: string
}

export interface CurriculumDetail {
  id: string
  program_id: string
  revision_year: number | null
  revision_no: string | null
  legal_basis: string | null
  effectivity_term: string | null
  description: string | null
  created_at?: string
}
