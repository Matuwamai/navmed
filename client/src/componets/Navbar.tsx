import { useState } from 'react';
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaPhoneAlt,
  FaWhatsapp,
  FaSignOutAlt,
} from 'react-icons/fa';
import {
  Navbar, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Authcontext'; 
import Logo from '../assets/logo.jpeg';

function NavMedNavbar({ cartCount }: { cartCount: number }) {
  const { isAuthenticated, fullName, logout } = useAuth(); 
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearch(false);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <div className="bg-light">
      <div className="flex justify-content-between align-items-center px-3 py-1 bg-primary text-white small">
        <div className="d-flex align-items-center">
          <FaPhoneAlt className="me-2" />
          <span>+254 712 345 678</span>
        </div>

        <div>
          <a
            href="https://wa.me/254712345678"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none d-flex align-items-center"
          >
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
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => setShowSearch(true)}
              >
                <FaSearch />
              </button>
            )}
            {!showSearch && (
              <a
                href="/order"
                className="btn btn-light me-2 position-relative"
                style={{ color: '#ec0e63' }}
              >
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {cartCount}
                  </span>
                )}
              </a>
            )}
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle tag="button" className="btn btn-light me-2" style={{ color: '#ec0e63' }}>
                <FaUser  />
                {isAuthenticated && fullName ? (
                  <span className="text-primary"> {fullName}</span>
                
                ) : (
                  <span className="ms-2">Account</span>
                )}
              </DropdownToggle>
              <DropdownMenu>
                {isAuthenticated ? ( 
                  <>
                    <DropdownItem onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem onClick={() => navigate('/login')}>
                      Login
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate('/register')}>
                      Register
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default NavMedNavbar;
