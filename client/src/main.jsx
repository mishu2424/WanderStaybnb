import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ReactLenis } from "@studio-freight/react-lenis";

// Import splash-screen
import { enable, destroy } from "splash-screen";
import "splash-screen/dist/splash-screen.min.css"; // all-in-one CSS

// Show splash when app starts
enable("windcatcher");
// Create a client
const queryClient = new QueryClient();

// wait for assets or data if needed
await new Promise((res) => setTimeout(res, 1500));

destroy();

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactLenis
          root
          options={{
            lerp: 0.09, // 0..1 (lower = smoother, higher = snappier)
            smoothWheel: true,
            smoothTouch: true, // optional on mobile
            duration: 1.2, // alternative to lerp (seconds per “distance”)
          }}
        >
          <RouterProvider router={router} />
        </ReactLenis>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
