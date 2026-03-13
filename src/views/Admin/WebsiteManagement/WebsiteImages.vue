<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { computed, ref, watch } from 'vue'
import { Files, Image as ImageIcon, Video } from 'lucide-vue-next'

import photo1 from '@/assets/images/img.jpg'
import photo2 from '@/assets/images/lib.jpg'
import photo3 from '@/assets/images/img1.jpg'
import photo4 from '@/assets/images/img2.jpg'
import photo5 from '@/assets/images/img3.jpg'
import designBg from '@/assets/images/design.png'

import tinay from '@/assets/images/tinay.jpg'
import eden from '@/assets/images/eden.jpg'

import card1 from '@/assets/images/card1.jpg'
import card2 from '@/assets/images/card2.jpg'
import card3 from '@/assets/images/card3.png'
import reservation from '@/assets/images/reservation.jpg'
import topImg from '@/assets/images/top.jpg'
import newlyAcquiredBooks from '@/assets/images/newly_acc_books.png'

import eLib from '@/assets/images/e-lib.jpg'
import opac from '@/assets/images/opac.png'
import freeJournals from '@/assets/images/free.jpg'
import gale from '@/assets/images/gale.jpg'
import ebsco from '@/assets/images/EBSCO.jpg'

const heroSrc = new URL('@/assets/csu.jpg', import.meta.url).href
const iconGif1 = new URL('@/assets/icons/idea.gif', import.meta.url).href
const iconGif2 = new URL('@/assets/icons/opportunities.gif', import.meta.url).href
const iconGif3 = new URL('@/assets/icons/student.gif', import.meta.url).href
const iconGif4 = new URL('@/assets/icons/social-life.gif', import.meta.url).href

type MediaType = 'image' | 'video'
type PageType = 'homepage' | 'aboutpage'
type ModalMode = 'alert' | 'confirm'

type MediaItem = {
  id: string
  title: string
  type: MediaType
  page: PageType
  section: string
  order: number
  category: string
  src: string
  externalLink?: string
  embedUrl?: string
  thumbnail?: string
}

const STORAGE_KEY = 'website-media-v11'

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function extractYouTubeId(url: string) {
  if (!url) return ''
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?&/]+)/,
    /(?:youtube\.com\/embed\/)([^?&/]+)/,
    /(?:youtube\.com\/shorts\/)([^?&/]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }
  return ''
}

function getYouTubeThumbnail(url: string) {
  const id = extractYouTubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''
}

function getYouTubeEmbed(url: string) {
  const id = extractYouTubeId(url)
  return id ? `https://www.youtube.com/embed/${id}` : ''
}

function mediaKey(item: MediaItem) {
  return `${item.page}__${item.section}__${item.order}__${item.title}`.toLowerCase()
}

const homepageSections = [
  { value: 'carousel', label: 'Carousel' },
  { value: 'library-section', label: 'Library Section' },
  { value: 'read-learn-discover', label: 'Read Learn Discover' },
  { value: 'library-updates', label: 'Library Updates' },
  { value: 'useful-links', label: 'Useful Links' },
  { value: 'features', label: 'Features' },
]

const aboutpageSections = [
  { value: 'hero', label: 'Hero' },
  { value: 'icons', label: 'Icons' },
]

const createAllowedHomepageSections = [
  { value: 'carousel', label: 'Carousel' },
  { value: 'features', label: 'Features' },
]

const createAllowedAboutpageSections = [{ value: 'icons', label: 'Icons' }]

const defaultItems: MediaItem[] = [
  {
    id: makeId(),
    title: 'Carousel Photo 1',
    type: 'image',
    page: 'homepage',
    section: 'carousel',
    order: 1,
    category: 'HomePage Carousel',
    src: photo1,
  },
  {
    id: makeId(),
    title: 'Carousel Photo 2',
    type: 'image',
    page: 'homepage',
    section: 'carousel',
    order: 2,
    category: 'HomePage Carousel',
    src: photo2,
  },
  {
    id: makeId(),
    title: 'Carousel Photo 3',
    type: 'image',
    page: 'homepage',
    section: 'carousel',
    order: 3,
    category: 'HomePage Carousel',
    src: photo3,
  },
  {
    id: makeId(),
    title: 'Carousel Photo 4',
    type: 'image',
    page: 'homepage',
    section: 'carousel',
    order: 4,
    category: 'HomePage Carousel',
    src: photo4,
  },
  {
    id: makeId(),
    title: 'Carousel Photo 5',
    type: 'image',
    page: 'homepage',
    section: 'carousel',
    order: 5,
    category: 'HomePage Carousel',
    src: photo5,
  },
  {
    id: makeId(),
    title: 'Design Background',
    type: 'image',
    page: 'homepage',
    section: 'library-section',
    order: 1,
    category: 'HomePage Library Section',
    src: designBg,
  },
  {
    id: makeId(),
    title: 'CSU Library Main Image',
    type: 'image',
    page: 'homepage',
    section: 'library-section',
    order: 2,
    category: 'HomePage Library Section',
    src: photo2,
  },
  {
    id: makeId(),
    title: 'Read Card Image',
    type: 'image',
    page: 'homepage',
    section: 'read-learn-discover',
    order: 1,
    category: 'HomePage Read Learn Discover',
    src: tinay,
  },
  {
    id: makeId(),
    title: 'Learn Card Image',
    type: 'image',
    page: 'homepage',
    section: 'read-learn-discover',
    order: 2,
    category: 'HomePage Read Learn Discover',
    src: eden,
  },
  {
    id: makeId(),
    title: 'Discover Card Image',
    type: 'image',
    page: 'homepage',
    section: 'read-learn-discover',
    order: 3,
    category: 'HomePage Read Learn Discover',
    src: tinay,
  },
  {
    id: makeId(),
    title: 'BSP Knowledge Resource Network',
    type: 'image',
    page: 'homepage',
    section: 'library-updates',
    order: 1,
    category: 'HomePage Library Updates',
    src: card1,
  },
  {
    id: makeId(),
    title: 'National Book Week Celebration',
    type: 'image',
    page: 'homepage',
    section: 'library-updates',
    order: 2,
    category: 'HomePage Library Updates',
    src: card2,
  },
  {
    id: makeId(),
    title: 'STARBOOKS - DOST-STII',
    type: 'image',
    page: 'homepage',
    section: 'library-updates',
    order: 3,
    category: 'HomePage Library Updates',
    src: card3,
  },
  {
    id: makeId(),
    title: 'AVR Reservation',
    type: 'image',
    page: 'homepage',
    section: 'library-updates',
    order: 4,
    category: 'HomePage Library Updates',
    src: reservation,
  },
  {
    id: makeId(),
    title: 'Top Library Borrowers and Visitors',
    type: 'image',
    page: 'homepage',
    section: 'library-updates',
    order: 5,
    category: 'HomePage Library Updates',
    src: topImg,
  },
  {
    id: makeId(),
    title: 'Newly Acquired Books',
    type: 'image',
    page: 'homepage',
    section: 'library-updates',
    order: 6,
    category: 'HomePage Library Updates',
    src: newlyAcquiredBooks,
  },
  {
    id: makeId(),
    title: 'Philippine E-Lib',
    type: 'image',
    page: 'homepage',
    section: 'useful-links',
    order: 1,
    category: 'HomePage Useful Links',
    src: eLib,
    externalLink: 'https://www.elib.gov.ph',
  },
  {
    id: makeId(),
    title: 'CARSU Webpage Logo',
    type: 'image',
    page: 'homepage',
    section: 'useful-links',
    order: 2,
    category: 'HomePage Useful Links',
    src: '/csu-logo.png',
    externalLink: 'https://www.carsu.edu.ph/',
  },
  {
    id: makeId(),
    title: 'Web OPAC',
    type: 'image',
    page: 'homepage',
    section: 'useful-links',
    order: 3,
    category: 'HomePage Useful Links',
    src: opac,
    externalLink: 'http://mylibrary.carsu.edu.ph/',
  },
  {
    id: makeId(),
    title: 'Free Access Journals',
    type: 'image',
    page: 'homepage',
    section: 'useful-links',
    order: 4,
    category: 'HomePage Useful Links',
    src: freeJournals,
    externalLink: 'https://www.journals.uchicago.edu/action/showPublications',
  },
  {
    id: makeId(),
    title: 'Infotrac',
    type: 'image',
    page: 'homepage',
    section: 'useful-links',
    order: 5,
    category: 'HomePage Useful Links',
    src: gale,
    externalLink: 'https://link.gale.com/apps/menu?userGroupName=phcarsu&prodId=MENU',
  },
  {
    id: makeId(),
    title: 'EBSCO',
    type: 'image',
    page: 'homepage',
    section: 'useful-links',
    order: 6,
    category: 'HomePage Useful Links',
    src: ebsco,
    externalLink: 'https://login.ebsco.com',
  },
  {
    id: makeId(),
    title: 'Virtual Tour',
    type: 'video',
    page: 'homepage',
    section: 'features',
    order: 1,
    category: 'HomePage Features',
    src: 'https://www.youtube.com/watch?v=Lv0URTSBniY',
    thumbnail: 'https://img.youtube.com/vi/Lv0URTSBniY/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/Lv0URTSBniY',
    externalLink: 'https://www.youtube.com/watch?v=Lv0URTSBniY',
  },
  {
    id: makeId(),
    title: 'Library Orientation',
    type: 'video',
    page: 'homepage',
    section: 'features',
    order: 2,
    category: 'HomePage Features',
    src: 'https://www.youtube.com/watch?v=HAEPrH2aYpc',
    thumbnail: 'https://img.youtube.com/vi/HAEPrH2aYpc/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/HAEPrH2aYpc',
    externalLink: 'https://www.youtube.com/watch?v=HAEPrH2aYpc',
  },
  {
    id: makeId(),
    title: 'About Hero Image',
    type: 'image',
    page: 'aboutpage',
    section: 'hero',
    order: 1,
    category: 'AboutPage Hero',
    src: heroSrc,
  },
  {
    id: makeId(),
    title: 'Discovery Icon',
    type: 'image',
    page: 'aboutpage',
    section: 'icons',
    order: 1,
    category: 'AboutPage Icons',
    src: iconGif1,
  },
  {
    id: makeId(),
    title: 'Learning Icon',
    type: 'image',
    page: 'aboutpage',
    section: 'icons',
    order: 2,
    category: 'AboutPage Icons',
    src: iconGif3,
  },
  {
    id: makeId(),
    title: 'Knowledge Icon',
    type: 'image',
    page: 'aboutpage',
    section: 'icons',
    order: 3,
    category: 'AboutPage Icons',
    src: iconGif2,
  },
  {
    id: makeId(),
    title: 'Networking Icon',
    type: 'image',
    page: 'aboutpage',
    section: 'icons',
    order: 4,
    category: 'AboutPage Icons',
    src: iconGif4,
  },
]

function loadInitialItems(): MediaItem[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultItems
  try {
    const parsed = JSON.parse(raw) as MediaItem[]
    if (!parsed.length) return defaultItems
    const storedMap = new Map(parsed.map((item) => [mediaKey(item), item]))
    const mergedDefaults = defaultItems.map(
      (defaultItem) => storedMap.get(mediaKey(defaultItem)) ?? defaultItem,
    )
    const defaultKeys = new Set(defaultItems.map(mediaKey))
    const extraStored = parsed.filter((item) => !defaultKeys.has(mediaKey(item)))
    return [...mergedDefaults, ...extraStored]
  } catch {
    return defaultItems
  }
}

const items = ref<MediaItem[]>(loadInitialItems())

watch(
  items,
  (val) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      window.dispatchEvent(new CustomEvent('website-media-updated'))
    } catch (error) {
      console.warn('Unable to save media to localStorage. File may be too large.', error)
      openAlert('Unable to save. The uploaded file may be too large for localStorage.')
    }
  },
  { deep: true },
)

const searchTerm = ref('')
const typeFilter = ref<'all' | MediaType>('all')
const pageFilter = ref<'all' | PageType>('all')
const categoryFilter = ref('all')
const selectedFileName = ref('')
const selectedId = ref<string | null>(items.value[0]?.id ?? null)

const selectedItem = computed(
  () => items.value.find((item) => item.id === selectedId.value) ?? null,
)

const categories = computed(() => {
  const unique = Array.from(new Set(items.value.map((item) => item.category))).sort()
  return ['all', ...unique]
})

const form = ref<MediaItem>({
  id: '',
  title: '',
  type: 'image',
  page: 'homepage',
  section: 'carousel',
  order: 1,
  category: '',
  src: '',
  externalLink: '',
  embedUrl: '',
  thumbnail: '',
})

const mode = ref<'create' | 'edit'>('create')
const showMediaModal = ref(false)
const showNoticeModal = ref(false)
const noticeMode = ref<ModalMode>('alert')
const noticeTitle = ref('Notice')
const noticeMessage = ref('')
let confirmAction: (() => void) | null = null

const availableSections = computed(() => {
  if (mode.value === 'create') {
    return form.value.page === 'homepage'
      ? createAllowedHomepageSections
      : createAllowedAboutpageSections
  }
  return form.value.page === 'homepage' ? homepageSections : aboutpageSections
})

const isVideoAllowedInCurrentSection = computed(() => {
  if (form.value.page === 'aboutpage') return false
  return form.value.section === 'carousel' || form.value.section === 'features'
})

const filteredItems = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  return items.value
    .filter((item) => {
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.page.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q)
      const matchesType = typeFilter.value === 'all' || item.type === typeFilter.value
      const matchesPage = pageFilter.value === 'all' || item.page === pageFilter.value
      const matchesCategory =
        categoryFilter.value === 'all' || item.category === categoryFilter.value
      return matchesSearch && matchesType && matchesPage && matchesCategory
    })
    .sort((a, b) => {
      if (a.page !== b.page) return a.page.localeCompare(b.page)
      if (a.section !== b.section) return a.section.localeCompare(b.section)
      return a.order - b.order
    })
})

function openAlert(message: string, title = 'Required Fields') {
  noticeMode.value = 'alert'
  noticeTitle.value = title
  noticeMessage.value = message
  confirmAction = null
  showNoticeModal.value = true
}

function openConfirm(message: string, onConfirm: () => void, title = 'Confirm Deletion') {
  noticeMode.value = 'confirm'
  noticeTitle.value = title
  noticeMessage.value = message
  confirmAction = onConfirm
  showNoticeModal.value = true
}

function closeNoticeModal() {
  showNoticeModal.value = false
  confirmAction = null
}

function handleNoticeConfirm() {
  if (noticeMode.value === 'confirm' && confirmAction) confirmAction()
  closeNoticeModal()
}

function getNextOrder(page: PageType, section: string) {
  const sectionItems = items.value.filter((item) => item.page === page && item.section === section)
  if (!sectionItems.length) return 1
  return Math.max(...sectionItems.map((item) => Number(item.order) || 0)) + 1
}

function getDefaultCategory(page: PageType, section: string) {
  const found = items.value.find((item) => item.page === page && item.section === section)
  if (found?.category) return found.category
  const sectionLabel =
    [...homepageSections, ...aboutpageSections].find((item) => item.value === section)?.label ??
    section
  return `${page === 'homepage' ? 'HomePage' : 'AboutPage'} ${sectionLabel}`
}

function normalizeTypeForSection() {
  if (!isVideoAllowedInCurrentSection.value && form.value.type === 'video') {
    form.value.type = 'image'
    form.value.externalLink = ''
    form.value.embedUrl = ''
    form.value.thumbnail = ''
  }
}

function resetForm() {
  form.value = {
    id: '',
    title: '',
    type: 'image',
    page: 'homepage',
    section: 'carousel',
    order: getNextOrder('homepage', 'carousel'),
    category: getDefaultCategory('homepage', 'carousel'),
    src: '',
    externalLink: '',
    embedUrl: '',
    thumbnail: '',
  }
  selectedFileName.value = ''
  mode.value = 'create'
}

function handlePageChange() {
  const firstSection = availableSections.value[0]?.value ?? ''
  form.value.section = firstSection
  form.value.order = getNextOrder(form.value.page, firstSection)
  form.value.category = getDefaultCategory(form.value.page, firstSection)
  normalizeTypeForSection()
}

function handleSectionChange() {
  if (!form.value.id) form.value.order = getNextOrder(form.value.page, form.value.section)
  form.value.category = getDefaultCategory(form.value.page, form.value.section)
  normalizeTypeForSection()
}

function handleTypeChange() {
  if (form.value.type === 'image') {
    form.value.externalLink = ''
    form.value.embedUrl = ''
    form.value.thumbnail = ''
  }
}

function openAddModal() {
  resetForm()
  showMediaModal.value = true
}

function editItem(item: MediaItem) {
  form.value = { ...item }
  selectedFileName.value = ''
  mode.value = 'edit'
  selectedId.value = item.id
  showMediaModal.value = true
}

function validateForm(payload: MediaItem) {
  if (!payload.title.trim()) {
    openAlert('Please fill in the Title field.')
    return false
  }
  if (!payload.category.trim()) {
    openAlert('Please fill in the Category field.')
    return false
  }
  if (!payload.page.trim()) {
    openAlert('Please select a Page.')
    return false
  }
  if (!payload.section.trim()) {
    openAlert('Please select a Section.')
    return false
  }
  if (
    mode.value === 'create' &&
    payload.page === 'homepage' &&
    !['carousel', 'features'].includes(payload.section)
  ) {
    openAlert('New media for HomePage can only be added inside Carousel or Features.')
    return false
  }
  if (mode.value === 'create' && payload.page === 'aboutpage' && payload.section !== 'icons') {
    openAlert('New media for AboutPage can only be added inside Icons.')
    return false
  }
  if (payload.page === 'aboutpage' && payload.type === 'video') {
    openAlert('AboutPage only supports images.')
    return false
  }
  if (
    payload.page === 'homepage' &&
    !['carousel', 'features'].includes(payload.section) &&
    payload.type === 'video'
  ) {
    openAlert('Only HomePage Carousel and Features can use videos.')
    return false
  }
  if (!payload.order || Number(payload.order) < 1) {
    openAlert('Please provide a valid Order number.')
    return false
  }
  if (payload.type === 'video') {
    const videoSource =
      payload.externalLink?.trim() || payload.embedUrl?.trim() || payload.src.trim()
    if (!videoSource) {
      openAlert('Please provide a video file or an external video link.')
      return false
    }
  } else {
    if (!payload.src.trim()) {
      openAlert('Please provide an image file or source URL.')
      return false
    }
  }
  return true
}

function handleSaveMedia() {
  if (saveItem()) showMediaModal.value = false
}

function saveItem() {
  const payload: MediaItem = {
    ...form.value,
    id: form.value.id || makeId(),
    order: Number(form.value.order) || 1,
  }
  if (!validateForm(payload)) return false
  if (payload.type === 'video') {
    const videoSource =
      payload.externalLink?.trim() || payload.embedUrl?.trim() || payload.src.trim()
    const youtubeId = extractYouTubeId(videoSource)
    if (youtubeId) {
      payload.thumbnail = getYouTubeThumbnail(videoSource)
      payload.embedUrl = getYouTubeEmbed(videoSource)
      payload.externalLink = `https://www.youtube.com/watch?v=${youtubeId}`
      payload.src = payload.externalLink
    } else if (!payload.src.trim()) payload.src = videoSource
  } else {
    payload.embedUrl = ''
    payload.thumbnail = ''
    payload.externalLink = payload.externalLink?.trim() || ''
  }
  if (mode.value === 'create') {
    items.value.push(payload)
    selectedId.value = payload.id
  } else {
    const index = items.value.findIndex((item) => item.id === payload.id)
    if (index !== -1) {
      items.value[index] = payload
      selectedId.value = payload.id
    }
  }
  resetForm()
  return true
}

function deleteItem(id: string) {
  const itemToDelete = items.value.find((item) => item.id === id)
  if (!itemToDelete) return
  openConfirm(
    `Are you sure you want to delete this file: "${itemToDelete.title}"?`,
    () => {
      items.value = items.value.filter((item) => item.id !== id)
      if (selectedId.value === id) selectedId.value = items.value[0]?.id ?? null
      if (form.value.id === id) resetForm()
    },
    'Confirm Deletion',
  )
}

function handleMainFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  selectedFileName.value = file.name
  const reader = new FileReader()
  reader.onload = () => {
    form.value.src = String(reader.result ?? '')
    if (form.value.type === 'video') {
      form.value.externalLink = ''
      form.value.embedUrl = ''
      form.value.thumbnail = ''
    }
  }
  reader.readAsDataURL(file)
}

function goBack() {
  window.history.back()
}

const totalImages = computed(() => items.value.filter((item) => item.type === 'image').length)
const totalVideos = computed(() => items.value.filter((item) => item.type === 'video').length)
</script>

<template>
  <div class="page-layout">
    <Sidebar :activeTab="'MEDIA'" />
    <div class="wm-page">
      <div class="wm-wrap">
        <div class="wm-hero">
          <div class="header-breadcrumb !mb-2">
            <span
              class="cursor-pointer hover:text-[#0d2b0f] transition-colors"
              @click="$router.push('/admin/website')"
              >BACK</span
            >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>WEBSITE MANAGEMENT</span>
          </div>

          <div class="wm-hero-main">
            <div class="wm-hero-copy">
              <div class="wm-title-row">
                <span class="wm-title">Website</span>
                <span class="wm-management">Management</span>
              </div>

              <div class="wm-title-line"></div>

              <p class="wm-subtitle">
                Manage homepage and about page images and videos used in the website.
              </p>
            </div>

            <div class="wm-hero-action">
              <button class="wm-btn wm-btn-primary wm-add-btn" @click="openAddModal">
                + Add New Media
              </button>
            </div>
          </div>
        </div>

        <div class="wm-stats">
          <div class="wm-stat">
            <div class="wm-stat-top">
              <span class="wm-stat-icon">
                <Files class="wm-stat-svg" />
              </span>
              <span class="wm-stat-label">Total Media</span>
            </div>
            <strong class="wm-stat-value">{{ items.length }}</strong>
          </div>

          <div class="wm-stat">
            <div class="wm-stat-top">
              <span class="wm-stat-icon">
                <ImageIcon class="wm-stat-svg" />
              </span>
              <span class="wm-stat-label">Images</span>
            </div>
            <strong class="wm-stat-value">{{ totalImages }}</strong>
          </div>

          <div class="wm-stat">
            <div class="wm-stat-top">
              <span class="wm-stat-icon">
                <Video class="wm-stat-svg" />
              </span>
              <span class="wm-stat-label">Videos</span>
            </div>
            <strong class="wm-stat-value">{{ totalVideos }}</strong>
          </div>
        </div>

        <div class="wm-grid">
          <div class="wm-left">
            <div class="wm-card wm-list-card">
              <div class="wm-toolbar wm-toolbar-4">
                <input
                  v-model="searchTerm"
                  class="wm-input"
                  type="text"
                  placeholder="Search title, category, page, section..."
                />
                <select v-model="typeFilter" class="wm-select">
                  <option value="all">All Types</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                </select>
                <select v-model="pageFilter" class="wm-select">
                  <option value="all">All Pages</option>
                  <option value="homepage">HomePage</option>
                  <option value="aboutpage">AboutPage</option>
                </select>
                <select v-model="categoryFilter" class="wm-select">
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category === 'all' ? 'All Categories' : category }}
                  </option>
                </select>
              </div>

              <div class="wm-list">
                <div
                  v-for="item in filteredItems"
                  :key="item.id"
                  class="wm-item"
                  :class="{ active: selectedId === item.id }"
                  @click="selectedId = item.id"
                >
                  <div class="wm-thumb">
                    <img v-if="item.type === 'image'" :src="item.src" :alt="item.title" />
                    <img v-else-if="item.thumbnail" :src="item.thumbnail" :alt="item.title" />
                    <video v-else :src="item.src" muted playsinline preload="metadata"></video>
                  </div>
                  <div class="wm-item-body">
                    <div class="wm-item-top">
                      <h3>{{ item.title }}</h3>
                    </div>
                    <p class="wm-meta">{{ item.category }}</p>
                    <p class="wm-item-sub">
                      {{ item.page }} • {{ item.section }} • Order {{ item.order }}
                    </p>
                  </div>
                  <div class="wm-actions">
                    <button class="wm-icon-btn" @click.stop="editItem(item)">Edit</button>
                    <button class="wm-icon-btn danger" @click.stop="deleteItem(item.id)">
                      Delete
                    </button>
                  </div>
                </div>
                <div v-if="filteredItems.length === 0" class="wm-empty">No media found.</div>
              </div>
            </div>
          </div>

          <div class="wm-right">
            <div class="wm-card wm-preview-card">
              <div class="wm-card-head">
                <h2>Preview</h2>
              </div>
              <div v-if="selectedItem" class="wm-preview">
                <img
                  v-if="selectedItem.type === 'image'"
                  :src="selectedItem.src"
                  :alt="selectedItem.title"
                  class="wm-preview-media"
                />
                <div v-else class="wm-video-preview">
                  <iframe
                    v-if="selectedItem.embedUrl"
                    :src="selectedItem.embedUrl"
                    class="wm-preview-media wm-iframe"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                  <video
                    v-else
                    :src="selectedItem.src"
                    class="wm-preview-media"
                    controls
                    preload="metadata"
                  ></video>
                </div>
                <div class="wm-preview-info">
                  <h3>{{ selectedItem.title }}</h3>
                  <p><strong>Type:</strong> {{ selectedItem.type }}</p>
                  <p><strong>Page:</strong> {{ selectedItem.page }}</p>
                  <p><strong>Section:</strong> {{ selectedItem.section }}</p>
                  <p><strong>Order:</strong> {{ selectedItem.order }}</p>
                  <p><strong>Category:</strong> {{ selectedItem.category }}</p>
                  <p v-if="selectedItem.externalLink">
                    <strong>Link:</strong> {{ selectedItem.externalLink }}
                  </p>
                  <p v-if="selectedItem.embedUrl">
                    <strong>Embed:</strong> {{ selectedItem.embedUrl }}
                  </p>
                </div>
              </div>
              <div v-else class="wm-empty">Select a media item to preview.</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showMediaModal" class="wm-modal-overlay" @click.self="showMediaModal = false">
        <div class="wm-modal">
          <div class="wm-modal-head">
            <h2>{{ mode === 'create' ? 'Add Media' : 'Edit Media' }}</h2>
            <button class="wm-close" @click="showMediaModal = false">✕</button>
          </div>
          <div class="wm-form">
            <div class="wm-field">
              <label>Title</label>
              <input v-model="form.title" class="wm-input" type="text" />
            </div>
            <div class="wm-row wm-row-3">
              <div class="wm-field">
                <label>Type</label>
                <select v-model="form.type" class="wm-select" @change="handleTypeChange">
                  <option value="image">Image</option>
                  <option v-if="isVideoAllowedInCurrentSection" value="video">Video</option>
                </select>
              </div>
              <div class="wm-field">
                <label>Page</label>
                <select v-model="form.page" class="wm-select" @change="handlePageChange">
                  <option value="homepage">HomePage</option>
                  <option value="aboutpage">AboutPage</option>
                </select>
              </div>
              <div class="wm-field">
                <label>Section</label>
                <select v-model="form.section" class="wm-select" @change="handleSectionChange">
                  <option
                    v-for="section in availableSections"
                    :key="section.value"
                    :value="section.value"
                  >
                    {{ section.label }}
                  </option>
                </select>
              </div>
            </div>
            <div class="wm-row wm-row-2">
              <div class="wm-field">
                <label>Category</label>
                <input v-model="form.category" class="wm-input" type="text" />
              </div>
              <div class="wm-field">
                <label>Order</label>
                <input v-model.number="form.order" class="wm-input" type="number" min="1" />
              </div>
            </div>
            <div class="wm-field">
              <label>Source URL / Path / Base64</label>
              <input v-model="form.src" class="wm-input" type="text" />
            </div>
            <div class="wm-field">
              <label>Upload Main File</label>
              <label class="wm-upload-card">
                <input
                  class="wm-file-hidden"
                  type="file"
                  :accept="form.type === 'video' ? 'video/mp4,video/webm,video/ogg' : 'image/*'"
                  @change="handleMainFileChange"
                />
                <div class="wm-upload-inner">
                  <span class="wm-upload-sub">{{
                    selectedFileName ||
                    (form.type === 'video' ? 'Upload Video +' : 'Upload Photo +')
                  }}</span>
                </div>
              </label>
            </div>
            <template v-if="form.type === 'video'">
              <div class="wm-field">
                <label>External Video Link</label>
                <input
                  v-model="form.externalLink"
                  class="wm-input"
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </template>
            <div class="wm-form-actions">
              <button class="wm-btn wm-btn-secondary" @click="resetForm">Clear</button>
              <button class="wm-btn wm-btn-primary" @click="handleSaveMedia">
                {{ mode === 'create' ? 'Save Media' : 'Update Media' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showNoticeModal" class="wm-notice-overlay" @click.self="closeNoticeModal">
        <div class="wm-notice-card">
          <div class="wm-notice-head">
            <h3>{{ noticeTitle }}</h3>
          </div>
          <div class="wm-notice-body">
            <p>{{ noticeMessage }}</p>
          </div>
          <div class="wm-notice-actions">
            <button
              v-if="noticeMode === 'confirm'"
              class="wm-btn wm-btn-secondary"
              @click="closeNoticeModal"
            >
              Cancel
            </button>
            <button
              v-if="noticeMode === 'confirm'"
              class="wm-btn wm-btn-danger"
              @click="handleNoticeConfirm"
            >
              Delete
            </button>
            <button
              v-if="noticeMode === 'alert'"
              class="wm-btn wm-btn-primary"
              @click="closeNoticeModal"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.wm-page {
  flex: 1;
  min-height: 100vh;
  width: 100%;
  overflow-y: auto;
  background: #f5f3ef;
  padding: 28px 28px 24px;
  box-sizing: border-box;
}

.wm-wrap {
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
}

.wm-hero {
  margin-bottom: 22px;
}

.wm-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: transparent;
  padding: 0;
  margin-bottom: 18px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(13, 43, 15, 0.4);
  transition: color 0.2s ease;
}

.wm-back-btn:hover {
  color: #0d2b0f;
}

.wm-back-sep {
  color: #c3c9bf;
}

.wm-hero-main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.wm-hero-copy {
  min-width: 0;
}

.wm-title-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.wm-title {
  font-size: clamp(3rem, 3vw, 1.7rem);
  font-weight: 900;
  color: #083411;
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin: 0;
}

.wm-management {
  font-size: clamp(3rem, 3vw, 1.7rem);
  font-weight: 900;
  color: #fbc02d;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.wm-subtitle {
  color: #5f7566;
  margin: 14px 0 0;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  line-height: 1.45;
  max-width: 980px;
}

.wm-title-line {
  width: 190px;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, #0d2b0f 0%, #c78c06 100%);
  margin-top: 14px;
  margin-bottom: 18px;
}

.wm-hero-action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.wm-add-btn {
  min-width: 180px;
}

.wm-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.wm-stat {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(13, 43, 15, 0.08);
  border-radius: 20px;
  padding: 16px 18px;
  box-shadow: 0 12px 28px rgba(13, 43, 15, 0.05);
}

.wm-stat-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.wm-stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(13, 43, 15, 0.06);
  color: #0d2b0f;
  flex-shrink: 0;
}

.wm-stat-svg {
  width: 20px;
  height: 20px;
}

.wm-stat:nth-child(2) .wm-stat-icon {
  background: rgba(251, 192, 45, 0.14);
  color: #c78c06;
}

.wm-stat:nth-child(3) .wm-stat-icon {
  background: rgba(27, 94, 32, 0.1);
  color: #1b5e20;
}

.wm-stat-label {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: rgba(13, 43, 15, 0.55);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0;
}

.wm-stat-value {
  font-size: 1.8rem;
  font-weight: 900;
  color: #0d2b0f;
}

.wm-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr);
  gap: 18px;
  align-items: start;
}

.wm-left,
.wm-right {
  min-width: 0;
  align-self: start;
}

.wm-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(13, 43, 15, 0.08);
  border-radius: 24px;
  box-shadow: 0 14px 34px rgba(13, 43, 15, 0.06);
  overflow: hidden;
}

.wm-list-card,
.wm-preview-card {
  display: flex;
  flex-direction: column;
}

.wm-card-head {
  padding: 18px 18px 0;
}

.wm-card-head h2 {
  margin: 0;
  color: #0d2b0f;
  font-size: 1.15rem;
  font-weight: 900;
}

.wm-toolbar {
  display: grid;
  gap: 10px;
  padding: 18px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.08);
}

.wm-toolbar-4 {
  grid-template-columns: 1.5fr 0.7fr 0.8fr 1fr;
}

.wm-list {
  height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.wm-list::-webkit-scrollbar {
  display: none;
}

.wm-item {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: 0.2s ease;
}

.wm-item:hover,
.wm-item.active {
  background: #f8fbf8;
  border-color: rgba(13, 43, 15, 0.1);
}

.wm-thumb {
  width: 88px;
  height: 68px;
  border-radius: 12px;
  overflow: hidden;
  background: #eef3ee;
  flex-shrink: 0;
}

.wm-thumb img,
.wm-thumb video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.wm-item-body {
  min-width: 0;
}

.wm-item-body h3 {
  margin: 0 0 6px;
  font-size: 0.98rem;
  color: #0d2b0f;
  font-weight: 900;
  line-height: 1.25;
  word-break: break-word;
}

.wm-item-top {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  justify-content: space-between;
}

.wm-meta {
  margin: 0;
  font-size: 0.8rem;
  color: #1b5e20;
  font-weight: 700;
  word-break: break-word;
}

.wm-item-sub {
  margin: 4px 0 0;
  font-size: 0.78rem;
  color: rgba(13, 43, 15, 0.55);
  word-break: break-word;
}

.wm-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}

.wm-icon-btn {
  border: 0;
  background: #eef3ee;
  color: #0d2b0f;
  padding: 8px 10px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
  min-width: 72px;
  text-align: center;
}

.wm-icon-btn:hover {
  background: #e2ebe2;
}

.wm-icon-btn.danger {
  background: rgba(211, 47, 47, 0.08);
  color: #b3261e;
}

.wm-icon-btn.danger:hover {
  background: rgba(211, 47, 47, 0.14);
}

.wm-preview {
  padding: 18px;
  min-height: calc(68vh + 86px);
  box-sizing: border-box;
}

.wm-preview-media {
  width: 100%;
  max-height: 340px;
  object-fit: contain;
  border-radius: 18px;
  background: #f5f7f5;
  border: 1px solid rgba(13, 43, 15, 0.08);
  display: block;
}

.wm-iframe {
  min-height: 340px;
}

.wm-preview-info {
  margin-top: 16px;
}

.wm-preview-info h3 {
  margin: 0 0 10px;
  color: #0d2b0f;
  font-size: 1.1rem;
  font-weight: 900;
  word-break: break-word;
}

.wm-preview-info p {
  margin: 6px 0;
  color: rgba(13, 43, 15, 0.78);
  word-break: break-word;
}

.wm-video-preview {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.wm-form {
  padding: 18px 22px 22px;
}

.wm-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.wm-row {
  display: grid;
  gap: 12px;
}

.wm-row-3 {
  grid-template-columns: 0.8fr 1fr 1fr;
}

.wm-row-2 {
  grid-template-columns: 1.3fr 0.7fr;
}

.wm-field label {
  font-size: 0.78rem;
  font-weight: 800;
  color: rgba(13, 43, 15, 0.72);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.wm-input,
.wm-select {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(13, 43, 15, 0.12);
  background: #fff;
  border-radius: 14px;
  padding: 12px 14px;
  font-size: 14px;
  color: #0d2b0f;
  outline: none;
}

.wm-input:focus,
.wm-select:focus {
  border-color: rgba(249, 168, 37, 0.75);
  box-shadow: 0 0 0 4px rgba(249, 168, 37, 0.12);
}

.wm-file-hidden {
  display: none;
}

.wm-upload-card {
  width: 100%;
  min-height: 110px;
  border: 2px dashed rgba(13, 43, 15, 0.22);
  border-radius: 18px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
  padding: 14px;
  box-sizing: border-box;
}

.wm-upload-card:hover {
  border-color: rgba(249, 168, 37, 0.85);
  background: #fffdf7;
  box-shadow: 0 0 0 4px rgba(249, 168, 37, 0.08);
}

.wm-upload-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
}

.wm-upload-sub {
  font-size: 0.95rem;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.6);
  word-break: break-word;
}

.wm-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.wm-btn {
  border: 0;
  border-radius: 14px;
  padding: 12px 16px;
  font-weight: 900;
  cursor: pointer;
  transition: 0.2s ease;
}

.wm-btn-primary {
  background: #0d2b0f;
  color: #fff;
}

.wm-btn-primary:hover {
  background: #174319;
}

.wm-btn-secondary {
  background: #eef3ee;
  color: #0d2b0f;
}

.wm-btn-secondary:hover {
  background: #e3ebe3;
}

.wm-btn-danger {
  background: #b3261e;
  color: #fff;
}

.wm-btn-danger:hover {
  background: #8f1f19;
}

.wm-empty {
  padding: 28px 18px;
  text-align: center;
  color: rgba(13, 43, 15, 0.48);
  font-weight: 700;
}

.wm-modal-overlay,
.wm-notice-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 999;
}

.wm-modal {
  width: 100%;
  max-width: 880px;
  max-height: 90vh;
  overflow-y: auto;
  background: #f4f6f4;
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(13, 43, 15, 0.08);
}

.wm-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 22px 0;
}

.wm-modal-head h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 900;
  color: #0d2b0f;
}

.wm-close {
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 999px;
  background: #e9eeea;
  color: #0d2b0f;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  transition: 0.2s ease;
}

.wm-close:hover {
  background: #dfe7e0;
}

.wm-notice-card {
  width: 100%;
  max-width: 430px;
  background: #ffffff;
  border-radius: 22px;
  border: 1px solid rgba(13, 43, 15, 0.1);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}

.wm-notice-head {
  padding: 20px 22px 0;
}

.wm-notice-head h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 900;
  color: #0d2b0f;
  text-align: center;
  padding-bottom: 20px;
}

.wm-notice-body {
  padding: 14px 22px 8px;
}

.wm-notice-body p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(13, 43, 15, 0.75);
  text-align: center;
}

.wm-notice-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 18px 22px 22px;
}

.wm-notice-actions .wm-btn-secondary {
  margin-right: auto;
}

.wm-notice-actions .wm-btn-danger,
.wm-notice-actions .wm-btn-primary {
  margin-left: auto;
}

@media (max-width: 1100px) {
  .wm-hero-main {
    flex-direction: column;
    align-items: flex-start;
  }

  .wm-grid {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .wm-list {
    height: 60vh;
  }

  .wm-preview {
    min-height: auto;
  }
}

@media (max-width: 900px) {
  .wm-toolbar-4,
  .wm-row-3,
  .wm-row-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .wm-page {
    padding: 18px 16px;
  }

  .wm-title {
    font-size: clamp(2.4rem, 10vw, 3.6rem);
  }

  .wm-subtitle {
    font-size: 1rem;
  }

  .wm-stats {
    grid-template-columns: 1fr;
  }

  .wm-item {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .wm-thumb {
    width: 100%;
    height: 180px;
  }

  .wm-actions {
    justify-content: flex-start;
  }

  .wm-list {
    height: 56vh;
  }

  .wm-modal {
    max-height: 94vh;
  }

  .wm-modal-overlay,
  .wm-notice-overlay {
    padding: 12px;
  }

  .wm-notice-actions {
    flex-direction: row;
    align-items: center;
  }

  .wm-notice-actions .wm-btn {
    width: auto;
  }
}
</style>
