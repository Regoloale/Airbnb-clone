import { useState } from 'react';
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResult }) {
    const [selectedLocation, setSelectedLocation] = useState({});

      // Transform searchResult object into the object which geolib need (see docs)
      const coordinates = searchResult.map(result => ({
          longitude: result.long,
          latitude: result.lat
      }));
      
      // Latitude and longitude of the coordinates we provided in coordinates const 
      const center = getCenter(coordinates);

      const [viewport, setViewport] = useState({
        width: "100%", // width of the map inside its container
        height: "100%", // height of the map inside its container
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
      });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/aleregolo/ckty3ba4m0mp917rzhtlrpz3j"
            mapboxApiAccessToken={process.env.mapbox_key} //in localhost this load the all enviroment variables set, in production we need to create a special file to store it
            {...viewport} //this will import all the object's elements of the const viewport 
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >

            {searchResult.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            role='image'
                            className="cursor-pointer text-2xl animate-bounce"
                            onClick={() => setSelectedLocation(result)}
                            aria-label="push-pin"
                        >
                            📌
                        </p>

                    </Marker>

                    {/* Popup which show only when we click on marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}

                </div>
            ))}

        </ReactMapGL>
    )
}

export default Map
