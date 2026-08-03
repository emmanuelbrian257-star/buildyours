
import localFont from "next/font/local";
import "./globals.css";
import {Toaster} from "react-hot-toast"

const bosch=localFont({
  src:[
    {path:'/fonts/bosch.otf', weight:'300', style:'normal'}
  ],
  variable:'--bosch'
})

const grotesk=localFont({
  src:[
    {path:'/fonts/grotesk.otf', weight:'100', style:'normal'}
  ],
  variable:'--grotesk'
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${bosch.variable}`}>
        <Toaster position="top-center" reverseOrder={false}/>
        {children}
      </body>
    </html>
  );
}
