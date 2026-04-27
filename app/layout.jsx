import "./globals.css";

export const metadata = {
  title: "The Fish Hub | Premium Seafood Supply",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}