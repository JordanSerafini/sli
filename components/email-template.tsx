import * as React from 'react';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function ContactEmailTemplate({ 
  name, 
  email, 
  phone, 
  message 
}: ContactEmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', margin: '0 0 20px 0' }}>
          Nouveau message de contact depuis le site web
        </h2>
      </div>
      
      <div style={{ backgroundColor: '#ffffff', padding: '20px', border: '1px solid #e9ecef', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#495057' }}>Nom :</strong>
          <span style={{ marginLeft: '10px', color: '#212529' }}>{name}</span>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#495057' }}>Email :</strong>
          <span style={{ marginLeft: '10px', color: '#212529' }}>{email}</span>
        </div>
        
        {phone && (
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#495057' }}>Téléphone :</strong>
            <span style={{ marginLeft: '10px', color: '#212529' }}>{phone}</span>
          </div>
        )}
        
        <div style={{ marginBottom: '20px' }}>
          <strong style={{ color: '#495057' }}>Message :</strong>
          <div style={{ 
            marginTop: '10px', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            borderLeft: '4px solid #007bff',
            color: '#212529',
            lineHeight: '1.6'
          }}>
            {message.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < message.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        borderTop: '1px solid #e9ecef',
        color: '#6c757d',
        fontSize: '14px',
        fontStyle: 'italic'
      }}>
        Envoyé depuis le formulaire de contact du site Solution Logique
      </div>
    </div>
  );
} 