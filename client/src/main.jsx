import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

// Import splash-screen
import { enable, destroy } from "splash-screen";
import "splash-screen/dist/splash-screen.min.css"; // all-in-one CSS

// Show splash when app starts
enable("windcatcher");
// Create a client
const queryClient = new QueryClient();
// setTimeout(() => {
//   destroy();
// }, 1500);

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
