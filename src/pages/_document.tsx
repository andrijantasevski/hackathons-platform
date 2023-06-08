import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="font-sans">
      <Head>
        <link
          rel="preload"
          href="/images/background-images/background-cloud.svg"
          as="image/svg+xml"
        />
      </Head>
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
