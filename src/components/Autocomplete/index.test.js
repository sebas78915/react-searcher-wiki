import React from 'react';
import { shallow } from 'enzyme';
import Autocomplete from '.';

const render = (props) => shallow(<Autocomplete {...props} />)

describe('Autocomplete component', () => {
  let sut;
  let props;

  describe('without props', () => {
    beforeEach(() => {
      sut = render(props);
    });

    it('Should match snapshot', () => {
      expect(sut).toMatchSnapshot();
    })
  })
  
  describe('When articles are passed', () => {
    beforeEach(() => {
      props = {
        articles: [1],
        searchValue: 'search value',
        onSearchChange: jest.fn()
      }
      sut = render(props);
    });

    it('Should match renderMenu snapshot', () => {
      const props = sut.props();

      expect(props.renderMenu()).toMatchSnapshot();
    })
  })

  describe('When articles are NOT passed', () => {
    beforeEach(() => {
      props = {
        articles: null,
        searchValue: 'search value',
        onSearchChange: jest.fn()
      }
      sut = render(props);
    });

    it('Should match renderMenu snapshot', () => {
      const props = sut.props();

      expect(props.renderMenu()).toMatchSnapshot();
    })
  })

  describe('When renderItem prop is called', () => {
    beforeEach(() => {
      sut = render(props);
    });

    describe('When item is highlighted', () => {
      it('Should match renderMenu snapshot', () => {
        const { renderItem } = sut.props();
        const item = {
          id: 1,
          label: 'test'
        }
  
        expect(renderItem(item, true)).toMatchSnapshot();
      })
    })

    describe('When item is NOT highlighted', () => {
      it('Should match renderMenu snapshot', () => {
        const { renderItem } = sut.props();
        const item = {
          id: 1,
          label: 'test'
        }
        expect(renderItem(item, false)).toMatchSnapshot();
      })
    })
    
    describe('When getItemValue is called', () => {
      beforeEach(() => {
        sut = render(props);
      });
      
      it('Should return label', () => {
        const { getItemValue } = sut.props();

        expect(getItemValue({label: 'test'})).toMatchSnapshot();
      })
    })
  })
});