import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import NonAuthenticatedLayout from '@/Non-authenticated/NonAuthenticatedLayout.vue'
import AuthenticatedLayout from '@/Authenticated/AuthenticatedLayout.vue'
import { useQueryClient } from '@tanstack/vue-query'
import { getCurrentUser } from '@/services/apiAuth'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       redirect: '/products'
//     },
//     {
//       path: '/products',
//       name: 'Products',
//       component: ProductsView
//     },
//     {
//       path: '/about',
//       name: 'about',

//       component: () => import('../views/AboutView.vue')
//     },
//     {
//       path: '/search',
//       name: 'search',
//       component: () => import('../views/SearchView.vue')
//     },
//     {
//       path: '/cart',
//       name: 'cart',
//       component: () => import('../views/CartView.vue')
//     },
//     {
//       path: '/checkout',
//       name: 'checkout',
//       component: () => import('../views/CheckoutView.vue')
//     },
//     {
//       path: '/product/:id',
//       name: 'product',
//       component: () => import('../views/ProductView.vue')
//     },
//     {
//       path: '/:pathMatch(.*)*',
//       name: 'not-found',
//       component: () => import('../views/NotFoundView.vue')
//     },
//     {
//       path: '/sign-in',
//       name: 'sign-in',
//       component: SignInView
//     },
//     {
//       path: '/sign-up',
//       name: 'sign-up',
//       component: SignUpView
//     }
//   ]
// })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Non-Authenticated',
      component: NonAuthenticatedLayout,

      children: [
        {
          path: '/',
          redirect: 'sign-in'
        },
        {
          path: 'sign-in',
          name: 'sign-in',
          component: SignInView
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUpView
        }
      ]
    },
    {
      path: '/',
      name: 'Authenticated',
      component: AuthenticatedLayout,

      children: [
        {
          path: 'products',
          name: 'products',
          component: ProductsView
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/SearchView.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('../views/CartView.vue')
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('../views/CheckoutView.vue')
        },
        {
          path: '/product/:id',
          name: 'product',
          component: () => import('../views/ProductView.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: () => import('../views/NotFoundView.vue')
        }
      ]
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  const queryClient = useQueryClient()
  const data = await queryClient.fetchQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })

  if (!data && to.name !== 'sign-in' && to.name !== 'sign-up') {
    next({ name: 'sign-in' })
  } else if (
    (data?.role === 'authenticated' && to.name === 'sign-in') ||
    (data?.role === 'authenticated' && to.name === 'sign-up')
  ) {
    next({ name: 'products' })
  } else {
    next()
  }
})
export default router
