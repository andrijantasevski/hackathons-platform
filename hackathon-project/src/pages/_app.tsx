import "@/styles/globals.css";
import type { AppProps } from "next/app";
import QueryLayout from "@/layouts/QueryLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryLayout>
      <Component {...pageProps} />
    </QueryLayout>
  );
}
