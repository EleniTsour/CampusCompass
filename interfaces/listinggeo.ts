export interface ListingGeo {
  type: string;
  geometry: Geometry;
  properties: Properties;
  campus: string;
}

interface Properties {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  point: string[];
}


interface Geometry {
  type: string;
  coordinates: number[];
}
