"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import CallbackModal from "@/components/Modal/CallbackModal";
import StatusModal from "@/components/Modal/StatusModal";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  
  // État pour la modal de statut
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showSuccessModal = (message: string) => {
    setStatusModal({
      isOpen: true,
      type: 'success',
      title: 'Message envoyé !',
      message: message
    });
  };

  const showErrorModal = (message: string) => {
    setStatusModal({
      isOpen: true,
      type: 'error',
      title: 'Erreur',
      message: message
    });
  };

  const closeStatusModal = () => {
    setStatusModal({ ...statusModal, isOpen: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation côté client
    if (!formData.name || !formData.email || !formData.message) {
      showErrorModal('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccessModal(data.message || "Votre message a été envoyé avec succès ! Nous vous répondrons rapidement.");
        setFormData({ name: "", email: "", message: "", phone: "" });
      } else {
        showErrorModal(data.message || "Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      showErrorModal("Erreur de connexion. Vérifiez votre connexion internet et réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <Container>
        {/* Modals */}
        {showCallbackModal && (
          <CallbackModal
            isOpen={showCallbackModal}
            onClose={() => setShowCallbackModal(false)}
          />
        )}
        
        <StatusModal
          isOpen={statusModal.isOpen}
          onClose={closeStatusModal}
          type={statusModal.type}
          title={statusModal.title}
          message={statusModal.message}
        />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold !text-blue-900 dark:text-white tracking-widest">Contactez-nous</h1>
          <p className="text-lg !text-blue-900 dark:text-gray-300 mt-2">
            Nous sommes là pour répondre à toutes vos questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="flex flex-col justify-center bg-slate-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Nos Coordonnées</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <FaMapMarkerAlt className="w-6 h-6 mr-4 text-primary" />
                <span>475 Route des Vernes, 74370 Annecy</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaPhoneAlt className="w-6 h-6 mr-4 text-primary" />
                <a href="tel:0450640233" className="hover:text-primary">04 50 64 02 33</a>
              </div>
              <div className="flex items-center text-gray-300">
                <FaEnvelope className="w-6 h-6 mr-4 text-primary" />
                <a href="mailto:site@solution-logique.fr" className="hover:text-primary">site@solution-logique.fr</a>
              </div>
            </div>
            <div className="mt-8">
                <Image
                    className="rounded-lg shadow-xl"
                    alt="Bureau de Solution Logique Informatique"
                    src="/assets/data.png"
                    width={500}
                    height={300}
                />
            </div>
             <div className="mt-8">
                <Button onClick={() => setShowCallbackModal(true)} className="w-full">
                    <FaPhoneAlt className="mr-2"/> Se faire rappeler
                </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nom</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Votre nom complet"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">E-mail</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="votre.email@example.com"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
               <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Téléphone (Optionnel)</label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Votre numéro de téléphone"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm disabled:opacity-50"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Comment pouvons-nous vous aider ?"
                ></textarea>
              </div>
              <div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Google Maps */}
        <div className="mt-12 rounded-lg overflow-hidden shadow-lg">
            <iframe
            title="iframe_sli_map"
            className="w-full h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.5863184807336!2d6.126918815830903!3d45.93956730961823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b8fac0b9e7fbf%3A0x857a5fad72b9eb0!2sSolution%20Logique%20Informatique!5e0!3m2!1sfr!2sfr!4v1651504531648!5m2!1sfr!2sfr"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
      </Container>
    </Section>
  );
}
