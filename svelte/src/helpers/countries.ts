import axios from "axios";

import type { CountryInfo } from "./_types";

export const getCountry = async (): Promise<CountryInfo[]> => {
  try {
    const res = await axios.get(
      "https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag"
    );
    const countryInfo: CountryInfo[] = await res.data.sort(
      (x: CountryInfo, y: CountryInfo) => {
        if (x.name > y.name) {
          return 1;
        }
        if (x.name < y.name) {
          return -1;
        }
        return 0;
      }
    );
    return countryInfo;
  } catch (e) {
    console.log(e);
  }
};

