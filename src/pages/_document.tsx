import React from "react";

import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class BaseDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&amp;display=swap&amp;text=Intl.DateTimeFormatChecker"
          />
        </Head>
        <body className="bg-gradient-to-r from-blue-50 to-purple-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default BaseDocument;
