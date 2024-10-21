import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Store a hashed version of your password (using bcrypt)
  const hashedPassword = '$2a$10$ZJPqbnE1v8E5UnBG3SyxyOkNPqGlhJPyjLDswDZCBnAE9gogBFwBO'; // Pre-hashed 'admin123'

  useEffect(() => {
    if (!isAuthenticated) {
      handlePasswordPrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handlePasswordPrompt = () => {
    Swal.fire({
      title: 'Enter Admin Password',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
      preConfirm: async (password) => {
        // Compare the entered password with the hashed password
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        if (isPasswordCorrect) {
          setIsAuthenticated(true);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Incorrect password!',
            text: 'Please try again.',
            customClass: {
              confirmButton: 'custom-confirm-button',
              cancelButton: 'custom-cancel-button',
            },
          });
        }
      },
    });
  };

  // Only render the protected component if authenticated
  if (!isAuthenticated) {
    return null; // This prevents the protected content from rendering
  }

  return element; // Render the element (protected component)
};

// Inline styles for SweetAlert buttons
const confirmButtonStyle = {
  backgroundColor: '#03519C', // Custom color for confirm button
  color: 'white',
  borderRadius: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
};

const cancelButtonStyle = {
  backgroundColor: 'gray', // Custom color for cancel button
  color: 'white',
  borderRadius: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
};

// Add custom styles for SweetAlert buttons
const addStylesToPage = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-confirm-button {
      background-color: ${confirmButtonStyle.backgroundColor};
      color: ${confirmButtonStyle.color};
      border-radius: ${confirmButtonStyle.borderRadius};
      padding: ${confirmButtonStyle.padding};
      font-size: ${confirmButtonStyle.fontSize};
      border: ${confirmButtonStyle.border};
    }
    .custom-cancel-button {
      background-color: ${cancelButtonStyle.backgroundColor};
      color: ${cancelButtonStyle.color};
      border-radius: ${cancelButtonStyle.borderRadius};
      padding: ${cancelButtonStyle.padding};
      font-size: ${cancelButtonStyle.fontSize};
      border: ${cancelButtonStyle.border};
    }
  `;
  document.head.appendChild(style);
};

// Ensure styles are applied before rendering the component
addStylesToPage();

export default ProtectedRoute;
