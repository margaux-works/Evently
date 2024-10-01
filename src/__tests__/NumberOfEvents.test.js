/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import { getByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('NumberOfEvents Component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />
    );
  });

  test('renders number of event input with textbox role', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('default number is 32', () => {
    const inputElement = NumberOfEventsComponent.getByTestId(
      'number-of-events-input'
    );
    expect(inputElement).toHaveValue(32);
  });

  test('changes the value of the textbox when a user types in it', async () => {
    const inputElement =
      NumberOfEventsComponent.getByLabelText('Number of Events:');
    await userEvent.type(inputElement, '{backspace}{backspace}10');
    expect(inputElement).toHaveValue(10);
  });
});
