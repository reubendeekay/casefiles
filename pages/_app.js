import "../styles/globals.css";
import Nav from "../components/Nav";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";
import { StateContext } from "../lib/context";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Nav />
        <Toaster />
        <Component {...pageProps} />
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
