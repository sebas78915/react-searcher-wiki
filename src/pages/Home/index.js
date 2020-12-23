import React from 'react';
import Autocomplete from '../../components/Autocomplete';
import Container from '../../components/Container';

import './styles.scss';

const Home = () => {
  return (
    <div className="home-page-container">
      <img src="./logo.png" alt="logo" />
      <Container>
        {({ searchValue, onSearchChange, articles }) => (
          <Autocomplete searchValue={searchValue} onSearchChange={onSearchChange} articles={articles} />
        )}
      </Container>
    </div>
  )
};

export default Home;