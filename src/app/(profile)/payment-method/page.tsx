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
import { cn, formatCardExpiryMonth, generateKey } from "@/lib/utils";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";

type Props = {};

const PaymentMethod = ({}: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [addCardMode, setAddCardMode] = useState(false);
  const [cardFieldsFilled, setCardFieldsFilled] = useState(false);

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

  async function handleSubmit() {}

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
            <DialogClose>
              <Button>Annuler</Button>
            </DialogClose>
            <Button
              className={cn(
                !cardFieldsFilled
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-first_orange hover:bg-orange-600",
                "rounded text-white"
              )}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cards list */}
      <div className="my-5 flex flex-col gap-5 md:flex-row md:flex-wrap md:gap-0 md:justify-between md:gap-y-5">
        {paymentMethods.map((paymentMethod) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.02 }}
              key={generateKey()}
              className="w-full md:w-[45%] h-[200px] bg-first_violet rounded text-white p-2"
            >
              <div className="flex w-full justify-between">
                <h1>Card</h1>
                <Trash size={16} className="hover:pointer-cursor" />
              </div>

              <div className="h-1/3 flex items-center justify-between mt-5">
                {/* SIM */}
                <div className="flex">
                  <div className="flex flex-col gap-0.5">
                    <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
                    <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
                    <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
                  </div>
                  <div className="w-[10px] h-[35px] bg-[#ffc300] rounded"></div>
                  <div className="flex flex-col gap-0.5">
                    <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
                    <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
                    <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
                  </div>
                </div>
                <h1 className="text-xl">
                  {formatCardExpiryMonth(paymentMethod.card.expMonth) +
                    "/" +
                    paymentMethod.card.expYear}
                </h1>
              </div>
              <h1 className="text-xl">
                XXXX XXXX XXXX {paymentMethod.card.last4}
              </h1>
              <div className="flex justify-end">
                <h1 className="font-bold text-2xl font-italic">{paymentMethod.card.brand}</h1>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
