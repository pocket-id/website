import React from 'react';
import { AlertTriangle, Code } from 'lucide-react';
import { readVersionFile } from '../version-label';

export default function Root({ children }) {
  const [showBanner, setShowBanner] = React.useState(false);
  const [bannerMessage, setBannerMessage] = React.useState('');
  const [bannerIcon, setBannerIcon] = React.useState<React.ReactNode>(null);
  const [version, setVersion] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isProductionSite = hostname === 'pocket-id.org';

      if (!isProductionSite) {
        setShowBanner(true);

        if (hostname === 'localhost' || hostname === '127.0.0.1') {
          setBannerMessage('Development environment - documentation may not reflect the production version');
          setBannerIcon(<Code className="size-4" />);
        } else {
          // For preview.pocket-id.org and other preview URLs
          setBannerMessage('This documentation is for an unreleased version of Pocket ID');
          setBannerIcon(<AlertTriangle className="size-4" />);
        }

        readVersionFile()
          .then((v) => setVersion(v))
          .catch(() => setVersion(undefined));
      }
    }
  }, []);

  return (
    <>
      {showBanner && (
        <div
          className="preview-banner"
          style={{
            backgroundColor: 'var(--ifm-background-surface-color)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid var(--ifm-color-primary)',
            color: 'var(--ifm-color-primary)',
            padding: '12px 16px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: '500',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {bannerIcon}
            <span>
              {bannerMessage}
              {!bannerMessage.includes('Development') && (
                <>
                  . See the{' '}
                  <a
                    href="https://pocket-id.org/docs"
                    style={{
                      color: 'var(--ifm-color-primary)',
                      textDecoration: 'underline',
                      fontWeight: '600',
                    }}
                  >
                    latest version
                  </a>
                  {version && ` (v${version})`}
                </>
              )}
            </span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
