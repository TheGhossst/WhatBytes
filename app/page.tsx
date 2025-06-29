import ProductGrid from "./components/ProductGrid";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";
import { FilterProvider } from "./contexts/FilterContext";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <FilterProvider>
      <div className="h-full w-full min-h-screen bg-white">
        <Header />
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <ProductGrid />
        </div>
        <Footer/>
      </div>
    </FilterProvider>
  );
}
