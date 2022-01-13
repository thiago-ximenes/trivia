import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img
          width="50%"
          src="https://image.freepik.com/vetores-gratis/personagem-de-troll-bonito-de-pijama-azul-em-pe-e-segurando-a-lanterna-de-oleo-no-backround-do-campo-de-ilustracao-de-morango-estilo-cartoon_223337-418.jpg"
          alt="troll"
          data-testid="header-profile-picture"
        />
        <h2
          data-testid="header-player-name"
        >
          Troll
        </h2>
        <p
          data-testid="header-score"
        >
          0
        </p>
      </header>
    );
  }
}

export default Header;
