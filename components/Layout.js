import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
