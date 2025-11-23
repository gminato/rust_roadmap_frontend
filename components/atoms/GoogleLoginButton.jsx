import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useMobileView } from '../../hooks/useMobileView';

export const GoogleLoginButton = () => {
  const buttonRef = useRef(null);
  const { user, isGoogleReady } = useAuth();
  const isMobile = useMobileView();

  useEffect(() => {
    if (isGoogleReady && window.google && buttonRef.current && !user) {
      try {
        window.google.accounts.id.renderButton(
          buttonRef.current,
          {
            theme: 'outline',
            size: isMobile ? 'medium' : 'large',
            text: isMobile ? 'signin' : 'sign_in_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          }
        );
      } catch (error) {
        console.error('Error rendering Google button:', error);
      }
    }
  }, [user, isGoogleReady, isMobile]);

  return <div ref={buttonRef} className="h-[40px]" />;
};
