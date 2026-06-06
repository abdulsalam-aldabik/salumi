import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Abdul Salam Aldabik | AI & Computer-Vision Developer",
  description: "Applied Computer Science student specializing in AI, Machine Learning, Computer Vision, and Full-Stack Development. Explore projects in autonomous driving, smart home automation, and multi-agent AI systems.",
  keywords: [
    "AI Developer",
    "Machine Learning",
    "Computer Vision",
    "Full Stack Developer",
    "Python",
    "React",
    "Next.js",
    "TypeScript",
    "Deep Learning",
    "FastAI",
    "PyTorch",
    "Thomas More University",
    "Belgium Developer",
  ],
  authors: [{ name: "Abdul Salam Aldabik", url: "https://github.com/abdulsalam-aldabik" }],
  creator: "Abdul Salam Aldabik",
  publisher: "Abdul Salam Aldabik",
  metadataBase: new URL("https://salumieportfolio.netlify.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://salumieportfolio.netlify.app",
    title: "Abdul Salam Aldabik - AI & Software Developer Portfolio",
    description: "Explore AI/ML projects, web development work, and technical skills. Specializing in Computer Vision, Deep Learning, and Full-Stack Development.",
    siteName: "Abdul Salam Aldabik Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdul Salam Aldabik - AI Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Salam Aldabik | AI & Software Developer",
    description: "Applied CS student specializing in AI/ML. Building intelligent systems with Computer Vision & Deep Learning.",
    creator: "@yourusername",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                // Warm-dark is the primary mode: default to dark unless the
                // visitor explicitly chose light.
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-base text-ink transition-colors duration-300`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
