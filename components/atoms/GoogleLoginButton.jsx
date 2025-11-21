import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const GoogleLoginButton = () => {
  const buttonRef = useRef(null);
  const { user, isGoogleReady } = useAuth();

  useEffect(() => {
    if (isGoogleReady && window.google && buttonRef.current && !user) {
      try {
        window.google.accounts.id.renderButton(
          buttonRef.current,
          { 
            theme: 'outline', 
            size: 'large',
            text: 'sign_in_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          }
        );
      } catch (error) {
        console.error('Error rendering Google button:', error);
      }
    }
  }, [user, isGoogleReady]);

  return <div ref={buttonRef} className="h-[40px]" />;
};
