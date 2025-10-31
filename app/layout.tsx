import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdul Salam Aldabik | AI Engineer & Full-Stack Developer",
  description: "Applied Computer Science student specializing in AI, Machine Learning, Computer Vision, and Full-Stack Development. Explore projects in autonomous driving, smart home automation, and multi-agent AI systems.",
  keywords: [
    "AI Engineer",
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
  metadataBase: new URL("https://yourportfolio.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Abdul Salam Aldabik - AI Engineer & Developer Portfolio",
    description: "Explore AI/ML projects, web development work, and technical skills. Specializing in Computer Vision, Deep Learning, and Full-Stack Development.",
    siteName: "Abdul Salam Aldabik Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdul Salam Aldabik - AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Salam Aldabik | AI Engineer & Developer",
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
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
