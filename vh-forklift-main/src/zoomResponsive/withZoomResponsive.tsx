import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';

const useZoomResponsive = () => {
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const r = document.querySelector(':root') as any;
        if (window.innerWidth > 1920 && r) {
          r.style.setProperty(
            '--zoom-responsive',
            Math.floor((window.innerWidth / 1920) * 10) / 10,
          );
        }
        if (window.innerWidth < 1920 && r) {
          r.style.setProperty(
            '--zoom-mobile-responsive',
            Math.floor((window.innerWidth / 1920) * 10) / 10,
          );
        }
        r.style.setProperty(
          '--zoom-both-responsive',
          Math.floor((window.innerWidth / 1920) * 10) / 10,
        );
        r.style.setProperty(
          '--zoom-not-round-responsive',
          window.innerWidth / 1920,
        );
      }, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

const withZoomResponsive = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithZoomResponsive: FunctionComponent<P> = (props) => {
    useZoomResponsive();
    return <WrappedComponent {...props} />;
  };

  WithZoomResponsive.displayName = `WithZoomResponsive(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithZoomResponsive;
};

export default withZoomResponsive;
