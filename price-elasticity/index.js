class Form {
  constructor(demandChangeRate, priceChangeRate) {
    this.demandChangeRate = demandChangeRate;
    this.priceChangeRate = priceChangeRate;
  }

  isValid(errors) {
    this.validate(errors);

    if (!errors.length) {
      return true;
    } else {
      return false;
    }
  }

  isInValid(errors) {
    this.validate(errors);

    if (errors.length) {
      return true;
    } else {
      return false;
    }
  }

  validate(errors) {
    if (this.demandChangeRate <= 0 || this.demandChangeRate > 100) {
      errors.push({
        key: 'demandChangeRate',
        value: '需要量の変化率は、0 < x <= 100 で入力して下さい。'
      });
    }
    if (this.priceChangeRate <= 0 || this.priceChangeRate > 100) {
      errors.push({
        key: 'priceChangeRate',
        value: '需要量の変化率は、0 < x <= 100 で入力して下さい。'
      });
    }
  }
};

const app = new Vue({
  el: '#app',
  data: {
    errors: [],
    demandChangeRate: 1,
    priceChangeRate: 1,
  },
  computed: {
    elasticity: function() {
      if(this.isInvalid) {
        return 0
      }

      return this.demandChangeRate / this.priceChangeRate
    },
    // わざわざモデルを生成してバリデーションチェックする必要ないけど、ノリでやってしまった。
    isInvalid: function() {
      // FIXME: モデルに移動したい。
      this.errors = [];

      const form = new Form(
        this.demandChangeRate,
        this.priceChangeRate
      )

      return form.isInValid(this.errors)
    }
  }
})
