import { createRouter, createWebHistory } from 'vue-router'

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
import PersonnelOverview from '@/views/Admin/PersonnelManagement/PersonnelOverview.vue'
import RAOverview from '@/views/Admin/Reports&Analytics/RAOverview.vue'
import ReportDisplay from '@/views/Admin/Reports&Analytics/ReportDisplay.vue'
import ReportAddInput from '@/views/Admin/Reports&Analytics/ReportAddInput.vue'
import AttendanceOverview from '@/views/Admin/AttendanceManagement/AttendanceOverview.vue'
import AttendanceLogs from '@/views/Admin/AttendanceManagement/AttendanceLogs.vue'
import ImportRecord from '@/views/Admin/AttendanceManagement/ImportRecord.vue'
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
  { path: '/admin/developers', name: 'developers', component: Developers },

    //admin
    { path: '/admin', name: 'admin', component: Dashboard },
    { path: '/admin/login', name: 'login', component: Login },
    { path: '/admin/signin', name: 'signin', component: Signin },
    { path: '/admin/announcement', name: 'announcement', component: AnnouncementOverview },
    { path: '/admin/announcement/general', name: 'announcement-general', component: GeneralInput },
    { path: '/admin/announcement/event', name: 'announcement-event', component: EventInput },
    { path: '/admin/personnel', name: 'admin-personnel', component: PersonnelOverview },
    { path: '/admin/analytics', name: 'analytics', component: RAOverview },
    { path: '/admin/analytics/display', name: 'analytics-display', component: ReportDisplay },
    { path: '/admin/analytics/add', name: 'analytics-add', component: ReportAddInput },
    { path: '/admin/attendance', name: 'attendance', component: AttendanceOverview },
    { path: '/admin/attendance/logs', name: 'attendance-logs', component: AttendanceLogs },
    { path: '/admin/attendance/import', name: 'attendance-import', component: ImportRecord },

  ],
})

export default router
