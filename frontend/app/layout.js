
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import Navigation from "./components/Navigation";
import { Toaster } from 'react-hot-toast';
import { UserProvider } from "./context/UserContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / Recipe-store",
    default: "Welcome / Recipe-store",
  },
  description: "Explore new Recipe Everyday , make it bake and Loved it",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="pastel">
      <body
        className={`${josefin.className} min-h-screen flex flex-col relative `}
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <UserProvider>
          <Navigation />
          <div className="flex-1 px-4 py-8 grid h-screen  ">
            <main className="max-w-7xl mx-auto w-full flex justify-center ">{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}