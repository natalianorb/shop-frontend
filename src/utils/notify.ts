import { Notify } from 'quasar'

export const showNotification = (message: string, type: 'positive' | 'negative' = 'positive') => {
  Notify.create({
    message,
    color: type,
    icon: type === 'positive' ? 'shopping_cart' : 'warning',
    position: 'bottom-right',
    timeout: 2000,
  })
}
