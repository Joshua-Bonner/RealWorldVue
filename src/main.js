import App from './App.vue'
import { router } from './router'
import { store } from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'nprogress/nprogress.css'
import { createApp } from 'vue'

const app = createApp(App)

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})

app.use(router).use(store).mount('#app')
