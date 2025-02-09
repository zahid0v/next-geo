import Link from 'next/link';
import React, { useState } from 'react';

// CSS as a template literal to keep it colocated
const css = `
  .nav {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1rem 2rem;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }

  .menu-button {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .link {
    color: #666;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
  }

  .link:hover {
    color: #333;
  }

  .button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }

  .button:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    .menu-button {
      display: block;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      background-color: #ffffff;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .nav-links.open {
      display: flex;
    }
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Insert CSS into the document
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <nav className="nav">
      <div className="container">
        <Link href="/" className="logo" />

        <button 
          className="menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link  href="/" className="button">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;