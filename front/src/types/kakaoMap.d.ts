export interface Place {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  x: string; // longitude
  y: string; // latitude
}

export interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface KakaoMapResponse {
  meta: Meta;
  documents: Place[];
}