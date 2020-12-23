import React from 'react';
import Autocomplete from '../../components/Autocomplete';
import Container from '../../components/Container';
import ListItem from '../../components/ListItem';
import { useSearch } from '../../hooks';

const Search = ({...props}) => {
  const search = props.location.search;
  const params = new URLSearchParams(search);
  const query = params.get('query');

  const { articles, status } = useSearch(query, 50);

  return (
    <div>
      <Container>
        {({ searchValue, onSearchChange, articles }) => (
          <Autocomplete searchValue={searchValue} onSearchChange={onSearchChange} articles={articles} />
        )}
      </Container>

      {!articles.length && status === "SUCCESS"
        ? <h3>No articles for query: {query}</h3>
        : articles.map(article => <ListItem {...article} key={article.id} />)
      }
    </div>
  )
};

export default Search;