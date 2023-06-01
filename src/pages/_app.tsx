import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import QueryLayout from "@/layouts/QueryLayout";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "@/utils/userContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UserContextProvider>
      <QueryLayout>
        {getLayout(<Component {...pageProps} />)}
        <Toaster position="top-right" />
      </QueryLayout>
    </UserContextProvider>
  );
}
