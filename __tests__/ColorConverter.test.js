import { render, screen, fireEvent } from '@testing-library/react';
import ColorConverter from '../components/ColorConverter';

// Mock the react-color component
jest.mock('react-color', () => ({
  SketchPicker: (props) => {
    return (
      <div data-testid="sketch-picker">
        <input
          type="text"
          value={props.color}
          onChange={(e) => props.onChangeComplete({ hex: e.target.value })}
        />
      </div>
    );
  },
}));

describe('ColorConverter', () => {
  it('converts HEX to RGB and HSL correctly', () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);

    const hexInput = screen.getByLabelText('HEX');
    const rgbInput = screen.getByLabelText('RGB');
    const hslInput = screen.getByLabelText('HSL');

    fireEvent.change(hexInput, { target: { value: '#FF0000' } }); // Red

    expect(rgbInput).toHaveValue('rgb(255, 0, 0)');
    expect(hslInput).toHaveValue('hsl(0, 100%, 50%)');
  });

  it('converts RGB to HEX correctly', () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);

    const hexInput = screen.getByLabelText('HEX');
    const rgbInput = screen.getByLabelText('RGB');

    fireEvent.change(rgbInput, { target: { value: 'rgb(0, 255, 0)' } }); // Green

    expect(hexInput).toHaveValue('#00ff00');
  });
});
