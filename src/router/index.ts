import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import AnnouncementPage from '../views/AnnouncementPage.vue' 
import FeaturesPage from '../views/FeaturesPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
import PersonnelPage from '../views/PersonnelPage.vue'
import RecordPage from '../views/RecordPage.vue'
import ServicesPage from '../views/ServicesPage.vue'

//other route
import BSPPage from '@/views/OtherRoutes/BSPPage.vue'
import NBWCPage from '@/views/OtherRoutes/NBWCPage.vue'
import Starbooks from '@/views/OtherRoutes/Starbooks.vue'
import AVRPage from '@/views/OtherRoutes/AVRPage.vue'
import TopBorrowerPage from '@/views/OtherRoutes/TopBorrowerPage.vue'
import NewlyAcquiredBooksPage from '@/views/OtherRoutes/NewlyAcquiredBooksPage.vue'
import EResources from '@/views/OtherRoutes/EResources.vue'

import Dashboard from '@/views/Admin/Dashboard.vue'
import Login from '@/views/Admin/Login.vue'
import Signin from '@/views/Admin/Signin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.pBASE_URL),
  routes: [
    //main navbars
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/announcements', name: 'announcements', component: AnnouncementPage },
    { path: '/features', name: 'features', component: FeaturesPage },
    { path: '/gallery', name: 'gallery', component: GalleryPage },
    { path: '/personnel', name: 'personnel', component: PersonnelPage },
    { path: '/records', name: 'records', component: RecordPage },
    { path: '/services', name: 'services', component: ServicesPage },

    //other routes
    { path: '/avr', name: 'avr', component: AVRPage },
    { path: '/topborrower', name: 'topborrower', component: TopBorrowerPage },
    { path: '/newlyacquiredbooks', name: 'newlyacquiredbooks', component: NewlyAcquiredBooksPage },
    { path: '/bcp', name: 'bcppage', component: BSPPage },
    { path: '/nbwc', name: 'nbwcpage', component: NBWCPage },
    { path: '/starbooks', name: 'starbooks', component: Starbooks },
    { path: '/e-resources', name: 'eresources', component: EResources },

    //admin
    { path: '/admin', name: 'admin', component: Dashboard },
    { path: '/login', name: 'login', component: Login },
    { path: '/signin', name: 'signin', component: Signin },
  ],
})

export default router
