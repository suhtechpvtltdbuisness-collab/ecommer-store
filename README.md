# Gromuse - Himalaya Organic Store

A fully functional e-commerce web application for organic Himalaya products built with React.

## Features

- 🌿 **Organic Products**: Browse premium Himalayan organic products
- 🔍 **Product Search**: Search bar for easy product discovery
- 📦 **Product Categories**: Filter by Skincare, Spices, Beverages, Food, Wellness, Hair Care
- 🛒 **Shopping Cart**: Add, remove, and modify product quantities
- 📋 **Order Management**: Fill in shipping information for orders
- 💳 **Payment Processing**: Multiple payment methods (Credit Card, PayPal, Crypto)
- ✅ **Order Confirmation**: Success page after completing purchase
- 💾 **Persistent Cart**: Cart data saved in localStorage
- 🎨 **Modern Design**: Green/teal color scheme inspired by nature

## Product Catalog

### Available Products:

- Himalaya Organic Neem Face Wash
- Himalaya Organic Turmeric Powder
- Himalaya Organic Green Tea
- Himalaya Organic Honey
- Himalaya Organic Aloe Vera Gel
- Himalaya Organic Ginger Powder
- Himalaya Organic Hair Oil
- Himalaya Organic Ashwagandha
- Himalaya Organic Coconut Oil
- Himalaya Organic Moringa Powder
- Himalaya Organic Face Cream
- Himalaya Organic Herbal Tea Mix

## Project Structure

```
ecommerce_demo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Header.css
│   ├── context/
│   │   └── CartContext.js
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── Products.js
│   │   ├── Products.css
│   │   ├── ProductDetails.js
│   │   ├── ProductDetails.css
│   │   ├── Cart.js
│   │   ├── Cart.css
│   │   ├── Order.js
│   │   ├── Order.css
│   │   ├── Payment.js
│   │   ├── Payment.css
│   │   ├── Success.js
│   │   └── Success.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React 18.2** - UI library
- **React Router 6** - Client-side routing
- **Context API** - State management for cart
- **CSS3** - Modern styling with green/teal theme
- **localStorage** - Cart persistence
- **Unsplash** - Product images

## Design Inspiration

The design is inspired by modern organic grocery stores with a focus on:

- Natural green/teal color palette (#1e5c54)
- Clean, minimalist layout
- Easy navigation and product discovery
- Mobile-responsive design

## Features in Detail

### Product Catalog

- Hero section with organic theme messaging
- Grid layout with responsive design
- Category filtering (Skincare, Spices, Beverages, Food, Wellness, Hair Care)
- Product ratings and pricing
- High-quality product images

### Shopping Cart

- Real-time cart updates
- Quantity adjustments
- Item removal
- Price calculations (subtotal, shipping, tax)
- Persistent storage

### Checkout Flow

1. Review cart items
2. Enter shipping information
3. Select payment method
4. Complete purchase
5. Order confirmation

### Payment Options

- Credit/Debit Card
- PayPal
- Cryptocurrency

## Future Enhancements

- User authentication and profiles
- Order history and tracking
- Product search functionality
- Wishlist feature
- Product reviews and ratings system
- Admin dashboard for inventory management
- Real payment gateway integration
- Backend API with database
- Email notifications
- Multi-language support

## Color Palette

- **Primary**: #1e5c54 (Teal)
- **Secondary**: #2d7a6e (Light Teal)
- **Success**: #2ecc71 (Green)
- **Error**: #ff4757 (Red)
- **Background**: #f8f9fa (Light Gray)

## License

MIT License - feel free to use this project for learning or as a starting point for your own e-commerce application.

# ecommer-store
