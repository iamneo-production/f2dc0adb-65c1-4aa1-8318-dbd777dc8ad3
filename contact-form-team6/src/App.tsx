import React, { useState } from 'react';
import ContactForm from './components/contact-form';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/nav-bar';
import ContactUs from './components/contact-form';
import ContactList from './components/contact-list';
function App() {


  return (
    <div>

      <NavBar />
      <ContactForm />


    </div>
  );
}

export default App;
