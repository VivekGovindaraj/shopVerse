import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 mt-auto">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold mb-4">ShopVerse</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Your one-stop destination for quality products with fast delivery
            and secure checkout.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Account</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition">
                Register
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-white transition">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Free shipping on orders &#8377;2000</li>
            <li>30-day easy returns</li>
            <li>24/7 customer support</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
