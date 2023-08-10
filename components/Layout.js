import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Header />
      <div className="max-w-screen-90 m-auto flex p-5 flex-col">{children}</div>
      <Footer />
    </>
  );
}
