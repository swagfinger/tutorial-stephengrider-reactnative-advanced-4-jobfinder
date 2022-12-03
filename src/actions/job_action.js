import qs from 'qs';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { FETCH_JOBS } from './types';
import JOB_DATA from './IndeedJobData.json';
const JOB_ROUTE_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '', //your own publisher id
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'engineer' //query term for job search
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROUTE_URL}${query}`;
};

export const fetchJobs =
  (region, callback = null) =>
  async (dispatch) => {
    try {
      // redundant steps because the indeed api does not work same as the udemy course.
      //let zip = await Location.reverseGeocodeAsync(region); //indeed api uses (l for query string) needs postal-code..
      //const url = buildJobsUrl(zip);
      //let { data } = await axios.get(url);

      const data = JOB_DATA;
      //console.log(data);
      dispatch({ type: FETCH_JOBS, payload: data });
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };
