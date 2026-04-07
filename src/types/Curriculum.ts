export interface CurriculumSubject {
  name: string
  code?: string
}

export interface SemesterCurriculum {
  label: string
  subjects: CurriculumSubject[]
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

// COURSES
export interface Course {
  id: string
  course_code: string
  course_title: string
}

// CURRICULUM COURSES (bridge)
export interface CurriculumCourse {
  id: string
  display_order: number
  course: Course
}

// REQUIREMENTS (e.g. Core, Major, Electives)
export interface CurriculumRequirement {
  id: string
  name: string
  description?: string
  display_order: number
  courses: CurriculumCourse[]
}

// STUDY PLAN (per subject placement)
export interface StudyPlanItem {
  id: string
  year_level: number
  semester: number
  display_order: number
  course: Course
}

// CURRICULUM (MAIN)
export interface Curriculum {
  id: string
  revision_year: number | null
  revision_no?: string | null
  legal_basis?: string | null
  effectivity_term?: string | null
  description?: string | null

  specialization?: string | null

  requirements: CurriculumRequirement[]
  study_plan: StudyPlanItem[]
}

// SPECIALIZATION
export interface ProgramSpecialization {
  id: string
  program_sp_name: string
  curricula: Curriculum[]
}


// COLLEGE
export interface CollegeCurriculum {
  id: string
  code: string
  name: string
  programs: ProgramCurriculum[]
}

export interface ProgramCurriculum {
  id: string
  name: string

  // EXISTING (used by your cards)
  curriculum: SemesterCurriculum[]
  college_code: string
  created_at?: string

  // NEW
  specializations?: ProgramSpecialization[]
}

