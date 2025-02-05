"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import "./contact.scss";
import CallbackModal from "@/components/Modal/CallbackModal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error("Erreur de parsing JSON :", err);
        setStatus("Une erreur est survenue lors du traitement de la réponse.");
        return;
      }

      if (response.ok) {
        setStatus("Votre message a été envoyé avec succès !");
        setFormData({ name: "", email: "", message: "", phone: "" });
        setShowPhoneInput(false);
      } else {
        setStatus(
          data.message || "Une erreur s'est produite. Veuillez réessayer."
        );
      }
    } catch (error) {
      setStatus("Erreur inconnue. Veuillez réessayer.");
      throw error;
    }
  };

  return (
    <div className="container">
      <div className="home_conseils_sli">

      <div className="phone_input">
              {showPhoneInput ? (
                <CallbackModal 
                  isOpen={showPhoneInput}
                  onClose={() => setShowPhoneInput(false)}
                />
              ) : (
                <div
                  className="phone_icon"
                  onClick={() => setShowPhoneInput(true)}
                  title="Demander à être rappelé"
                >
                  <FaPhoneAlt />
                  <span>Être rappelé</span>
                </div>
              )}
            </div>

        <div className="home_conseils_sli_left">
          <Image
            className="img_right_side"
            alt="logo_solution_logique_informatique"
            src="/assets/assistance.webp"
            width={500}
            height={300}
          />
            <h2 className="tel">04 50 64 02 33</h2>
        </div>
        <div className="home_conseils_sli_right">
          <h1>Besoin de plus d&apos;informations ?</h1>
          <form className="contact_form" onSubmit={handleSubmit}>
            <div className="form_group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                className="feedback-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                className="feedback-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="feedback-input"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn_submit">
              Envoyer
            </button>
            {status && <p className="form_status">{status}</p>}
          </form>
        </div>
      </div>
      <div className="contact_form_sli">
        <iframe
          title="iframe_sli_map"
          className="google_map_sli"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.5863184807336!2d6.126918815830903!3d45.93956730961823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b8fac0b9e7fbf%3A0x857a5fad72b9eb0!2sSolution%20Logique%20Informatique!5e0!3m2!1sfr!2sfr!4v1651504531648!5m2!1sfr!2sfr"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
