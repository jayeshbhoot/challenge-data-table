var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' }
]

var reducer = function (row, acc) {
  // if (row.type === 'impression') acc.impressions = (acc.impressions || 0) + 1

  acc.impressions = (acc.impressions || 0) + (row.type === 'impression' ? 1 : 0)
  acc.loads = (acc.loads || 0) + (row.type === 'load' ? 1 : 0)
  acc.displays = (acc.displays || 0) + (row.type === 'display' ? 1 : 0)
  acc.loadRate = acc.loads / acc.impressions
  acc.displayRate = acc.displays / acc.loads

  return acc
}

var calculations = [
  { title: 'Impressions', value: 'impressions' },
  { title: 'Loads', value: 'loads' },
  { title: 'Displays', value: 'displays' },
  {
    title: 'Load Rate', value: 'loadRate',
    template: function(val, row) {
      return (val * 100).toFixed(1) + '%'
    },
    sortBy: function(row) {
      return row.loadRate
    }
  },
  {
    title: 'Display Rate', value: 'displayRate',
    template: function(val, row) {
      return (val * 100).toFixed(1) + '%'
    },
    sortBy: function(row) {
      return row.displayRate
    }
  }
]

module.exports = createReactClass({
  render() {
    return (<div>
      <ReactPivot rows={rows}
        dimensions={dimensions}
        reduce={reducer}
        calculations={calculations}
        activeDimensions={['Date', 'Host']} />
    </div>)
  }
})
