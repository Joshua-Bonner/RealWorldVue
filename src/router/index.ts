import { createRouter, createWebHistory } from 'vue-router'
import EventCreate from '../views/EventCreate.vue'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import NProgress from 'nprogress'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../views/NetworkIssue.vue'
import { eventStore } from '@/stores/eventStore'
import { numeric } from '@vuelidate/validators'

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: (route) => ({ page: parseInt(String(route.query.page)) || 1 }),
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate,
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        eventStore()
          .fetchEvent(routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event
            next()
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      },
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true,
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue,
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: '404', params: { resource: 'page' } },
    },
  ],
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
