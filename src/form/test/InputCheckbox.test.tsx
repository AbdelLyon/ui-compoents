import { render, fireEvent, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { InputCheckbox } from '../../form/InputCheckbox';

it('renders checkbox with label', () => {
	const label = 'I agree to the terms and conditions';
	render(<InputCheckbox label={label} />);
	const labelElement = screen.getByText(label);
	expect(labelElement).toBeInTheDocument();
});

it('should have checkbox initially unchecked', () => {
	render(<InputCheckbox label='Checkbox' />);
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

it('should toggle checkbox state on click', () => {
	render(<InputCheckbox label='Checkbox' />);
	const checkbox = screen.getByRole('checkbox');

	fireEvent.click(checkbox);
	expect(checkbox).toBeChecked();

	fireEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
});
