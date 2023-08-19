import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and other utilities
import App from './App';
import './main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);
root.render(
  <App />
);