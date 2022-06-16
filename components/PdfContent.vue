<template>
  <section class="pdf-content">
    <section class="report-info">
      <canvas id="canvas" ref="canvas" class="canvas" />
      <ul class="list">
        <li>
          <span>{{ $t('itemNumber') }}:</span>
          <span>{{ item.id }}</span>
        </li>
        <li>
          <span>{{ $t('itemType') }}:</span>
          <span>{{ item.category.name }}</span>
        </li>
        <li v-if="item.storage">
          <span>{{ $t('storagePlace') }}:</span>
          <span>{{ item.storage ? item.storage.name: '-' }}</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    url: ''
  }),
  mounted () {
    const domain = window.location.protocol + '//' + window.location.host
    this.url = domain + '/items/show/' + this.item.id
    setTimeout(() => {
      this.getQRCode()
    }, 100)
  },
  methods: {
    async getQRCode () {
      const options = {
        width: 350,
        height: 350,
        errorCorrectionLevel: 'L',
        type: 'image/png',
        rendererOpts: {
          quality: 1
        }
      }
      /* global QRCode */
      await QRCode.toCanvas(this.$refs.canvas, this.url, options)
    }
  }
}
</script>

<style lang="scss" scoped>
.pdf-content {
  width: 100%;
  background: #fff;
  .report-info {
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 0px;
    justify-content: center;
    align-items: center;
  }
  .list {
    list-style: none;
    padding:0;
    margin:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
    li {
        font-size: 32px;
    }
  }

}
</style>
