import { defineStore } from 'pinia'

export type AlertType = 'success' | 'error'

interface Alert {
  type: AlertType
  message: string
  dismissible?: boolean
}

interface AlertState {
  alert: Alert | null
}

export const useAlertStore = defineStore('alert', {
  state: (): AlertState => ({
    alert: null
  }),

  actions: {
    setAlert(alert: Alert) {
      this.alert = alert
    },

    success(message: string) {
      this.alert = {
        type: 'success',
        message,
        dismissible: true
      }
    },

    error(message: string) {
      this.alert = {
        type: 'error',
        message,
        dismissible: false
      }
    },

    clear() {
      this.alert = null
    }
  }
})