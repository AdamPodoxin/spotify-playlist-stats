import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotify Playlist Stats",
  description: "Some basic stats about your Spotify public playlists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#242334] to-[#15162c] text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
