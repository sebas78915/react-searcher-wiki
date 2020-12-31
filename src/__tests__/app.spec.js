import React from 'react';
import { mount } from 'enzyme';

import App from '../App';
import { MemoryRouter } from 'react-router-dom';

const render = (initialEntries) => mount(<MemoryRouter keyLength={0} initialEntries={initialEntries}><App /></MemoryRouter>) 

describe('App component', () => {
  let sut;

  describe('when home page is rendered', () => {
    beforeEach(() => {
      sut = render(['/']);
    })
    
    it('should match home page snapshot', () => {
      expect(sut).toMatchSnapshot();
    })
  })
  
  describe('when not found page is rendered', () => {
    beforeEach(() => {
      sut = render(['/dsavs']);
    })
    
    it('should match not found page snapshot', () => {
      expect(sut).toMatchSnapshot();
    })
  })

})