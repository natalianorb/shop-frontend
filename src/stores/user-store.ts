import { defineStore } from 'pinia'

interface UserState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
    address: string | null
  } | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: false,
    user: null,
  }),

  getters: {
    getUserName: (state) => state.user?.name || '',
    isLoggedIn: (state) => state.isAuthenticated,
    address: (state) => state.user?.address || null,
  },

  actions: {
    setUser(userData: UserState['user']) {
      this.user = userData
      this.isAuthenticated = !!userData
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },
})
