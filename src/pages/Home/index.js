import React from 'react';
import Autocomplete from '../../components/Autocomplete';
import Container from '../../components/Container';

const Home = () => {
  return (
    <Container>
      {({ searchValue, onSearchChange, articles }) => (
        <Autocomplete searchValue={searchValue} onSearchChange={onSearchChange} articles={articles} />
      )}
    </Container>
  )
};

export default Home;