import React from 'react';

import { Github, LinkedIn } from '../../public/assets/svgs.jsx'


import '../css/Footer.css'


export function Footer() {

    return (
        <footer >
            <p>&copy; {new Date().getFullYear()} SummonerData.gg. All rights reserved.</p>
            <a
                style={{ marginRight: '5px', marginLeft: '20px', textDecoration: 'none', color: 'inherit'}}
                href="https://github.com/Gorosss"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Github /> Github
            </a>


            <a
                style={{ marginRight: '5px', marginLeft: '5px', textDecoration: 'none', color: 'inherit' }}
                href="https://www.linkedin.com/in/jon-gorostegui-martinez-a0571a247/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <LinkedIn /> LinkedIn
            </a>

        </footer>
    );
};

export default Footer;
