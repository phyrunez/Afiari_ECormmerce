// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import axios from 'axios';

// export default function handler(req, res) {
//   const results = [];
//   axios
//     .get(
//       `https://www.openstreetmap.org/geocoder/search_osm_nominatim?query=${req.query.query}`
//     )
//     .then((result) => {
//       const data = result.data;
//       const liList = data.match(/<li.*<\/li>/gi);
//       if (liList) {
//         liList.map((li) => {
//           const extract = {
//             long: '',
//             lat: '',
//             address: '',
//           };
//           if (!/^<li.*<\/li>$/.test(li)) return;
//           let long = li.match(/data-lon.+data-min-lat=/)[0];
//           long = long.replace('data-lon="', '').replace('" data-min-lat=', '');
//           extract.long = long;

//           let lat = li.match(/data-lat.+data-lon=/)[0];
//           lat = lat.replace('data-lat="', '').replace('" data-lon=', '');
//           extract.lat = lat;

//           let address = li.match(/data-name.+data-type=/)[0];
//           address = address
//             .replace('data-name="', '')
//             .replace('" data-type=', '');
//           extract.address = address;
//           results.push(extract);
//         });
//         res.status(200).json(results);
//       }
//     });
//   // res.status(200).json({ name: "John Doe" });
// }
