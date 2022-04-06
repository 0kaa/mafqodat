export default function ({ app, $axios, $storage, $vuetify }) {
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    $axios.setHeader('Accept-Language', $storage.getUniversal('i18n_redirected'))
    $vuetify.rtl = $storage.getUniversal('i18n_redirected') === 'ar'
  }
}
