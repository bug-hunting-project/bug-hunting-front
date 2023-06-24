import NavBar from "./NavBar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Header />
      <div>{children}</div>
    </>
  );
}
