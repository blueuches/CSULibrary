import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import AnnouncementPage from '../views/AnnouncementPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
import PersonnelPage from '../views/PersonnelPage.vue'
import RecordPage from '../views/RecordPage.vue'
import ServicesPage from '../views/ServicesPage.vue'

//other route
import BSPPage from '@/views/OtherRoutes/BSPPage.vue'
import NBWCPage from '@/views/OtherRoutes/NBWCPage.vue'
import Starbooks from '@/views/OtherRoutes/Starbooks.vue'
import AVRPage from '@/views/OtherRoutes/AVRPage.vue'
import TopBorrowers from '@/views/OtherRoutes/TopBorrowers.vue'
import NewlyAcquiredBooksPage from '@/views/OtherRoutes/NewlyAcquiredBooksPage.vue'
import EResources from '@/views/OtherRoutes/EResources.vue'

//admin
import Dashboard from '@/views/Admin/Dashboard.vue'
import Login from '@/views/Admin/Login.vue'
import Signin from '@/views/Admin/Signin.vue'
import AnnouncementOverview from '@/views/Admin/Announcements/AnnouncementOverview.vue'
import GeneralInput from '@/views/Admin/Announcements/GeneralInput.vue'
import EventInput from '@/views/Admin/Announcements/EventInput.vue'
import NewsInput from '@/views/Admin/Announcements/NewsInput.vue'
import PersonnelOverview from '@/views/Admin/PersonnelManagement/PersonnelOverview.vue'
import RAOverview from '@/views/Admin/Reports&Analytics/RAOverview.vue'
import ReportDisplay from '@/views/Admin/Reports&Analytics/ReportDisplay.vue'
import ReportAddInput from '@/views/Admin/Reports&Analytics/ReportAddInput.vue'
import ReportBooks from '@/views/Admin/Reports&Analytics/ReportBooks.vue'
import AttendanceOverview from '@/views/Admin/AttendanceManagement/AttendanceOverview.vue'
import AttendanceLogs from '@/views/Admin/AttendanceManagement/AttendanceLogs.vue'
import ImportRecord from '@/views/Admin/AttendanceManagement/ImportRecord.vue'
import AttendanceGeneral from '@/views/Admin/AttendanceManagement/AttendanceTabs/AttendanceGeneral.vue'
import AttendanceRanking from '@/views/Admin/AttendanceManagement/AttendanceTabs/AttendanceRanking.vue'
import AttendanceReport from '@/views/Admin/AttendanceManagement/AttendanceTabs/AttendanceReport.vue'
import AttendanceSearch from '@/views/Admin/AttendanceManagement/AttendanceTabs/AttendanceSearch.vue'
import SearchRecord from '@/views/Admin/AttendanceManagement/AttendanceTabs/SearchRecord.vue'
import VisitorAttendance from '@/views/Admin/AttendanceManagement/AttendanceTabs/VisitorAttendance.vue'
import ServicesOverview from '@/views/Admin/ServicesManagement/ServicesOverview.vue'
import RoomReservation from '@/views/Admin/ServicesManagement/RoomReservation.vue'
import ManageRecords from '@/views/Admin/ServicesManagement/ManageRecords.vue'
import ManageGallery from '@/views/Admin/ServicesManagement/ManageGallery.vue'
import ManageCurriculum from '@/views/Admin/ServicesManagement/ManageCurriculum.vue'
import ManageBorrowing from '@/views/Admin/ServicesManagement/ManageBorrowing.vue'
import WebsiteOverview from '@/views/Admin/WebsiteManagement/WebsiteOverview.vue'
import WebsiteImages from '@/views/Admin/WebsiteManagement/WebsiteImages.vue'
import WebsiteGeneral from '@/views/Admin/WebsiteManagement/WebsiteGeneral.vue'
import UsersManagement from '@/views/Admin/AdminManagement/UsersManagement.vue'
import Developers from '@/views/Developers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.pBASE_URL),
  routes: [
    //main navbars
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/announcements', name: 'announcements', component: AnnouncementPage },
    { path: '/gallery', name: 'gallery', component: GalleryPage },
    { path: '/personnel', name: 'personnel', component: PersonnelPage },
    { path: '/records', name: 'records', component: RecordPage },
    { path: '/services', name: 'services', component: ServicesPage },

    //other routes
    { path: '/avr', name: 'avr', component: AVRPage },
    { path: '/top-borrowers', name: 'top-borrowers', component: TopBorrowers },
    { path: '/newlyacquiredbooks', name: 'newlyacquiredbooks', component: NewlyAcquiredBooksPage },
    { path: '/bcp', name: 'bcppage', component: BSPPage },
    { path: '/nbwc', name: 'nbwcpage', component: NBWCPage },
    { path: '/starbooks', name: 'starbooks', component: Starbooks },
    { path: '/e-resources', name: 'eresources', component: EResources },
  { path: '/developers', name: 'developers', component: Developers },

    //admin
    { path: '/admin', name: 'admin', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/admin/login', name: 'login', component: Login },
    { path: '/admin/signin', name: 'signin', component: Signin },
    { path: '/admin/announcement', name: 'announcement', component: AnnouncementOverview, meta: { requiresAuth: true }  },
    { path: '/admin/announcement/general', name: 'announcement-general', component: GeneralInput, meta: { requiresAuth: true }  },
    { path: '/admin/announcement/event', name: 'announcement-event', component: EventInput, meta: { requiresAuth: true }  },
    { path: '/admin/announcement/news', name: 'announcement-news', component: NewsInput, meta: { requiresAuth: true }  },
    { path: '/admin/personnel', name: 'admin-personnel', component: PersonnelOverview, meta: { requiresAuth: true }  },
    { path: '/admin/analytics', name: 'analytics', component: RAOverview, meta: { requiresAuth: true }  },
    { path: '/admin/analytics/display', name: 'analytics-display', component: ReportDisplay, meta: { requiresAuth: true }  },
    { path: '/admin/analytics/add', name: 'analytics-add', component: ReportAddInput, meta: { requiresAuth: true }  },
    { path: '/admin/analytics/books', name: 'announcement-books', component: ReportBooks, meta: { requiresAuth: true }  },
    { path: '/admin/attendance', name: 'attendance', component: AttendanceOverview, meta: { requiresAuth: true }  },
    { path: '/admin/attendance/logs', name: 'attendance-logs', component: AttendanceLogs, meta: { requiresAuth: true }  },
    { path: '/admin/attendance/import', name: 'attendance-import', component: ImportRecord, meta: { requiresAuth: true }  },
    { path: '/admin/attendance/settings', name: 'attendance-settings', component: AttendanceGeneral, meta: { requiresAuth: true }  },
    { path: '/admin/attendance/report', name: 'attendance-report', component: AttendanceReport, meta: { requiresAuth: true }  },
    { path: '/admin/attendance/search', name: 'attendance-search', component: AttendanceSearch, meta: { requiresAuth: true }  },
    { path: '/admin/attendance/students', name: 'attendance-students', component: SearchRecord, meta: { requiresAuth: true }  },
    { path: '/admin/attendance/ranking', name: 'attendance-ranking', component: AttendanceRanking, meta: { requiresAuth: true }  },
    { path: '/admin/attendance/visitors', name: 'attendance-visitors', component: VisitorAttendance, meta: { requiresAuth: true }  },
    { path: '/admin/services', name: 'admin-services', component: ServicesOverview, meta: { requiresAuth: true }  },
    { path: '/admin/services/reservations', name: 'services-reservations', component: RoomReservation, meta: { requiresAuth: true }  },
    { path: '/admin/services/records', name: 'services-records', component: ManageRecords, meta: { requiresAuth: true }  },
    { path: '/admin/services/gallery', name: 'services-gallery', component: ManageGallery, meta: { requiresAuth: true }  },
    { path: '/admin/services/curriculum', name: 'services-curriculum', component: ManageCurriculum, meta: { requiresAuth: true }  },
    { path: '/admin/services/borrowing', name: 'services-borrowing', component: ManageBorrowing, meta: { requiresAuth: true }  },
    { path: '/admin/website', name: 'website', component: WebsiteOverview, meta: { requiresAuth: true }  },
    { path: '/admin/website/images', name: 'website-images', component: WebsiteImages, meta: { requiresAuth: true }  },
    { path: '/admin/website/general', name: 'website-general', component: WebsiteGeneral, meta: { requiresAuth: true }  }, 
    { path: '/admin/management', name: 'admin-management', component: UsersManagement, meta: { requiresAuth: true }  },
  ],
   scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const session = data.session

  const requiresAuth = to.meta.requiresAuth

  // Block if not logged in
  if (requiresAuth && !session) {
    return next('/admin/login')
  }

  // Prevent logged-in users from going back to login
  if ((to.path === '/admin/login' || to.path === '/admin/signin') && session) {
    return next('/admin')
  }

  next()
})

export default router
