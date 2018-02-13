import _ from 'lodash';

export function getLatestLatLongForDevices(heartBeats) {
  return _(heartBeats)
    .values()
    .groupBy('coreid')
    .values()
    .map(ds => ds.map(d => {
      const jsonData = JSON.parse(d.data)
      const [ lat, lng ] = jsonData.geo_code.split(",");
      return {
        battery_percent: Number(jsonData.battery_percent),
        coreid: d.coreid,
        published_at: d.published_at,
        lat: Number(lat),
        lng: Number(lng)
      }
    }))
    .map(ds => _.sortBy(ds, d => -Date.parse(d.published_at)))
    .map(ds => _.head(ds))
    .flatten()
    .value()
}
