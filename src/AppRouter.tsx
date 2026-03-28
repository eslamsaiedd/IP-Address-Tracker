import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tracker from "./pages/Tracker";
import App from "./App";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/tracker" replace />} />
          <Route path="tracker" element={<Tracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
