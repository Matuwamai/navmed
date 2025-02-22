import { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Navbar, NavbarBrand } from 'reactstrap';
import Logo from '../assets/logo.jpeg';

interface NavMedNavbarProps {
  cartCount: number;
}

function NavMedNavbar({ cartCount }: NavMedNavbarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
    setShowSearch(false);
  };

  return (
    <div className="bg-light">
      <div className="d-flex justify-content-between align-items-center px-3 py-1 bg-primary text-white small">
        <div className="d-flex align-items-center">
          <FaPhoneAlt className="me-2" />
          <span>+254 712 345 678</span>
        </div>

        <div>
          <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none d-flex align-items-center">
            <FaWhatsapp className="me-2" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <Navbar expand="lg" light className="bg-light shadow-sm mb-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {!showSearch && (
            <NavbarBrand href="/">
              <img src={Logo} alt="NavMed" height="70" />
            </NavbarBrand>
          )}

          <div className="d-flex align-items-center">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="d-flex w-100">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-primary" type="submit">
                  <FaSearch />
                </button>
              </form>
            ) : (
              <button className="btn btn-outline-primary me-2" onClick={() => setShowSearch(true)}>
                <FaSearch />
              </button>
            )}

            {!showSearch && (
              <>
                <a href="/cart" className="btn btn-light me-2 position-relative" style={{ color: '#ec0e63' }}>
                  <FaShoppingCart />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </a>
                <a href="/account" className="btn btn-light me-2" style={{ color: '#ec0e63' }}>
                  <FaUser />
                </a>
              </>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavMedNavbar;
