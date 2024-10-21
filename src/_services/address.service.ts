import axios from "axios";

const URI = process.env.NEXT_PUBLIC_COUNTRY_API_URI;

export async function getCountryStates(
  country: string
): Promise<{ name: string; state_code: string }[] | null> {
  let tries = 5;
  try {
    const response = await axios.post(URI + "/states", { country });
    return response.data.data.states;
  } catch (error) {
    console.log(error);

    tries -= 1;

    if (tries > 0) {
      getCountryStates(country);
    }

    return null;
  }
}

export async function getStateCities(
  country: string,
  state: string
): Promise<string[]> {
  let tries = 5;
  return axios
    .post(URI + "/state/cities", { country, state })
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error);

      tries -= 1;

      if (tries > 0) {
        getStateCities(country, state);
      }

      return null;
    });
}
