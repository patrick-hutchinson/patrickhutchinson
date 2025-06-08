import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "PH",
  description: "Portfolio Website of Patrick Hutchinson",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
