import React, { useState, useEffect } from 'react';
import sampleMail from '../seeds/sample_mail.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './MainPage.css'

function MainPage() {

  const [emailData, setEmailData] = useState({
      recipient: '',
      subject: '',
      body: '',
      greeting: 'Hola'
  });
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
        ...emailData,
        [name]: value
    });
};

  const handleGenerateEmail = async () => {
      // Mock using the sample mail
      setButtonPressed(true);
      if (!emailData.recipient || !emailData.subject || !emailData.body) {
        alert('Porfavor rellenar todos los campos antes de generar un correo.');
        return;
      }
      setGeneratedEmail(sampleMail[emailData.greeting]);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail)
        .then(() => alert('Mail copiado a portapapeles!'))
        .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="main-content">
        <div className="input-column">
            <h2>Crear Email</h2>
            <label className={buttonPressed && !emailData.recipient ? 'required' : ''}>
                Nombre y Apellido:
                <input
                    type="text"
                    name="recipient"
                    maxLength={30}
                    value={emailData.recipient}
                    placeholder='Juan Perez'
                    onChange={handleChange} 
                />
            </label>
            <label className={buttonPressed && !emailData.subject ? 'required' : ''}>
                Asunto:
                <input
                    type="text"
                    name="subject"
                    maxLength={50}
                    value={emailData.subject}
                    placeholder='Solicitud de información'
                    onChange={handleChange}
                />
            </label>
            <label className={buttonPressed && !emailData.body ? 'required' : ''}>
                Solicitud:
                <input
                    name="body"
                    maxLength={60}
                    value={emailData.body}
                    placeholder='Quisiera solicitar información sobre...'
                    onChange={handleChange}
                />
            </label>
            <label>
                Saludo:
                <select
                    name="greeting"
                    value={emailData.greeting}
                    onChange={handleChange}
                >
                    <option value={"Hola"}>Hola</option>
                    <option value={"Buenos dias"}>Buenos días</option>
                    <option value={"Buenas tardes"}>Buenas tardes</option>
                    <option value={"Estimad@"}>Estimad@</option>
                    <option value={"Saludos Cordiales"}>Saludos Cordiales</option>
                </select>
            </label>
            <button onClick={handleGenerateEmail}>Generar Email</button>
        </div>
        <div className="result-column">
                <h2>Email Generado</h2>
                <div className="generated-email">
                <div className="copy-bar">
                    <button className="copy-btn" onClick={handleCopyToClipboard}>
                        <FontAwesomeIcon icon={faCopy} /> Copiar
                    </button>
                </div>
                    { generatedEmail
                      ? <>
                          <p>{generatedEmail}</p>
                          <button onClick={handleGenerateEmail}>Recrear Email</button>
                        </>
                      : ""
                      }
                </div>
            </div>
    </div>
  );
}

export default MainPage;