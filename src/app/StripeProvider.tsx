"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK as string;

const stripePromise = loadStripe(STRIPE_PK);

const StripeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
