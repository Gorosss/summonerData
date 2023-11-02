import React, { useState, useEffect } from 'react';

function formatTime(seconds) {
  const minutos = Math.floor(seconds / 60);
  const segundos = seconds % 60;
  return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

export function TimeCounter({ initialTime }) {
  const [tiempo, setTiempo] = useState(initialTime);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(tiempo => tiempo + 1); // Añade 1 segundo al tiempo actual
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  return (
    <>
      {formatTime(tiempo)}
    </>
  );
}

export default TimeCounter;
