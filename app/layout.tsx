import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TasksProvider } from "@/store/tasks";
import { StatusProvider } from "@/store/editing";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "It a todo list for my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <StatusProvider>
          <TasksProvider>{children}</TasksProvider>
        </StatusProvider>
      </body>
    </html>
  );
}
