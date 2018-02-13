import { getLatestLatLongForDevices } from './helper'

const heartBeats = {
  "-L57lAJBP5kP3xOdOdIj" : {
    "coreid" : "27001a001947363439353035",
    "data" : "{\"geo_code\": \"13.035458,80.217247\",\"battery_percent\":  \"83.68\" }",
    "event" : "Tracker",
    "published_at" : "2018-02-12T06:47:28.006Z"
  },
  "-L57iRjyuOvg2LrP3VBi" : {
    "coreid" : "27001a001947363439353035",
    "data" : "{\"geo_code\": \"13.035458,80.217247\",\"battery_percent\":  \"82.87\" }",
    "event" : "Tracker",
    "published_at" : "2018-02-12T06:35:33.088Z"
  },
  "-L57iu6regO2lXBeQP_P" : {
    "coreid" : "27001a001947363439353035",
    "data" : "{\"geo_code\": \"13.035458,80.217247\",\"battery_percent\":  \"83.03\" }",
    "event" : "Tracker",
    "published_at" : "2018-02-12T06:37:33.321Z"
  },
  "-L57jMI4AUNZFq5j-sdO" : {
    "coreid" : "27001a001947363439353035",
    "data" : "{\"geo_code\": \"13.035458,80.217247\",\"battery_percent\":  \"83.20\" }",
    "event" : "Tracker",
    "published_at" : "2018-02-12T06:39:32.843Z"
  },
  "-L57joao6HaVz4OFbHbt" : {
    "coreid" : "27001a001947363439353035",
    "data" : "{\"geo_code\": \"13.035458,80.217247\",\"battery_percent\":  \"83.20\" }",
    "event" : "Tracker",
    "published_at" : "2018-02-12T06:41:32.844Z"
  },
  "-L57lAJBP4kP3xOEOdIj" : {
    "coreid" : "2d0034000c47363334373734",
    "data" : "{\"geo_code\": \"12.8298467,79.6768836\",\"battery_percent\":\"82.05\" }",
    "event" : "Tracker",
    "published_at" : "2018-02-12T11:29:48.303Z"
  }
}

describe('getLatestLatLongForDevices', () => {
  it('should get latest lat/lng for all devices' , () => {
    expect(getLatestLatLongForDevices(heartBeats)).toEqual([
      {
        "coreid" : "27001a001947363439353035",
        "lat": 13.035458,
        "lng": 80.217247,
        "battery_percent":  83.68,
        "published_at" : "2018-02-12T06:47:28.006Z"
      },
      {
        "coreid" : "2d0034000c47363334373734",
        "lat": 12.8298467,
        "lng": 79.6768836,
        "battery_percent":  82.05,
        "published_at" : "2018-02-12T11:29:48.303Z"
      }
    ])
  });
});
