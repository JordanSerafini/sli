"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import CallbackModal from "@/components/Modal/CallbackModal";
import StatusModal from "@/components/Modal/StatusModal";
import { ModernButton } from "@/components/ui/modernButton";
import { Input } from "@/components/ui/Input";
import { ModernCard } from "@/components/ui/modernCard";
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
    } catch {
      showErrorModal("Erreur de connexion. Vérifiez votre connexion internet et réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section background="subtle" padding="lg">
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

        {/* Header modernisé */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Contactez-nous
          </h1>
          <p className="text-lg text-foreground-muted mt-4 max-w-2xl mx-auto">
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <ModernCard variant="elevated" size="lg">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Nos Coordonnées</h2>
              
              <div className="space-y-4">
                <div className="flex items-center text-foreground-muted hover:text-foreground transition-colors">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <FaMapMarkerAlt className="w-5 h-5 text-primary-600" />
                  </div>
                  <span>475 Route des Vernes, 74370 Annecy</span>
                </div>
                
                <div className="flex items-center text-foreground-muted hover:text-foreground transition-colors">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                    <FaPhoneAlt className="w-5 h-5 text-accent-600" />
                  </div>
                  <a href="tel:0450640233" className="hover:text-primary-600 transition-colors">
                    04 50 64 02 33
                  </a>
                </div>
                
                <div className="flex items-center text-foreground-muted hover:text-foreground transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <FaEnvelope className="w-5 h-5 text-blue-600" />
                  </div>
                  <a href="mailto:site@solution-logique.fr" className="hover:text-primary-600 transition-colors">
                    site@solution-logique.fr
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                <Image
                  className="rounded-xl shadow-md w-full"
                  alt="Bureau de Solution Logique Informatique"
                  src="/assets/data.png"
                  width={500}
                  height={300}
                />
              </div>
              
              <div className="mt-6">
                <ModernButton 
                  onClick={() => setShowCallbackModal(true)} 
                  variant="accent"
                  size="lg"
                  className="w-full"
                  icon={<FaPhoneAlt />}
                  iconPosition="left"
                >
                  Se faire rappeler
                </ModernButton>
              </div>
            </div>
          </ModernCard>

          {/* Contact Form */}
          <ModernCard variant="elevated" size="lg">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Votre nom complet"
                    className="bg-white border-border text-foreground placeholder:text-foreground-subtle"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    E-mail *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="votre.email@example.com"
                    className="bg-white border-border text-foreground placeholder:text-foreground-subtle"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Téléphone (Optionnel)
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="Votre numéro de téléphone"
                    className="bg-white border-border text-foreground placeholder:text-foreground-subtle"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-border rounded-lg shadow-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:opacity-50 transition-colors"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                </div>
                
                                 <div>
                   <ModernButton 
                     type="submit" 
                     variant="primary"
                     size="lg"
                     className="w-full" 
                     disabled={isLoading}
                     loading={isLoading}
                   >
                     Envoyer le message
                   </ModernButton>
                 </div>
              </form>
            </div>
          </ModernCard>
        </div>
        
        {/* Google Maps modernisé */}
        <div className="mt-12">
          <ModernCard variant="elevated" className="overflow-hidden p-0">
            <iframe
              title="iframe_sli_map"
              className="w-full h-96"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.5863184807336!2d6.126918815830903!3d45.93956730961823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b8fac0b9e7fbf%3A0x857a5fad72b9eb0!2sSolution%20Logique%20Informatique!5e0!3m2!1sfr!2sfr!4v1651504531648!5m2!1sfr!2sfr"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </ModernCard>
        </div>
      </Container>
    </Section>
  );
}
