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

declare namespace kakao.maps {
  export class Map {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    constructor(container: HTMLElement, options: any);

    setCenter(latlng: LatLng): void;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
  }

  export namespace services {
    export class Places {
      keywordSearch(keyword: string, callback: (result: any[], status: Status) => void): void;
    }

    export enum Status {
      OK,
      ZERO_RESULT,
      ERROR
    }
  }
}