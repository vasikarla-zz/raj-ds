import React from 'react';
import { render } from '@testing-library/react';
import SampleComponent from '.';

describe('SampleComponent', () => {
  test('It matches the snapshot', () => {
    const { container } = render(<SampleComponent />);
    expect(container).toMatchSnapshot();
  });  
});