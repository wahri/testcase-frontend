// stores/user.js
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('access_token') || null,
    }),
    actions: {
        setUser(user) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        setToken(token) {
            this.token = token
            localStorage.setItem('access_token', token)
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
            localStorage.removeItem('company')
        },
    },
})
