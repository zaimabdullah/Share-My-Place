export async function getAddressFromCoords(coords) {
 
  await $.get(location.protocol + `//nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`,
  function(data, responseText) { window.response = data.display_name, window.responseText = responseText });
  
  const responseText = window.responseText;
 
  const address = window.response; //simply storing the data from the function in address
 
  if (responseText != 'success') {
    throw new Error('Failed to fetch address. Please try again!');
  }
  const data = JSON.stringify(address);
  if (data.error_message) {
    throw new Error(data.error_message);
  }
 
  return address;
}

export async function getCoordsFromAddress(address) {
  // const response = await fetch('http://maps.googleapis.com/maps/api/geocode/json?.....);    //not working without Google
 
  await $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+address,  //jquery sintaxed workaround to get the location
  function(data, responseText) { window.response = data[0], window.responseText = responseText }); // I used window. to make both 'response'
  // and 'responseText' available outside the function (global scope). Since the requested data provides more than one possible location, I used '[0]'
  // to work with the first entry (which always worked for me).
  
  const responseText = window.responseText; //storing the response information in a separate variable (see line 17)
 
  const coordinates = {  //creating a new object to store the coordinates outside the function (line 6)
    lng: window.response.lon, //openstreetmap presents longitude as 'lon', this step changes 'lon' to 'lng' to make it compatible with the rest of the code
    lat: window.response.lat, //'lat' remains 'lat'
  }
 
  if (responseText != 'success') { //if successfull, this method (line 6 + 10) shows 'success', not 200-299
    throw new Error('Failed to fetch coordinates. Please try again!');
  }
  const data = JSON.stringify(coordinates); //workaround of response.json()
  if (data.error_message) {
    throw new Error(data.error_message);
  }
 
  // const coordinates = data.results[0].geometry.location;     // this line is already performed beforehand
  return coordinates;
}