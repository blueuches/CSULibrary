import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import AnnouncementPage from '../views/AnnouncementPage.vue'
import FeaturesPage from '../views/FeaturesPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
import PersonnelPage from '../views/PersonnelPage.vue'
import RecordPage from '../views/RecordPage.vue'
import ServicesPage from '../views/ServicesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.pBASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage, },
    { path: '/about',name: 'about',component: AboutPage, },
    { path: '/announcements', name: 'announcements', component: AnnouncementPage,},
    { path: '/features', name: 'features', component: FeaturesPage, },
    { path: '/gallery', name: 'gallery', component: GalleryPage, },
    { path: '/personnel', name: 'personnel', component: PersonnelPage, },
    { path: '/records', name: 'records', component: RecordPage, },
    { path: '/services', name: 'services', component: ServicesPage, },
  ],
})

export default router