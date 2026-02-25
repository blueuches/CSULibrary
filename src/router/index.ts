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
import Link1 from '@/views/OtherRoutes/Link1.vue'
import Link2 from '@/views/OtherRoutes/Link2.vue'
import Link3 from '@/views/OtherRoutes/Link3.vue'
import BSPPage from '@/views/OtherRoutes/BSPPage.vue'
import NBWCPage from '@/views/OtherRoutes/NBWCPage.vue'
import Starbooks from '@/views/OtherRoutes/Starbooks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.pBASE_URL),
  routes: [

    //main navbars
    { path: '/', name: 'home', component: HomePage, },
    { path: '/about',name: 'about',component: AboutPage, },
    { path: '/announcements', name: 'announcements', component: AnnouncementPage,},
    { path: '/features', name: 'features', component: FeaturesPage, },
    { path: '/gallery', name: 'gallery', component: GalleryPage, },
    { path: '/personnel', name: 'personnel', component: PersonnelPage, },
    { path: '/records', name: 'records', component: RecordPage, },
    { path: '/services', name: 'services', component: ServicesPage, },

    //other routes
    { path: '/link1', name: 'link1', component: Link1, },
    { path: '/link2', name: 'link2', component: Link2, },
    { path: '/link3', name: 'link3', component: Link3, },
    { path: '/bcp', name: 'bcppage', component: BSPPage, },
    { path: '/nbwc', name: 'nbwcpage', component: NBWCPage, },
    { path: '/starbooks', name: 'starbooks', component: Starbooks, },
   ],
})

export default router