"use client";

import { Input } from "@/components/ui/input";
import { CountrySelector } from "./selectors/CountrySelector";
import { countries } from "./data/countries";
import { UseFormRegister } from "react-hook-form";
import { AddressType } from "@/app/(profile)/profile/page";
import InputError from "../auth/InputError";
import { useEffect, useState } from "react";
import { getCountryStates, getStateCities } from "@/_services/address.service";
import { StateSelector } from "./selectors/StateSelector";
import { CitySelector } from "./selectors/CitySelector";

type Props = {
  addressType?: "" | "billing_" | "shipping_";
  register: UseFormRegister<AddressType>;
  errors?: any;
  onChangeCountry?: (country: string) => void;
  onChangeState?: (value: string) => void;
  onChangeCity?: (value: string) => void;
};

type State = {
  name: string;
  state_code: string;
};

export default function Address({
  register,
  addressType = "",
  onChangeCountry,
  onChangeState,
  onChangeCity,
  errors,
}: Props) {
  const [country, setCountry] = useState<string>("");
  const [states, setStates] = useState<State[]>([]);
  const [state, setState] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const postal_code = (addressType + "postal_code") as
    | "postal_code"
    | "billing_postal_code"
    | "shipping_postal_code";
  useEffect(() => {
    if (country) {
      setStates([]);
      getCountryStates(country).then((data) => {
        if (data) {
          setStates(data);
        }
      });
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      setCities([]);
      getStateCities(country, state).then((data) => {
        if (data) {
          setCities(data);
        }
      });
    }
  }, [country, state]);

  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-5">
      {/* Address */}
      <div className="space-y-2">
        <label htmlFor={addressType + "address"}>Adresse</label>
        <Input
          id={addressType + "address"}
          className="rounded"
          placeholder="Votre adresse"
          {...register(
            (addressType + "address") as
              | "address"
              | "shipping_address"
              | "billing_address"
          )}
        />
        {errors && errors[addressType + "address"] && (
          <InputError message={errors[addressType + "address"].message} />
        )}
      </div>

      {/* Country */}
      <div className="space-y-2">
        <label>Pays</label>
        <CountrySelector
          countries={countries}
          onChange={(value: string) => {
            setCountry(value);
            onChangeCountry && onChangeCountry(value);
          }}
        />
        {errors && errors[addressType + "country"] && (
          <InputError message={errors[addressType + "country"].message} />
        )}
      </div>

      {/* Province */}
      <div className="space-y-2">
        <label>Province</label>
        <StateSelector
          states={states}
          onChange={(state) => {
            setState(state);
            onChangeState && onChangeState(state);
          }}
        />
        {errors && errors[addressType + "province"] && (
          <InputError message={errors[addressType + "province"].message} />
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <label>Ville</label>
        <CitySelector
          cities={cities}
          onChange={(city) => {
            onChangeCity && onChangeCity(city);
          }}
        />
        {errors && errors[addressType + "city"] && (
          <InputError message={errors[addressType + "city"].message} />
        )}
      </div>

      {/* Zip Code */}
      <div className="space-y-2">
        <label>Adresse postale</label>
        <Input
          className="rounded"
          placeholder="Votre adresse postale"
          {...register(postal_code)}
        />
        {errors && errors[addressType + "postal_code"] && (
          <InputError message={errors[addressType + "postal_code"].message} />
        )}
      </div>
    </div>
  );
}
