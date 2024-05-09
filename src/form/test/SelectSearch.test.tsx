import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SelectSearch } from '../../form';
describe('SelectSearch', () => {
	it('should render without crashing', () => {
		render(
			<SelectSearch options={[]} onSelectChange={vi.fn()} selectionKeys={[]} />
		);
	});

	it('should render the select input with placeholder', () => {
		render(
			<SelectSearch
				options={[]}
				onSelectChange={() => {}}
				selectionKeys={[]}
				placeholder='Placeholder'
				value=''
			/>
		);
		const select = screen.getByTestId('select-element');
		expect(select).toBeInTheDocument();
	});

	it('should render the select input with correct attributes', () => {
		render(
			<SelectSearch
				options={[]}
				onSelectChange={() => {}}
				selectionKeys={[]}
				placeholder='Placeholder'
				value=''
			/>
		);

		const select = screen.getByTestId('select-element');
		expect(select.firstChild).toHaveAttribute('aria-controls', 'radix-:r2:');
		expect(select.firstChild).toHaveAttribute('aria-expanded', 'false');
		expect(select.firstChild).toHaveAttribute('aria-haspopup', 'dialog');
		expect(select.firstChild).toHaveClass(
			' flex h-11 cursor-pointer items-center justify-between rounded-md border border-border bg-transparent px-3'
		);

		('99%');
		expect(select.firstChild).toContainHTML(
			'<p class="truncate text-[13px] text-muted-foreground opacity-50">Placeholder</p>'
		);
	});
});
