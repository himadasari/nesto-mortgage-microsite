import { Toaster } from "react-hot-toast";
import AppRoutes from "./router/routes";

export default function App() {
  return <>
    <Toaster />
    <AppRoutes />
  </>;
}