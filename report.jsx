var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' }
]

var reducer = function (row, acc) {
  // acc.impressions = row.type === 'impression' ? (acc.impressions || 0) : (acc.impressions || 0) + 1
  // acc.impressions = (acc.impressions || 0) + (row.type === 'impression' ? 1 : 0)

  if (row.type === 'impression')
    acc.impressions = (acc.impressions || 0) + 1

  if (row.type === 'load')
    acc.loads = (acc.loads || 0) + 1

  if (row.type === 'display')
    acc.displays = (acc.displays || 0) + 1

  return acc
}

var calculations = [
  { title: 'Impressions', value: 'impressions' },
  { title: 'Loads', value: 'loads' },
  { title: 'Displays', value: 'displays' },
  {
    title: 'Load Rate', value: 'loadRate',
    template: function (val, row) {
      return (row.loads / row.impressions * 100).toFixed(1) + '%'
    },
    sortBy: function (row) {
      return row.loads / row.impressions
    }
  },
  {
    title: 'Display Rate', value: 'displayRate',
    template: function (val, row) {
      return (row.displays / row.loads * 100).toFixed(1) + '%'
    },
    sortBy: function (row) {
      return row.displays / row.loads
    }
  }
]

module.exports = createReactClass({
  render() {
    return (<ReactPivot rows={rows}
      dimensions={dimensions}
      reduce={reducer}
      calculations={calculations}
      activeDimensions={['Date', 'Host']} />)
  }
})
