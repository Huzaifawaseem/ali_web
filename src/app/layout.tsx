import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: 'Royal Massage Spa | Premier Massage Center for Relaxation & Wellness',
    template: '%s | Royal Massage Spa',
  },
  description: 'Experience tranquility at Royal Massage Spa, the leading massage center. We offer a range of professional massage therapies including deep tissue, Swedish, and hot stone massages. Book your appointment at the best massage spa today!',
  keywords: ['Royal Massage Spa', 'Karachi Massage Center', 'Massage Center Karachi', 'Massage Center DHA', 'Massage Center', 'Massage Spa', 'Massage Therapy', 'Relaxation', 'Wellness', 'Deep Tissue Massage', 'Swedish Massage', 'Hot Stone Massage', 'Body Massage', 'Therapeutic Massage'],
  openGraph: {
    title: 'Royal Massage Spa | Premier Massage Center for Relaxation & Wellness',
    description: 'Discover ultimate relaxation and rejuvenation at Royal Massage Spa, your premier massage center. Book a session with our expert therapists.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'Royal Massage Spa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Massage Spa | Premier Massage Center for Relaxation & Wellness',
    description: 'Your journey to wellness starts here. Book a relaxing massage at Royal Massage Spa, the top-rated massage center.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}