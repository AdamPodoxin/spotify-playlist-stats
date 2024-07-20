import "~/styles/globals.css";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Wrapper from "~/components/Wrapper";

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
            <Wrapper>{children}</Wrapper>
          </div>
        </main>
      </body>
    </html>
  );
}
