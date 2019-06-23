new Vue({
  el: '#app',
  data: {
    currencies: {},
    amount: 0,
    from: 'USD',
    to: 'EUR',
    result: null,
    loading: false
  },

  mounted (){
    this.getCurrencies();
  },

  computed: {
    formattedCurrencies() {
      return Object.values(this.currencies);
    },

    disabledConvertButton() {
      return Number(this.amount) === 0 || !this.amount || this.loading;
    }
  },

  methods: {
    getCurrencies() {
      const currencies = localStorage.getItem('currencies');

      if (currencies) {
        this.currencies = JSON.parse(currencies);
        return;
      }

      axios.get('https://free.currconv.com/api/v7/currencies?apiKey=560914efcb47a5dd689c')
        .then(response => {
          this.currencies = response.data.results;
          localStorage.setItem('currencies', JSON.stringify(response.data.results));
        })
    },

    convertCurrency() {
      const key = `${this.from}_${this.to}`;
      this.loading = true;
      axios.get(`https://free.currconv.com/api/v7/convert?apiKey=560914efcb47a5dd689c&q=${key}&compact=y`)
        .then(response => {
          const currencyRate = response.data[key].val;
          this.result = (Number(this.amount) * currencyRate).toFixed(3);
          this.loading = false;
        })
    }
  },

  watch: {
    from() {
      this.result = 0;
    },

    to() {
      this.result = 0;
    }
  }
})
