import lodash from 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/+esm'

const modeOptionsVisible = [
  'opacity-100',
  'pointer-events-auto',
  'translate-y-4',
]
const modeOptionsHidden = ['pointer-events-none', 'opacity-0', 'translate-y-0']

const initThemeMode = () => {
  const applyTheme = (darkMode) => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.getElementById('sun').classList.add('hidden')
      document.getElementById('moon').classList.remove('hidden')
    } else {
      document.documentElement.classList.remove('dark')
      document.getElementById('sun').classList.remove('hidden')
      document.getElementById('moon').classList.add('hidden')
    }
  }
  if (
    localStorage.mode === 'dark' ||
    (!('mode' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    applyTheme(true)
  } else {
    applyTheme(false)
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      applyTheme(event.matches)
    })
}

class Xfolio {
  toggleModeBtn
  toggleModeOptions
  setLightModeBtn
  setDarkModeBtn
  setSystemModeBtn
  toggleMenuBtn
  mobileMenu

  hidden = ['pointer-events-none', 'opacity-0', 'translate-y-0']
  constructor() {
    this.toggleModeBtn = document.getElementById('toggle-mode')
    this.toggleModeOptions = document.getElementById('toggle-mode-options')
    this.setLightModeBtn = document.getElementById('set-light-mode')
    this.setDarkModeBtn = document.getElementById('set-dark-mode')
    this.setSystemModeBtn = document.getElementById('set-system-mode')
    this.toggleMenuBtn = document.getElementById('toggle-menu')
    this.mobileMenu = document.getElementById('mobile-menu')

    this.init()
  }

  init() {
    this.handleToggleMode()
    this.handleToggleMenu()
  }

  handleToggleMode() {
    this.toggleModeBtn.addEventListener('click', (event) => {
      event.preventDefault()
      if (this.toggleModeOptions.classList.contains('pointer-events-none'))
        this.showModeOptions()
      else this.hideModeOptions()
    })

    this.setLightModeBtn.addEventListener('click', (event) => {
      event.preventDefault()
      this.setMode('light')
    })

    this.setDarkModeBtn.addEventListener('click', (event) => {
      event.preventDefault()
      this.setMode('dark')
    })

    this.setSystemModeBtn.addEventListener('click', (event) => {
      event.preventDefault()
      this.setMode('system')
    })
  }

  setMode(mode) {
    if (mode !== 'system') {
      localStorage.setItem('mode', mode)
    } else localStorage.removeItem('mode')
    this.hideModeOptions()
    initThemeMode()
  }

  hideModeOptions() {
    this.toggleModeOptions.classList.remove(...modeOptionsVisible)
    this.toggleModeOptions.classList.add(...modeOptionsHidden)
  }

  showModeOptions() {
    this.toggleModeOptions.classList.remove(...modeOptionsHidden)
    this.toggleModeOptions.classList.add(...modeOptionsVisible)
  }

  handleToggleMenu() {
    const showMenuClasses = [
      'opacity-100',
      'pointer-events-auto',
      'translate-y-0',
    ]
    const hideMenuClasses = [
      'opacity-0',
      'pointer-events-none',
      'translate-y-4',
    ]
    this.toggleMenuBtn.addEventListener('click', (event) => {
      event.preventDefault()
      if (this.mobileMenu.classList.contains('pointer-events-none')) {
        this.mobileMenu.classList.remove(...hideMenuClasses)
        this.mobileMenu.classList.add(...showMenuClasses)
        document.body.style.overflow = 'hidden'
      } else {
        this.mobileMenu.classList.remove(...showMenuClasses)
        this.mobileMenu.classList.add(...hideMenuClasses)
        document.body.style.overflow = 'auto'
      }
    })
  }
}

window.onload = () => {
  initThemeMode()
  document.addEventListener('resize', (event) => {
    alert('resize')
    if (window.innerWidth > 768) {
      document.body.style.overflow = 'auto'
    }
  })
  new Xfolio()
}
