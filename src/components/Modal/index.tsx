import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

import { useMountTransition } from '../../utils';

const ModalClose = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	width: 1em;
	height: 1em;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	margin: 2px 2px 0 0;
	:before {
		content: '×'
	}
`;

const ModalTitle = styled.div`
	padding: 1.5em 2em;
	pointer-events: all;
	position: relative;
	width: calc(100% - 4.5em);
	font-size: 1.25rem;
	font-weight: 600;
	line-height: normal;
`;

const ModalContainer = styled.div`
	background: #ffffff;
	box-shadow: 0 10px 20px rgb(0 0 0 / 20%);
	left: 50%;
	min-width: 30em;
	max-width: 90%;
	position: fixed;
	top: 50%;
	transform: translate(-50%, -50%);
	max-height: 90vh;
	z-index: 1000;
`;

const ModalHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ModalBody = styled.div`
	display: flex;
`;

const ModalOverlay = styled.div`
	visibility: hidden;
	opacity: 0;
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: fixed;
	pointer-events: none;
	z-index: 0;
`;

const ModalPortal = styled.div<{ isOpen: boolean; isTransitioning: boolean; delay: number }>`
	${ModalOverlay} {
		transition: opacity ${({ delay }) => delay}ms ease, visibility ${({ delay }) => delay}ms ease;
	}

	${({ isOpen, isTransitioning }) => isOpen && isTransitioning &&
		css`
			${ModalOverlay} {
				visibility: visible;
				opacity: 1;
				pointer-events: auto;
				z-index: 999;
			}
		`}
`;

interface IModalProps {
	id?: string;
	title?: string;
	children?: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

function createPortalRoot(id: string) {
	const modalRoot = document.createElement('div');
	modalRoot.setAttribute('id', id);

	return modalRoot;
}

export function Modal ({ id = 'modal', isOpen, title, children, onClose }: IModalProps): React.ReactElement | null {
	const modalPortalId = `${id}-portal`;
	const delay = 300;
	const bodyRef = useRef<HTMLBodyElement>(document.querySelector('body'));
	const portalRootRef = useRef(document.getElementById(modalPortalId) || createPortalRoot(modalPortalId));
	const modalRef = useRef<any>(null);
	const isTransitioning = useMountTransition(isOpen, delay);

	// // Append portal root on mount
	useEffect(() => {
		bodyRef?.current?.appendChild(portalRootRef.current);

		return () => {
			// Clean up the portal when modal component unmounts
			portalRootRef.current.remove();
			// Ensure scroll overflow is removed
			if (bodyRef.current) {
				bodyRef.current.style.overflow = '';
			}
		};
	}, []);

	// Prevent page scrolling when the modal is open
	useEffect(() => {
		if (bodyRef.current) {
			bodyRef.current.style.overflow = isOpen ? 'hidden' : '';
		}
	}, [isOpen, bodyRef.current]);

	if (!isTransitioning && !isOpen) {
		return null;
	}

	return createPortal(
		<ModalPortal
			isOpen={isOpen}
			isTransitioning={isTransitioning}
			ref={modalRef}
			delay={delay}
		>
			<ModalContainer id={id}>
				<ModalHeader>
					{ title && <ModalTitle>{ title }</ModalTitle> }
					<ModalClose onClick={onClose}/>
				</ModalHeader>
				<ModalBody>
					{children}
				</ModalBody>
			</ModalContainer>
			<ModalOverlay onClick={onClose}/>
		</ModalPortal>,
		portalRootRef.current,
	);
}
