import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { readVersionFile } from '../version-label';

export default function Root({ children }) {
  const [showPreviewBanner, setShowPreviewBanner] = React.useState(false);
  const [version, setVersion] = React.useState<string | undefined>();

  React.useEffect(() => {
    // Check if we're on preview or localhost for development purposes only
    const isPreviewSite =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'preview.pocket-id.org' || window.location.hostname === 'localhost');

    setShowPreviewBanner(isPreviewSite);

    if (isPreviewSite) {
      readVersionFile()
        .then((v) => setVersion(v))
        .catch(() => setVersion(undefined));
    }
  }, []);

  return (
    <>
      {showPreviewBanner && (
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
            <AlertTriangle className="size-4" />
            <span>
              This documentation is for an unreleased version of Pocket ID. See the{' '}
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
            </span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
