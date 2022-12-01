import InvoiceListePage from "./pages/InvoiceListePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerListePage from "./pages/CustomerListePage";
import MainLayout from "./layouts/MainLayout";
import InvoiceUpdatePage from "./pages/InvoiceUpdatePage";
import InvoiceCreatePage from "./pages/InvoiceCreatePage";
import CustomerUpdatePage from "./pages/CustomerUpdatePage";
import CustomerCreatePage from "./pages/CustomerCreatePage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
            <Route path="/" element={<InvoiceListePage />} />
            <Route path="/new-invoice" element={<InvoiceCreatePage />} />
            <Route path="/invoice/:id/edit" element={<InvoiceUpdatePage />} />
            <Route path="/customers" element={<CustomerListePage />} />
            <Route path="/customer/:id/edit" element={<CustomerUpdatePage />} />
            <Route path="/customers/new-customer" element={<CustomerCreatePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
