import React, { useState, useEffect } from 'react';
import sampleMail from '../seeds/sample_mail.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './MainPage.css'

function MainPage() {

  const [emailData, setEmailData] = useState({
      name: '',
      case: '',
      request: '',
      greeting: ''
  });
  const [language, setLanguage] = useState('spanish');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
        ...emailData,
        [name]: value
    });
};

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

  const handleGenerateEmail = async () => {
        setButtonPressed(true);
        setLoading(true);
        if (!emailData.name || !emailData.case || !emailData.request) {
        alert('Porfavor rellenar todos los campos antes de generar un correo.');
        return;
        }
        
        axios.post('http://localhost:8080/generate', 
        {
            "email_data": emailData,
            "language": language
        })
        .then((response) => {
            const content = response.data.content;
            setGeneratedEmail(content);
            setLoading(false);
        })
        .catch((error) => console.error('Error:', error));
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
            <label className={buttonPressed && !emailData.name ? 'required' : ''}>
                Nombre y Apellido:
                <input
                    type="text"
                    name="name"
                    maxLength={30}
                    value={emailData.name}
                    placeholder='Juan Perez'
                    onChange={handleChange} 
                />
            </label>
            <label className={buttonPressed && !emailData.case ? 'required' : ''}>
                Caso/Asunto:
                <input
                    type="text"
                    name="case"
                    maxLength={50}
                    value={emailData.case}
                    placeholder='Solicitud de información'
                    onChange={handleChange}
                />
            </label>
            <label className={buttonPressed && !emailData.request ? 'required' : ''}>
                Solicitud:
                <input
                    name="request"
                    maxLength={100}
                    value={emailData.request}
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
                    <option value={"Buenas noches"}>Buenas noches</option>
                    <option value={"Estimado/a"}>Estimado/a</option>
                    <option value={"Saludos"}>Saludos</option>
                </select>
            </label>
            <label>
                Idiomas:
                <select
                    name="language"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value={"spanish"}>Español</option>
                    <option value={"english"}>Inglés</option>
                    <option value={"french"}>Francés</option>
                    <option value={"german"}>Alemán</option>
                    <option value={"italian"}>Italiano</option>
                    <option value={"portuguese"}>Portugués</option>
                    <option value={"chinese"}>Chino</option>
                    <option value={"japanese"}>Japonés</option>
                </select>
            </label>
            <button onClick={handleGenerateEmail}>Generar Email</button>
        </div>
        <div className="result-column">
            {/* If loading put a loading gif */}
            {loading ? 
            <div className="main-content"><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading" /></div> : 
            <>
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
                        </>
                      : ""
                      }
                </div>
            </>
            }
            </div>
    </div>
  );
}

export default MainPage;