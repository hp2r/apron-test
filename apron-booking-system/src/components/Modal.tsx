import React from 'react';
import { styled } from '../../stitches.config';

const ModalBackground = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(1, 50, 51, 0.6)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
});

const ModalContent = styled('div', {
  /*backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  width: '400px',
  maxWidth: '100%',
  color: 'Black',
  width: '512px',
  height: '560px',*/
  padding: '32px',
  gap: '32px',
  borderRadius: '16px',
  backgroundColor: '#FFFFFF'
});

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
            {children}
        </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
