<template>
  <div class="price-elasticity">
    <h1>This is an Price Elasticity page</h1>
    <p v-if="errors.length">
      <b>不正な値が入力されています。</b>
      <ul>
        <li
          v-for="error in errors"
          :key=error.key
          >{{ error.value }}</li>
      </ul>
    </p>
    <p>
      <input
        v-model.lazy="demandChangeRate"
        type="number"
        min="1"
        max="100"
      > % (需要量の変化率)
      ÷
      <input
        v-model.lazy="priceChangeRate"
        type="number"
        min="1"
        max="100"
      > % (価格の変化率)
      <br>
      = {{ elasticity }} (弾性力)
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      demandChangeRate: 1,
      priceChangeRate: 1,
    }
  },
  computed: {
    elasticity() {
      return this.demandChangeRate / this.priceChangeRate
    }
  },
  watch: {
    demandChangeRate() {
      this.errors.forEach((error, index) => {
        if (error.key === 'demandChangeRate') this.errors.splice(index, 1)
      })

      if (this.demandChangeRate > 0 && this.demandChangeRate <= 100 ) {
        return
      }

      this.errors.push({
        key: 'demandChangeRate',
        value: '需要量の変化率は、0 < x <= 100 で入力して下さい。'
      })
    },
    priceChangeRate() {
      this.errors.forEach((error, index) => {
        if (error.key === 'priceChangeRate') this.errors.splice(index, 1)
      })

      if (this.priceChangeRate > 0 && this.priceChangeRate <= 100 ) {
        return
      }

      this.errors.push({
        key: 'priceChangeRate',
        value: '価格の変化率は、0 < x <= 100 で入力して下さい。'
      })
    }
  }
}
</script>
