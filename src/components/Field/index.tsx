import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

export type InputTypes = 'text' | 'date' | 'number' | 'hidden' | 'checkbox';

interface IHtmlField {
	name: string;
	id?: string;
	value?: string | number;
	checked?: boolean;
	disabled?: boolean;
}

interface IFieldProps extends IHtmlField {

	type : InputTypes;
	label?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	sided?: boolean;
}

export const FieldSet = styled.div<{ sided?: boolean; padded?: boolean }>`
	display: flex;
	flex-direction: ${(p) => p.sided ? 'row' : 'column' };
	flex: 1;
	font-size: 11px;

	@media (min-width: 769px) {
		&:not(:last-child) {
			margin-bottom: 1em;
		}
	}

	input[type="checkbox"] {
		margin-right: 0.5em;
	}

	${({ padded }) => padded && css`margin: 1em 0;`}
	${({ sided }) => sided
		? css`
			align-items: center;
			>* :not(:first-child) {
				margin-left: 0.75em;
			}
		`
		: css`
			>:not(input[type="checkbox"]) {
				width: inherit;
				&:not(:first-child) {
					margin-top: 0.25em;
				}
			}
		`
};
`;

export const FieldLabel = styled.label`
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const FieldInput = styled.input`
	border: 1px solid ${({ theme }) => theme.colors.tertiary };
	line-height: 1.25;
	padding: 3px 8px;
	border-radius: 2px;
	outline: none;

	&:hover {
		border-color: ${({ theme }) => theme.colors.tertiary };
	}
`;

export function Field (props: IFieldProps): React.ReactElement<any> {
	const { label, sided, ...rest } = props;

	const fields: React.ReactNode[] = [];
	const isCheckbox = rest.type === 'checkbox';
	const id = rest.id ?? rest.name;

	if (label) {
		fields.push(
			<FieldLabel
				htmlFor={id}
				title={label}
				key={`label-${rest.name}`}
			>
				{label}
			</FieldLabel>,
		);
	}

	fields.push(<FieldInput key={rest.name} id={id} {...rest} />);

	if (isCheckbox) {
		fields.reverse();
	}

	return (
		<FieldSet key={rest.name} sided={sided || isCheckbox}>
			{fields}
		</FieldSet>
	);
}
