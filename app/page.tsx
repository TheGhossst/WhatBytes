import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import Sidebar from "./components/SideBar";

export default function Home() {
  return (
    <div className="h-full w-full min-h-screen bg-white">
      <Header />
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <ProductGrid />
      </div>
    </div>
  );
}
