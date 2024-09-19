"use client";

import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn, generateKey } from "@/lib/utils";
import Card, { PMCard } from "../_components/Card";
import { StripeCardElement } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import ProgressButton from "@/components/ui/progress-button";

type Props = {};

const PaymentMethod = ({}: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [addCardMode, setAddCardMode] = useState(false);
  const [cardFieldsFilled, setCardFieldsFilled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      paymentMethodId: "gscghdhJhqjhhjsknKkSAJSJAKJKJkxjkJK",
      card: {
        brand: "visa",
        country: "US",
        expMonth: 1,
        expYear: 26,
        last4: 4242,
      },
    },
    {
      paymentMethodId: "gscghdhJhqjhhjsknKkSAJSJAKJKJkxjkJK",
      card: {
        brand: "visa",
        country: "US",
        expMonth: 1,
        expYear: 26,
        last4: 4242,
      },
    },
    {
      paymentMethodId: "gscghdhJhqjhhjsknKkSAJSJAKJKJkxjkJK",
      card: {
        brand: "visa",
        country: "US",
        expMonth: 1,
        expYear: 26,
        last4: 4242,
      },
    },
    {
      paymentMethodId: "gscghdhJhqjhhjsknKkSAJSJAKJKJkxjkJK",
      card: {
        brand: "visa",
        country: "US",
        expMonth: 1,
        expYear: 26,
        last4: 4242,
      },
    },
    {
      paymentMethodId: "gscghdhJhqjhhjsknKkSAJSJAKJKJkxjkJK",
      card: {
        brand: "visa",
        country: "US",
        expMonth: 1,
        expYear: 26,
        last4: 4242,
      },
    },
  ];

  async function handleSubmit() {
    if (!stripe || !elements) return null;

    setIsProcessing(true);

    let paymentMethod: { paymentMethodId: string; card: PMCard };

    const cardElement = elements.getElement(CardElement) as StripeCardElement;

    const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      setIsProcessing(false);
    }

    if (pm) {
      paymentMethod = {
        paymentMethodId: pm.id,
        card: {
          brand: pm.card?.brand as string,
          country: pm.card?.country as string,
          expMonth: pm.card?.exp_month as number,
          expYear: pm.card?.exp_year as number,
          last4: Number(pm.card?.last4 as string),
        },
      };

      console.log({ paymentMethod });
      // TODO: Send data to the backend
      toast.success(
        "Moyen de paiement ajouté avec succès: " +
          paymentMethod.paymentMethodId,
        { hideProgressBar: true }
      );
      setIsProcessing(false);
      setAddCardMode(false);
    }
  }

  return (
    <div className="grow flex flex-col min-h-screen md:px-20 px-5 py-5">
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <h1 className="md:text-3xl text-2xl text-center md:text-start font-bold text-first_violet">
          Moyens de paiement
        </h1>

        <Button
          className="bg-[#E35E074D] p-2 rounded mt-5 md:mt-0 hover:bg-[#E35E07] hover:text-white transition-colors duration-500"
          onClick={() => setAddCardMode(true)}
        >
          Ajouter une carte
        </Button>
      </div>

      {/* Add a card */}
      <Dialog open={addCardMode} onOpenChange={(val) => setAddCardMode(val)}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Moyen de paiement</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau moyen de paiement pour votre compte
            </DialogDescription>
          </DialogHeader>
          <hr />
          <CardElement
            className="py-2 rounded"
            onChange={(e) => {
              setCardFieldsFilled(e.complete);
            }}
          />
          <hr />
          <DialogFooter>
            {!isProcessing && (
              <DialogClose>
                <Button>Annuler</Button>
              </DialogClose>
            )}
            {isProcessing ? (
              <ProgressButton />
            ) : (
              <Button
                className={cn(
                  !cardFieldsFilled
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-first_orange hover:bg-orange-600",
                  "rounded text-white"
                )}
                onClick={handleSubmit}
              >
                Enregistrer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cards list */}
      <div className="my-5 flex flex-col gap-5 md:flex-row md:flex-wrap md:gap-0 md:justify-between md:gap-y-5">
        {paymentMethods.map((paymentMethod) => {
          return <Card key={generateKey()} card={paymentMethod.card} />;
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
