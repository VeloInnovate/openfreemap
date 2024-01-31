const pricingList = '__PRICING_JSON__'
const pricingObj = Object.fromEntries(pricingList.map(item => [item.price, item]))
const priceNumbers = pricingList.map(i => i.price)

const slider = document.getElementById('support-plans-slider')

const tooltipFormat = {
  to: function (value) {
    const price = pricingList[value]
    const url = `https://support.openfreemap.org/checkout/buy/${price.lm_url}?media=0&desc=0&discount=0`
    return `
        <div class="plan-name">${price.name} Plan</div>
        <div>$${price.price}/month</div>
        <div>
          <a class="plan-link" href="${url}">Subscribe</a>
        </div>
        `
  },
}

const pipFormat = {
  to: function (value) {
    return pricingList[value].icon
  },
}

const pricingSlider = noUiSlider.create(slider, {
  start: 3,
  range: { min: 0, max: priceNumbers.length - 1 },
  step: 1,
  tooltips: tooltipFormat,
  pips: { mode: 'count', values: priceNumbers.length, format: pipFormat, density: -1 },
})

pricingSlider.on('update', function (values, _) {
  for (const e of slider.querySelectorAll('.noUi-value')) {
    e.classList.remove('active')
  }

  const value = parseInt(values[0])
  const el = slider.querySelector('.noUi-value[data-value="' + value + '"]')
  el.classList.add('active')
})
