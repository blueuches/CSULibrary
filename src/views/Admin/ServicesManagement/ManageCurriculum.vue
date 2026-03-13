<template>
    <div class="flex h-screen w-full overflow-hidden bg-[#f5f3ef]">
        <Sidebar :activeTab="'SERVICES'" />

        <main class="report-root curriculum-root">
            <header class="report-header intro-header">
                <div class="header-left">
                    <div class="header-breadcrumb">
                        <span>Admin</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5l7 7-7 7" /></svg>
                        <span>Curriculum Management</span>
                    </div>
                    <h1 class="header-title intro-title">College <span class="text-yellow-500">Curriculum</span></h1>
                    <p class="header-sub">Analytics-style interface with college cards, program dropdowns, and curriculum details.</p>
                </div>
                <div class="header-right">
                    <div class="date-badge">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {{ currentDate }}
                    </div>
                    <button class="export-btn" type="button">Manage Curriculum</button>
                </div>
            </header>

            <section class="kpi-strip">
                <article class="kpi-card">
                    <div class="kpi-body">
                        <span class="kpi-label">Colleges</span>
                        <span class="kpi-value">{{ colleges.length }}</span>
                    </div>
                </article>
                <article class="kpi-card">
                    <div class="kpi-body">
                        <span class="kpi-label">Programs</span>
                        <span class="kpi-value">{{ totalPrograms }}</span>
                    </div>
                </article>
                <article class="kpi-card">
                    <div class="kpi-body">
                        <span class="kpi-label">Status</span>
                        <span class="kpi-value status-value">Dummy Data</span>
                    </div>
                </article>
            </section>

            <section class="panel panel--table curriculum-panel">
                <div class="panel-head">
                    <div>
                        <h2 class="panel-title">Curriculum Cards</h2>
                        <p class="panel-sub">Click a college card to open its program and curriculum dropdown list.</p>
                    </div>
                </div>

                <section class="college-grid">
                    <div
                        v-for="college in colleges"
                        :key="college.code"
                        class="college-card"
                        :class="{ 'college-card--open': openCollegeCode === college.code }"
                    >
                        <button type="button" class="college-trigger" @click="toggleCollege(college.code)">
                            <div class="college-trigger-left">
                                <span class="college-code">{{ college.code }}</span>
                                <span class="college-name">{{ college.name }}</span>
                            </div>
                            <div class="college-trigger-right">
                                                                <span v-if="college.programs.length > 0" class="college-count">{{ college.programs.length }} programs</span>
                                                                <span v-else class="college-count">No programs yet</span>
                                <svg
                                    class="chevron"
                                    :class="{ 'chevron--open': openCollegeCode === college.code }"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                        </button>

                        <div v-if="openCollegeCode === college.code" class="college-body">
                            <p v-if="college.programs.length === 0" class="empty-state-text">Graduate program list is not yet added.</p>
                            <details v-for="program in college.programs" :key="program.name" class="program-accordion">
                                <summary>
                                    <span class="program-name">{{ program.name }}</span>
                                    <span class="program-count">{{ program.curriculum.length }} semesters</span>
                                </summary>

                                <div class="program-body">
                                    <details class="curriculum-accordion">
                                        <summary class="curriculum-header">
                                            <span>View Curriculum</span>
                                            <button
                                                type="button"
                                                class="edit-curriculum-btn"
                                                @click.prevent.stop="editCurriculum(college.code, program.name)"
                                            >
                                                Edit
                                            </button>
                                        </summary>

                                        <div class="semester-grid">
                                            <article v-for="semester in program.curriculum" :key="semester.label" class="semester-card">
                                                <h4>{{ semester.label }}</h4>
                                                <ul>
                                                    <li v-for="subject in semester.subjects" :key="subject">{{ subject }}</li>
                                                </ul>
                                            </article>
                                        </div>
                                    </details>
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import '@/assets/styles/report-analytics.css'

type SemesterCurriculum = {
    label: string
    subjects: string[]
}

type ProgramCurriculum = {
    name: string
    curriculum: SemesterCurriculum[]
}

type CollegeCurriculum = {
    code: string
    name: string
    programs: ProgramCurriculum[]
    note?: string
}

type CollegeSeed = {
    code: string
    name: string
    programs: string[]
    note?: string
}

const normalizeFocus = (programName: string): string => {
    const fromParentheses = programName.match(/\(([^)]+)\)/)?.[1]

    if (fromParentheses) {
        return fromParentheses.replace('Major in ', '').trim()
    }

    const stripped = programName.replace('Bachelor of Science in ', '').replace('Bachelor of Secondary Education ', '').replace('Bachelor of Elementary Education', 'Elementary Education').trim()
    return stripped
}

const makeSubjectCode = (collegeCode: string, focus: string, level: number): string => {
    const token = focus.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 4) || 'CORE'
    return `${collegeCode}-${token}${level}`
}

const buildDummyCurriculum = (collegeCode: string, programName: string): SemesterCurriculum[] => {
    const focus = normalizeFocus(programName)

    return [
        {
            label: 'Year 1 - 1st Semester',
            subjects: [
                'GE 101 Purposive Communication',
                'GE 102 Mathematics in the Modern World',
                `${makeSubjectCode(collegeCode, focus, 101)} Introduction to ${focus}`,
                `${makeSubjectCode(collegeCode, focus, 102)} Basic Laboratory and Field Skills`,
                'NSTP 101 Civic Welfare Training Service 1'
            ]
        },
        {
            label: 'Year 1 - 2nd Semester',
            subjects: [
                'GE 103 Understanding the Self',
                'GE 104 The Contemporary World',
                `${makeSubjectCode(collegeCode, focus, 103)} Fundamentals of ${focus} Systems`,
                `${makeSubjectCode(collegeCode, focus, 104)} Data Collection and Technical Writing`,
                'PATHFIT 102 Exercise-based Fitness Activities'
            ]
        },
        {
            label: 'Year 2 - 1st Semester',
            subjects: [
                'GE 201 Readings in Philippine History',
                `${makeSubjectCode(collegeCode, focus, 201)} Intermediate ${focus} Concepts`,
                `${makeSubjectCode(collegeCode, focus, 202)} Quantitative Methods for ${focus}`,
                `${makeSubjectCode(collegeCode, focus, 203)} Applied Tools and Instrumentation`,
                'ELEC 201 Professional Elective 1'
            ]
        },
        {
            label: 'Year 2 - 2nd Semester',
            subjects: [
                'GE 202 Ethics',
                `${makeSubjectCode(collegeCode, focus, 204)} Community and Extension Applications`,
                `${makeSubjectCode(collegeCode, focus, 205)} Case Studies in ${focus}`,
                `${makeSubjectCode(collegeCode, focus, 206)} Research Methods and Statistics`,
                'ELEC 202 Professional Elective 2'
            ]
        },
        {
            label: 'Year 3 - 1st Semester',
            subjects: [
                'GE 301 Science, Technology and Society',
                `${makeSubjectCode(collegeCode, focus, 301)} Advanced Topics in ${focus}`,
                `${makeSubjectCode(collegeCode, focus, 302)} Policy, Law and Governance`,
                `${makeSubjectCode(collegeCode, focus, 303)} Seminar in Current Issues`,
                'ELEC 301 Professional Elective 3'
            ]
        },
        {
            label: 'Year 3 - 2nd Semester',
            subjects: [
                `${makeSubjectCode(collegeCode, focus, 304)} Project Design and Proposal Writing`,
                `${makeSubjectCode(collegeCode, focus, 305)} Practicum Preparation`,
                `${makeSubjectCode(collegeCode, focus, 306)} Innovation and Entrepreneurship`,
                'GE 302 Rizal: Life and Works',
                'ELEC 302 Professional Elective 4'
            ]
        },
        {
            label: 'Year 4 - 1st Semester',
            subjects: [
                `${makeSubjectCode(collegeCode, focus, 401)} Internship / On-the-Job Training`,
                `${makeSubjectCode(collegeCode, focus, 402)} Research 1: Thesis Writing`,
                `${makeSubjectCode(collegeCode, focus, 403)} Strategic Management in ${focus}`,
                'ELEC 401 Professional Elective 5'
            ]
        },
        {
            label: 'Year 4 - 2nd Semester',
            subjects: [
                `${makeSubjectCode(collegeCode, focus, 404)} Research 2: Thesis Completion`,
                `${makeSubjectCode(collegeCode, focus, 405)} Integrative Capstone`,
                `${makeSubjectCode(collegeCode, focus, 406)} Comprehensive Review`,
                'COLL 401 Career Development and Employability'
            ]
        }
    ]
}

const collegeSeed: CollegeSeed[] = [
    {
        code: 'COFES',
        name: 'College of Forestry and Environmental Sciences',
        programs: [
            'Bachelor of Science in Forestry (General Forestry)',
            'Bachelor of Science in Environmental Science (BSES)',
            'Bachelor of Science in Agroforestry (BSAF)'
        ],
    },
    {
        code: 'CMNS',
        name: 'College of Mathematics and Natural Sciences',
        programs: [
            'Bachelor of Science in Physics',
            'Bachelor of Science in Mathematics',
            'Bachelor of Science in Marine Biology',
            'Bachelor of Science in Chemistry',
            'Bachelor of Science in Biology (Major in Microbiology)',
            'Bachelor of Science in Biology (Major in Medical Biology)',
            'Bachelor of Science in Applied Mathematics',
            'Bachelor of Science in Biodiversity Conservation'
        ]
    },
    {
        code: 'CHASS',
        name: 'College of Humanities and Social Sciences',
        programs: [
            'Bachelor of Science in Social Work',
            'Bachelor of Science in Psychology',
            'Bachelor of Science in Sociology'
        ]
    },
    {
        code: 'CEGS',
        name: 'College of Engineering and Geosciences',
        programs: [
            'Bachelor of Science in Mining Engineering',
            'Bachelor of Science in Geology',
            'Bachelor of Science in Geodetic Engineering',
            'Bachelor of Science in Electronics Engineering',
            'Bachelor of Science in Civil Engineering',
            'Bachelor of Science in Agricultural and Biosystems Engineering'
        ]
    },
    {
        code: 'CED',
        name: 'College of Education',
        programs: [
            'Bachelor of Secondary Education (Science)',
            'Bachelor of Secondary Education (Mathematics)',
            'Bachelor of Secondary Education (Filipino)',
            'Bachelor of Secondary Education (English)',
            'Bachelor of Elementary Education'
        ]
    },
    {
        code: 'CCIS',
        name: 'College of Computing and Information Sciences',
        programs: [
            'Bachelor of Science in Information Technology',
            'Bachelor of Science in Information System',
            'Bachelor of Science in Computer Science'
        ]
    },
    {
        code: 'CAA',
        name: 'College of Agriculture and Agri-industries',
        programs: [
            'Bachelor of Science in Agriculture (Soil Science)',
            'Bachelor of Science in Agriculture (Horticulture)',
            'Bachelor of Science in Agriculture (Crop Protection)',
            'Bachelor of Science in Agriculture (Animal Science)',
            'Bachelor of Science in Agriculture (Agronomy)',
            'Bachelor of Science in Agriculture (Agriculture Economics)'
        ]
    },
    {
        code: 'GS',
        name: 'Graduate Studies',
        programs: []
    }
]

const colleges: CollegeCurriculum[] = collegeSeed.map((college) => ({
    code: college.code,
    name: college.name,
    note: college.note,
    programs: college.programs.map((programName) => ({
        name: programName,
        curriculum: buildDummyCurriculum(college.code, programName)
    }))
}))

const editCurriculum = (collegeCode: string, programName: string): void => {
    const message = `Edit requested for ${collegeCode} - ${programName}`
    console.log(message)
    window.alert(message)
}

const openCollegeCode = ref<string | null>(null)

const toggleCollege = (code: string): void => {
    openCollegeCode.value = openCollegeCode.value === code ? null : code
}

const currentDate = computed(() =>
    new Date().toLocaleDateString('en-PH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
)

const totalPrograms = computed(() => colleges.reduce((sum, college) => sum + college.programs.length, 0))
</script>

<style scoped>
.curriculum-root {
    width: 100%;
    min-height: 100vh;
    height: 100vh;
    overflow-y: auto;
}

.curriculum-root.report-root {
    padding: 24px 24px 28px;
}

.status-value {
    color: #f9a825;
    font-size: 1.2rem;
}

.curriculum-panel {
    padding-top: 20px;
    min-height: calc(100vh - 205px);
    display: flex;
    flex-direction: column;
}

.college-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 12px;
    align-content: start;
}

.program-accordion,
.curriculum-accordion {
    border: 1px solid rgba(13, 43, 15, 0.09);
    border-radius: 12px;
    background: #fff;
}

.college-card {
    border: 1px solid rgba(13, 43, 15, 0.09);
    border-radius: 14px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(13, 43, 15, 0.07);
    transition: 0.2s;
}

.college-card--open {
    border-color: rgba(13, 43, 15, 0.22);
    box-shadow: 0 8px 28px rgba(13, 43, 15, 0.11);
}

.college-trigger {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.95rem 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
}

.college-trigger:hover {
    background: #f8f5ef;
}

.college-trigger-left {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.college-trigger-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
}

.chevron {
    width: 18px;
    height: 18px;
    color: #5a745d;
    transition: transform 0.25s ease;
}

.chevron--open {
    transform: rotate(180deg);
}

.program-accordion summary,
.curriculum-accordion summary {
    list-style: none;
    cursor: pointer;
}

.program-accordion summary::-webkit-details-marker,
.curriculum-accordion summary::-webkit-details-marker {
    display: none;
}

.college-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.7rem;
}

.college-name {
    font-weight: 700;
    color: #0d2b0f;
    font-size: 0.95rem;
    margin: 0;
}

.college-body {
    padding: 0 1rem 1rem;
    display: grid;
    gap: 0.65rem;
    border-top: 1px solid #ebf3ec;
    padding-top: 0.85rem;
}

.program-accordion > summary {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.75rem 0.85rem;
    background: #faf8f2;
    border-radius: 12px;
}

.program-name {
    color: #0d2b0f;
    font-weight: 600;
}

.program-count {
    color: #5a745d;
    font-size: 0.8rem;
    font-weight: 600;
}

.program-body {
    padding: 0.55rem 0.65rem 0.75rem;
}

.curriculum-accordion > summary {
    padding: 0.7rem 0.85rem;
    font-weight: 700;
    color: rgba(13, 43, 15, 0.8);
    background: #f0ede7;
    border-radius: 12px;
}

.curriculum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.65rem;
}

.edit-curriculum-btn {
    border: 1px solid rgba(13, 43, 15, 0.1);
    border-radius: 8px;
    background: #fff;
    color: #0d2b0f;
    font-size: 0.75rem;
    font-weight: 800;
    line-height: 1;
    padding: 0.42rem 0.66rem;
    cursor: pointer;
}

.edit-curriculum-btn:hover {
    background: #0d2b0f;
    color: #fff;
}

.curriculum-accordion {
    border: none;
    background: transparent;
}

.semester-grid {
    margin-top: 0.7rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.65rem;
}

.semester-card {
    background: #fff;
    border: 1px solid rgba(13, 43, 15, 0.09);
    border-radius: 12px;
    padding: 0.7rem;
}

.college-code {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    background: rgba(13, 43, 15, 0.08);
    font-size: 0.75rem;
    font-weight: 700;
    color: #0d2b0f;
}

.college-count {
    font-size: 0.75rem;
    color: #58735c;
    font-weight: 600;
}

.semester-card h4 {
    margin: 0 0 0.55rem;
    color: #204726;
    font-size: 0.92rem;
}

.semester-card ul {
    margin: 0;
    padding-left: 1rem;
    display: grid;
    gap: 0.25rem;
}

.semester-card li {
    color: #2d4a31;
    font-size: 0.84rem;
    line-height: 1.35;
}

.college-note {
    margin: 0.85rem 0 0;
    padding: 0.6rem 0.75rem;
    background: #fff8e4;
    border: 1px solid #f1ddaa;
    border-radius: 10px;
    color: #7a5609;
    font-size: 0.84rem;
}

.empty-state-text {
    margin: 0;
    padding: 0.65rem 0.75rem;
    border: 1px dashed rgba(13, 43, 15, 0.2);
    border-radius: 10px;
    color: rgba(13, 43, 15, 0.6);
    font-size: 0.84rem;
    background: #faf8f2;
}

@media (max-width: 1100px) {
    .kpi-strip {
        grid-template-columns: repeat(3, 1fr);
    }

    .curriculum-root.report-root {
        padding: 20px 16px 24px;
    }
}

@media (max-width: 800px) {
    .kpi-strip {
        grid-template-columns: 1fr;
    }
}
</style>