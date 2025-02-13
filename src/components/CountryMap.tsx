import React from "react";
import dynamic from "next/dynamic";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

import { worldMill } from "@react-jvectormap/world";

interface CountryMapProps {
  mapColor?: string;
}

type MarkerStyle = {
  initial: {
    fill: string;
    r: number;
  };
};

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
};

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="black"
      markerStyle={{
        initial: {
          fill: "#106a2e",
          r: 5,
        },
      } as MarkerStyle}
      markersSelectable={true}
      markers={
        [
          {
            latLng: [37.2580397, -104.657039],
            name: "United States",
            style: {
              fill: "#106a2e",
              borderWidth: 1,
              borderColor: "white",
              stroke: "#383f47",
            },
          },
          {
            latLng: [20.7504374, 73.7276105],
            name: "India",
            style: { 
              fill: "#106a2e", 
              borderWidth: 1, 
              borderColor: "white" 
            },
          },
          {
            latLng: [53.613, -11.6368],
            name: "United Kingdom",
            style: { 
              fill: "#106a2e", 
              borderWidth: 1, 
              borderColor: "white" 
            },
          },
          {
            latLng: [-25.0304388, 115.2092761],
            name: "Sweden",
            style: {
              fill: "#106a2e",
              borderWidth: 1,
              borderColor: "white",
              strokeOpacity: 0,
            },
          },
        ] as Marker[]
      }
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#2d2d2d",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "#106a2e",
          strokeWidth: 0.5,
          strokeOpacity: 0.5,
        },
        hover: {
          fillOpacity: 0.8,
          cursor: "pointer",
          fill: "#106a2e",
          stroke: "white",
        },
        selected: {
          fill: "#106a2e",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#ffffff",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {
          fill: "#ffffff"
        },
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;