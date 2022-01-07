import csv from '../assets/basemap/cities.csv?raw'

// D'après Nathan Sebhastian, https://github.com/nsebhastian/javascript-csv-array-example
function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
  }

// Transformer les coordonnées en geojson de type point
// pour utiliser  d3.geoPath et avoir un clipAngle sur certaines projections
function coordToGeoJSON(data) {
  return data.map(d => 
    ({...d,
      coords: ({
        type: "Point",
        coordinates: [d.lon, d.lat]
      })
    })
  )
}
export const cities = csvToArray(csv)