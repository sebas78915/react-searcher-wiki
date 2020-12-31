import { act, renderHook } from "@testing-library/react-hooks";
import moxios from 'moxios';
import { useDebounce, useSearch, useSearchForm } from "../hooks";


describe('useSearchForm hook', () => {
  let event1;
  let event2;

  beforeEach(() => {
    event1 = {
      target: {
        value: 'data1'
      }
    }

    event2 = {
      target: {
        value: 'data2'
      }
    }
  })

  it('should update search value', () => {
    const { result } = renderHook(() => useSearchForm());

    act(() => result.current.onSearchChange(event1));
  
    expect(result.current.searchValue).toBe('data1');
    
    act(() => result.current.onSearchChange(event2));
  
    expect(result.current.searchValue).toBe('data2');
  })
})

describe('useDebounce hook', () => {
  it('should return the same value after long delay', () => {
    const expectedResult = 'text';
    const { result } = renderHook(() => useDebounce(expectedResult, 500));

    expect(result.current).toBe(expectedResult);
    
    jest.advanceTimersByTime(510);

    expect(result.current).toBe(expectedResult);
  })

  it('should return the same value before timer is rerached', () => {
    const value1 = 'text1';
    const value2 = 'text2';

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: value1, delay: 500 } }
    )

    expect(result.current).toBe(value1);
    jest.advanceTimersByTime(490);

    rerender({ value: value2 })

    expect(result.current).toBe(value1);
  })
})

describe('useSearch hook', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should return init data - empty articles', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.articles).toEqual([]);
  })
  
  it('Should return init data - IDLE status', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.status).toBe('IDLE');
  })

  it('should have PENDING status when call is started', () => {
    const { result } = renderHook(() => useSearch('michael'));

    expect(result.current.status).toBe('PENDING');
  })

  it('should have SUCCESS status when request is executed', async () => {
    moxios.stubRequest(`https://www.mediawiki.org/w/api.php?origin=*&action=opensearch&search=michael&limit=10`, {
      status: 200,
      responseText: ["michael",["Michael Jackson effect","ResourceLoader/Requirements/Michael Dale"],["",""],["https://www.mediawiki.org/wiki/Michael_Jackson_effect","https://www.mediawiki.org/wiki/ResourceLoader/Requirements/Michael_Dale"]]
    })
    const { result, waitForNextUpdate } = renderHook(() => useSearch('michael'));

    await waitForNextUpdate();

    expect(result.current.status).toBe('SUCCESS');
  })
  
  it('should return articles when call is executed', async () => {
    moxios.stubRequest(`https://www.mediawiki.org/w/api.php?origin=*&action=opensearch&search=michael&limit=10`, {
      status: 200,
      responseText: ["michael",["Michael Jackson effect","ResourceLoader/Requirements/Michael Dale"],["",""],["https://www.mediawiki.org/wiki/Michael_Jackson_effect","https://www.mediawiki.org/wiki/ResourceLoader/Requirements/Michael_Dale"]]
    })
    const { result, waitForNextUpdate } = renderHook(() => useSearch('michael'));

    await waitForNextUpdate();

    expect(result.current.articles).toEqual([{
      id: 'https://www.mediawiki.org/wiki/Michael_Jackson_effect',
      label: 'Michael Jackson effect'
    },
    {
      id: 'https://www.mediawiki.org/wiki/ResourceLoader/Requirements/Michael_Dale',
      label: 'ResourceLoader/Requirements/Michael Dale'
    }]);
  })
  
  it('should return status ERROR when request was failed', async () => {
    moxios.stubRequest(`https://www.mediawiki.org/w/api.php?origin=*&action=opensearch&search=michael&limit=10`, {
      status: 500,
      responseText: ["michael",["Michael Jackson effect","ResourceLoader/Requirements/Michael Dale"],["",""],["https://www.mediawiki.org/wiki/Michael_Jackson_effect","https://www.mediawiki.org/wiki/ResourceLoader/Requirements/Michael_Dale"]]
    })
    const { result, waitForNextUpdate } = renderHook(() => useSearch('michael'));

    await waitForNextUpdate();

    expect(result.current.status).toBe('ERROR');
  })
})