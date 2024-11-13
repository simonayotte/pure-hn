"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <head>
          <title>Pure HN</title>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
