'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const CloseAccount: React.FC = () => {
  const [isTemporaryCloseOpen, setIsTemporaryCloseOpen] = useState(false)
  const [isPermanentCloseOpen, setIsPermanentCloseOpen] = useState(false)

  const handleTemporaryClose = () => {
    console.log("Compte fermé temporairement")
    setIsTemporaryCloseOpen(false)
  }

  const handlePermanentClose = () => {
    console.log("Compte fermé définitivement et données supprimées")
    setIsPermanentCloseOpen(false)
  }

  return (
    <div className="container mx-auto px-4 md:px-20 py-8 flex flex-col gap-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-first_violet">
          Fermer votre compte et supprimer vos données
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <Dialog open={isTemporaryCloseOpen} onOpenChange={setIsTemporaryCloseOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="w-full md:w-auto bg-first_orange hover:bg-white hover:text-first_orange text-white rounded-xl transition duration-300 shadow-md hover:shadow-lg"
            >
              Fermer mon compte temporairement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Fermeture temporaire du compte</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir fermer temporairement votre compte ? Vous pourrez le réactiver à tout moment.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button className='rounded' variant="outline" onClick={() => setIsTemporaryCloseOpen(false)}>Annuler</Button>
              <Button onClick={handleTemporaryClose} className="bg-first_orange hover:bg-first_orange/90 text-white rounded">Confirmer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isPermanentCloseOpen} onOpenChange={setIsPermanentCloseOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              variant='outline'
              className="w-full md:w-auto border-2 border-blue-500 bg-white hover:bg-first_orange hover:border-none text-first_orange hover:text-white rounded-xl transition duration-300 shadow-md hover:shadow-lg"
            >
              Fermer définitivement mon compte et supprimer mes données
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Fermeture définitive du compte</DialogTitle>
              <DialogDescription>
                Attention ! Cette action est irréversible. Toutes vos données seront supprimées définitivement. Êtes-vous absolument sûr de vouloir procéder ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button className='rounded' variant="outline" onClick={() => setIsPermanentCloseOpen(false)}>Annuler</Button>
              <Button onClick={handlePermanentClose} className="bg-red-600 hover:bg-red-700 text-white rounded">Supprimer définitivement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CloseAccount