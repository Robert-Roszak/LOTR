import React from 'react';
import { shallow } from 'enzyme';
import { QuoteComponent } from './Quote';

describe('Component Quote', () => {
  it('should render without crashing', () => {
    const quote = {};
    const component = shallow(<QuoteComponent quote={quote}/>);
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<QuoteComponent />)).toThrow();
  });

  it('should render correct quote', () => {
    const quote = {
      quote: 'NO!',
    };
    const expectedQuote = quote.quote;
    const component = shallow(<QuoteComponent quote={quote} />);
    const renderedQuote = component.find('blockquote').text();
    expect(renderedQuote).toEqual(expectedQuote);
  });


  it('should render correct character and movie', () => {
    const quote = {
      character: 'Frodo',
      movie: 'Two towers',
    };
    const expectedRender = `- ${quote.character}, ${quote.movie}`;
    const component = shallow(<QuoteComponent quote={quote} />);
    const renderedText = component.find('cite').text();
    expect(renderedText).toEqual(expectedRender);
  });
});
