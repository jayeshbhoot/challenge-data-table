const React = require('react')
const ReactPivot = require('react-pivot')
const createReactClass = require('create-react-class')

const rows = require('./data.json')

module.exports = createReactClass({
  render() {
    return (<ReactPivot rows={rows}
      dimensions={dimensions}
      reduce={reducer}
      calculations={calculations}
      activeDimensions={['Date', 'Host']} />)
  }
})

const dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' },
  { value: 'uaOS', title: 'OS' },
  { value: 'uaBrowser', title: 'Browser' },
  // tz could have been shown better (UTC+x)
  // if I had found a way to templatize the value (UTC+x) like in calculations.
  // in case I find a way:
  // const hours = val / 60
  // return hours >= 0 ? `UTC-${hours}` : `UTC+${Math.abs(hours)}`
  { value: 'timezoneOffset', title: 'Timezone' }
]

const reducer = function (row, acc) {
  // acc.impressions = (acc.impressions || 0) + (row.type === 'impression' ? 1 : 0)
  if (row.type === 'impression') { acc.impressions = (acc.impressions || 0) + 1 }
  if (row.type === 'load') { acc.loads = (acc.loads || 0) + 1 }
  if (row.type === 'display') { acc.displays = (acc.displays || 0) + 1 }

  return acc
}

const calculations = [
  {
    title: 'Impressions',
    value: 'impressions',
    template: function (val, row) { return `${val || 0}` }
  },
  {
    title: 'Loads',
    value: 'loads',
    template: function (val, row) { return `${val || 0}` }
  },
  {
    title: 'Displays',
    value: 'displays',
    template: function (val, row) { return `${val || 0}` }
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: function (val, row) {
      return templateForPercentVals(row.loads, row.impressions)
    },
    sortBy: function (row) {
      return row.loads / row.impressions
    }
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: function (val, row) {
      return templateForPercentVals(row.displays, row.loads)
    },
    sortBy: function (row) {
      return row.displays / row.loads
    }
  }
]

const templateForPercentVals = function (numerator, denominator) {
  const rate = (numerator / denominator) || 0
  return `${(rate * 100).toFixed(1)}%`
}
