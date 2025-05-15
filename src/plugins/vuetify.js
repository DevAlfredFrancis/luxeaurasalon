/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'luxeAura',
    themes: {
      luxeAura: {
        dark: true,
        colors: {
          background: '#393D40',
          surface: '#393D40',
          primary: '#F4DE9B',
          secondary: '#b0b4b8',
          accent: '#F4DE9B',
          onPrimary: '#393D40',
          onSurface: '#FFFFFF',
          success: '#8BBF9F',
          warning: '#F2C94C',
          error: '#FF6B6B',
          stepperActive: '#218838',
        },
      },
    },
  },
  defaults: {
    global: {
      style: {
        fontFamily: 'Abel, sans-serif',
      },
    },
  },
})
