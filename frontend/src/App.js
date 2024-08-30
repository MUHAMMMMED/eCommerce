import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Authentication/Login';
import Header from './components/Header/Header';
import ErrorPage from './components/Loading/ErrorPage';
import { CartProvider } from './components/Provider/CartProvider/CartProvider';
import AllProducts from './pages/AllProducts/AllProducts';
import CartPage from './pages/CartPage/CartPage';
import Categories from './pages/Categories/Categories';
import Category from './pages/Category/Category';
import Checkout from './pages/Checkout/Checkout';
import Dashboard from './pages/Dashboard/Dashboard';
import AdBudget from './pages/Dashboard/pages/AdBudget/AdBudget';
import BestSellers from './pages/Dashboard/pages/BestSellers/BestSellers';
import Cancel from './pages/Dashboard/pages/Cancel/Cancel';
import Card from './pages/Dashboard/pages/Card/Card';
import CategoriesList from './pages/Dashboard/pages/CategoriesList/CategoriesList';
import Coupon from './pages/Dashboard/pages/Coupon/Coupon';
import CustomerList from './pages/Dashboard/pages/CustomerList/CustomerList';
import Deal from './pages/Dashboard/pages/Deal/Deal';
import Expense from './pages/Dashboard/pages/Expense/Expense';
import Group from './pages/Dashboard/pages/GroupProduct/Group';
import InfoSettings from './pages/Dashboard/pages/InfoSettings/InfoSettings';
import InvoiceList from './pages/Dashboard/pages/Invoice/InvoiceList';
import Note from './pages/Dashboard/pages/Note/Note';
import OrderDetails from './pages/Dashboard/pages/OrderDetails/OrderDetails';
import Package from './pages/Dashboard/pages/Package/Package';
import ProductsList from './pages/Dashboard/pages/ProductsList/ProductsList';
import ProductCreate from './pages/Dashboard/pages/ProductsList/components/form/ProductCreate';
import ProductUpdate from './pages/Dashboard/pages/ProductsList/components/form/ProductUpdate';
import Purchase from './pages/Dashboard/pages/Purchase/Purchase';
import QuestionsGeneral from './pages/Dashboard/pages/QuestionsGeneral/QuestionsGeneral';
import Rate from './pages/Dashboard/pages/Rate/Rate';
import Report from './pages/Dashboard/pages/Report/Report';
import Settings from './pages/Dashboard/pages/Settings/Settings';
import ShippingBalance from './pages/Dashboard/pages/ShippingBalance/ShippingBalance';
import ShippingCompany from './pages/Dashboard/pages/ShippingCompany/ShippingCompany';
import ShippingCountry from './pages/Dashboard/pages/ShippingCountry/ShippingCountry';
import Slide from './pages/Dashboard/pages/Slide/Slide';
import FollowSuccess from './pages/Dashboard/pages/Success/FollowSuccess';
import Success from './pages/Dashboard/pages/Success/Success';
import Home from './pages/Home/Home';
import Offer from './pages/Offers/Offer';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import ProductDetailPageplus from './pages/ProductDetailPageplus/ProductDetailPageplus';


function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/All_Products" exact element={<AllProducts />} />
          <Route path="/Categories" exact element={<Categories />} />
          <Route path="/offrs" exact element={<Offer />} />
          <Route path="/Category/:slug/:id" exact element={<Category />} />
          <Route path="/order_tracking" exact element={<OrderTracking />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/Checkout" exact element={<Checkout />} />
          <Route path="/Product/:slug/:id" element={<ProductDetail />} />
          <Route path="/products" element={<ProductDetailPage />} />
          <Route path="/products/plus" element={<ProductDetailPageplus />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/report" element={<Report />} />
          <Route path="/customer_list" element={<CustomerList />} />
          <Route path="/product_create" element={<ProductCreate />} />
          <Route path="/product_update/:id" element={<ProductUpdate />} />

          <Route path="/expense" element={<Expense />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/package" element={<Package />} />
          <Route path="/Categories_list" element={<CategoriesList />} />
          <Route path="/Products_list" element={<ProductsList />} />
          <Route path="/shipping_company" element={<ShippingCompany />} />
          <Route path="/shipping_country" element={<ShippingCountry />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/deal" element={<Deal />} />
          <Route path="/rate" element={<Rate />} />
          <Route path="/questions" element={<QuestionsGeneral />} />
          <Route path="/slide" element={<Slide />} />
          <Route path="/card" element={<Card />} />
          <Route path="/best_sellers" element={<BestSellers />} />
          <Route path="/group" element={<Group />} />
          <Route path="/info_settings" element={<InfoSettings />} />
          <Route path="/shipping_balance" element={<ShippingBalance />} />
          <Route path="/ad_budget" element={<AdBudget />} />
          <Route path="/note" element={<Note />} />
          <Route path="/invoice" element={<InvoiceList />} />
          <Route path="/success/:id" element={<Success />} />
          <Route path="/success" element={<FollowSuccess />} />
          <Route path="/cancel" element={<Cancel />} />


          <Route path="*" element={<ErrorPage />} />


        </Routes>
      </Router>
    </CartProvider>

  );
}

export default App;
