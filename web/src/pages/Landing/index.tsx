/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnections(total);
        })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy Logo"/>
                    <h2>Your online platform to study</h2>
                </div>

                <img 
                    src={landingImg} 
                    alt="Landing image" 
                    className="hero-image"
                />
                
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="To study"/>
                        Watch a class
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Give classes"/>
                        Give a class
                    </Link>
                </div>
                <span className="total-connections">
                    {totalConnections} connections at a total <img src={purpleHeartIcon} alt="Purple Heart"/>
                </span>
            </div>
        </div>
    )
}

export default Landing;