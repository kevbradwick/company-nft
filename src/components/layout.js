import Head from 'next/head';

export default function Layout({
  children,
  title = 'This is the default title',
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0c0c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <link rel="shortcut icon" sizes="16x16 32x32 48x48" href="/alphagov/assets/images/favicon.ico" type="image/x-icon" />
        <link rel="mask-icon" href="/alphagov/assets/images/govuk-mask-icon.svg" color="#0b0c0c" />
        <link rel="apple-touch-icon" sizes="180x180" href="/alphagov/assets/images/govuk-apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/alphagov/assets/images/govuk-apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/alphagov/assets/images/govuk-apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" href="/alphagov/assets/images/govuk-apple-touch-icon.png" />
        <link rel="stylesheet" type="text/css" href="/alphagov/govuk-frontend-3.11.0.min.css" media="all" />
        <meta property="og:image" content="/alphagov/assets/images/govuk-opengraph-image.png" />

        <script type="text/javascript" src="/alphagov/govuk-frontend-3.11.0.min.js"></script>
      </Head>

      <header className="govuk-header">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__logo">
            <a href="/" className="govuk-header__link govuk-header__link--homepage">
              <span className="govuk-header__logotype">
                <img src="/alphagov/assets/images/govuk-logotype-crown.png" className="govuk-header__logotype-crown-fallback-image" width="36" height="32" />
                <span className="govuk-header__logotype-text">
                  Companies House
                </span>
              </span>
            </a>
          </div>
        </div>
      </header>

      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content">
          {children}
        </main>
      </div>

      <footer className="govuk-footer">
        <div className="govuk-width-container">
          <div className="govuk-footer__meta">
            <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
              <span className="govuk-footer__licence-description">
                {'All content is available under the '}
                <a className="govuk-footer__link" href="/">Open Government Licence v3.0</a>, except where otherwise stated
              </span>
            </div>
            <div className="govuk-footer__meta-item">
              <a className="govuk-footer__link govuk-footer__copyright-logo" href="/">Crown copyright</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}