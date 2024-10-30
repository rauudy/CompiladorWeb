"use client";

import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import React from 'react';

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [output, setOutput] = useState("");
  const [showReports, setShowReports] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await axios.post('http://localhost:3000/parse', { text: inputText });
      setResponse("Texto analizado correctamente");
      setOutput(result.data.output || "");
    } catch (error) {
      setResponse("Error al analizar el texto");
      const err = error as any;
      setOutput(err.response?.data || err.message);
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setInputText(result);
        }
      };
      reader.readAsText(file);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setResponse("");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInputText("");
    setResponse("");
    setOutput("");
  };

  const toggleReports = () => {
    setShowReports(true); // Mantenerlo visible al entrar
  };

  const hideReports = () => {
    setShowReports(false); // Ocultar al salir
  };

  const handleSave = () => {
    const blob = new Blob([inputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archivo.ci'; // Nombre del archivo a guardar
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Liberar memoria
  };

  const handleSymbolTableClick = () => {
    // Abre la tabla de símbolos en una nueva ventana
    window.open('http://localhost:3000/symbol-table', '_blank');
  };

  return (
    <div className="container">
      <h1 className="title">CompInterpreter</h1>
      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Escribe tu texto aquí" className="textarea" />
      <form onSubmit={handleSubmit} className="form">
        <button type="submit" className="button">EJECUTAR</button>
        <input
          type="file"
          accept=".ci"
          onChange={handleFileInput}
          style={{ display: 'none' }} // Oculta el input
          ref={fileInputRef}
        />
        <button type="button" onClick={handleFileButtonClick} className="button"
          style={{backgroundColor: '#4CAF50', color: 'white'}}
        >CARGAR</button>
        <button type="button" onClick={handleClear} className="button">NUEVO</button>
        <div 
          className={styles.reportesContainer} 
          onMouseEnter={toggleReports} 
          onMouseLeave={hideReports}
        >
          <button type="button" className="button" style={{backgroundColor: '#4CAF50', color: 'white'}}>REPORTES</button>
          {showReports && (
            <div className={styles.reportOptions}>
              <button type="button" className={styles.reportButton} onClick={handleSymbolTableClick}>Tabla de Símbolos</button>
              <button type="button" className={styles.reportButton}>Tabla de Errores</button>
              <button type="button" className={styles.reportButton}>AST</button>
            </div>
          )}
        </div>
        <button type="button" onClick={handleSave} className="button">GUARDAR</button>
      </form>
      {response && <p className="response">{response}</p>}
      <div className="output">
        <h2>Consola:</h2>
        <textarea value={output} readOnly className="textarea" />
      </div>
    </div>
  );
};

export default Home;
