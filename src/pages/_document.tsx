import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="font-sans">
      <Head />
      {/* SET GLOBAL TAILWIND CLASSES FOR STYLING ON BODY HERE, e.g. className="bg-gray-100 text-gray-900" */}
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
