import { render } from '@testing-library/react';
import Mastercomponent from './mastercomponent';
describe('Mastercomponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Mastercomponent />);
    expect(baseElement).toBeTruthy();
  });
});
