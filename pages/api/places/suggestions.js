// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default function handler(req, res) {
  const results = [];
  axios
    .get(
      `https://www.openstreetmap.org/geocoder/search_osm_nominatim?query=${req.query.query}`
    )
    .then((result) => {
      const data = result.data;
      const liList = data.match(/<li.*<\/li>/gi);
      if (liList) {
        liList.map((li) => {
          const extract = {
            coords: {
              longitude: 0,
              latitude: 0,
            },
            label: '',
          };
          if (!/^<li.*<\/li>$/.test(li)) return;
          let long = li.match(/data-lon.+data-min-lat=/)[0];
          long = long.replace('data-lon="', '').replace('" data-min-lat=', '');
          extract.coords.longitude = long;

          let lat = li.match(/data-lat.+data-lon=/)[0];
          lat = lat.replace('data-lat="', '').replace('" data-lon=', '');
          extract.coords.latitiude = lat;

          let address = li.match(/data-name.+data-type=/)[0];
          address = address
            .replace('data-name="', '')
            .replace('" data-type=', '');
          extract.label = address;
          results.push(extract);
        });
        res.status(200).json(results);
      }
    });
}
