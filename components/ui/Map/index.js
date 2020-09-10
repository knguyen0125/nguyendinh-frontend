import React, {useEffect, useState} from "react";
import GoogleMapReact from "google-map-react";
import API from "../../../utils/api";
import DefaultLayout from "../../layout/DefaultLayout";
import {kebabCase} from "lodash";
import {get} from "@theme-ui/css";



const Marker = ({ text }) => {
  return <div>{text}</div>;
};

var shape = {
  coords: [0, 0, 100, 100],
  type: "rect",
};


const Map = ({
    layout,
    defaultCenter = { lat: 21.0288012, lng: 105.7983287 },
    defaultZoom = 15,
}) => {

  const markers = layout.siteData["mapOptions"];

  const apiKey =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
      : undefined;

  const renderMarkers = (map, maps) => {
    markers.map((marker) => {
      const image = {
        url:
          "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless2.png",
        // This marker is 20 pixels wide by 32 pixels high.
        // size: new maps.Size(100, 100),
        // The origin for this image is (0, 0).
        origin: new maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new maps.Point(0, 32),
        labelOrigin: new maps.Point(0, 50),
      };
      let m = new maps.Marker({
        position: { lat: marker.latitude, lng: marker.longtitude },
        map,
        label: marker.name,
        animation: maps.Animation.DROP,
        shape: shape,
        icon: maps,
      });

      const inforWindow = new maps.InfoWindow({
        content: "Test",
        position: { lat: marker.latitude, lng: marker.longtitude },
      });

      m.addListener("click", () => {
        inforWindow.open(map, m);
      });

      return m;
    });
  };

  return (
    <div style={{ height: '100vh', width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={apiKey ? { key: apiKey } : undefined}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >
        {/*{markers.map((marker) => (*/}
        {/*  <Marker lat={marker.lat} lng={marker.lng} text={marker.text} />*/}
        {/*))}*/}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
