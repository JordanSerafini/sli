import React, { useState } from 'react';

const CallbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [phoneNumber, setPhoneNumber] = useState("");

    if (!isOpen) return null;
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
      <>
        <div className="modal_overlay" onClick={onClose} />
        
        <div className="callback_modal">
            <h2>Demande de rappel</h2>
            <form onSubmit={handleSubmit}>
                <div className="form_group">
                    <label htmlFor="phone">Votre numéro de téléphone</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="04 50 XX XX XX"
                        required
                    />
                </div>
                <div className="button_group">
                    <button type="submit" className="btn_submit">Envoyer</button>
                    <button type="button" className="btn_cancel" onClick={onClose}>Annuler</button>
                </div>
            </form>
        </div>
      </>
    );
};

export default CallbackModal;