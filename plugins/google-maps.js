import Vue from 'vue'
import cookies from 'js-cookie'
import GmapMarker from 'vue2-google-maps/dist/components/marker'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

const lang = cookies.get('i18n_redirected')
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBdarVlRZOccFIGWJiJ2cFY8-Sr26ibiyY',
    libraries: 'places',
    language: lang
  }
})
Vue.component('GmapAutocomplete', VueGoogleMaps.Autocomplete)
Vue.component('GoogleMap', VueGoogleMaps.Map)
Vue.component('GoogleMaker', GmapMarker)
