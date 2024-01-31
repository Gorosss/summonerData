import React from 'react';

import '../css/Footer.css'


export function Footer (){

  return (
    <footer >
      <p>&copy; {new Date().getFullYear()} SummonerData.gg. Todos los derechos reservados.</p>
      {/* Agrega más información o enlaces según sea necesario */}
    </footer>
  );
};

export default Footer;
