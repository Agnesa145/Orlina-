import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import {
    ShoppingBag, Search, User, Menu, X, Heart, MessageSquare,
    ArrowRight, Star, ChevronRight, Trash2, Plus, Minus,
    CheckCircle, LayoutDashboard, Package, ShoppingCart,
    TrendingUp, Truck, Shield, Gift, RefreshCw, Send, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ===== IMAGE URLS — VERIFIED PEXELS CDN (CORRECT CATEGORIES) ===== */
const IMG = {
    hero: 'https://images.pexels.com/photos/17368723/pexels-photo-17368723.jpeg?auto=compress&w=1600',
    banner: 'https://images.pexels.com/photos/16055243/pexels-photo-16055243.jpeg?auto=compress&w=1600',
    // Category thumbnails
    catRings: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&w=800',
    catNecklaces: 'https://images.pexels.com/photos/12217206/pexels-photo-12217206.jpeg?auto=compress&w=800',
    catBracelets: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&w=800',
    catEarrings: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&w=800',
    catWatches: 'https://images.pexels.com/photos/691120/pexels-photo-691120.jpeg?auto=compress&w=800',
    // RINGS (6 photos)
    ring1: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&w=600',
    ring2: 'https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&w=600',
    ring3: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&w=600',
    ring4: 'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&w=600',
    ring5: 'https://images.pexels.com/photos/20796896/pexels-photo-20796896.jpeg?auto=compress&w=600',
    ring6: 'https://images.pexels.com/photos/14466162/pexels-photo-14466162.jpeg?auto=compress&w=600',
    // NECKLACES (6 photos)
    necklace1: 'https://images.pexels.com/photos/12217206/pexels-photo-12217206.jpeg?auto=compress&w=600',
    necklace2: 'https://images.pexels.com/photos/6154083/pexels-photo-6154083.jpeg?auto=compress&w=600',
    necklace3: 'https://images.pexels.com/photos/8003772/pexels-photo-8003772.jpeg?auto=compress&w=600',
    necklace4: 'https://images.pexels.com/photos/14355033/pexels-photo-14355033.jpeg?auto=compress&w=600',
    necklace5: 'https://images.pexels.com/photos/17368723/pexels-photo-17368723.jpeg?auto=compress&w=600',
    necklace6: 'https://images.pexels.com/photos/15157998/pexels-photo-15157998.jpeg?auto=compress&w=600',
    // BRACELETS (6 photos)
    bracelet1: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&w=600',
    bracelet2: 'https://images.pexels.com/photos/16055243/pexels-photo-16055243.jpeg?auto=compress&w=600',
    bracelet3: 'https://images.pexels.com/photos/12026051/pexels-photo-12026051.jpeg?auto=compress&w=600',
    bracelet4: 'https://images.pexels.com/photos/16438675/pexels-photo-16438675.jpeg?auto=compress&w=600',
    bracelet5: 'https://images.pexels.com/photos/12194323/pexels-photo-12194323.jpeg?auto=compress&w=600',
    bracelet6: 'https://images.pexels.com/photos/29986282/pexels-photo-29986282.jpeg?auto=compress&w=600',
    // EARRINGS (6 photos)
    earring1: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&w=600',
    earring2: 'https://images.pexels.com/photos/13595682/pexels-photo-13595682.jpeg?auto=compress&w=600',
    earring3: 'https://images.pexels.com/photos/12144990/pexels-photo-12144990.jpeg?auto=compress&w=600',
    earring4: 'https://images.pexels.com/photos/34022894/pexels-photo-34022894.jpeg?auto=compress&w=600',
    earring5: 'https://images.pexels.com/photos/21235147/pexels-photo-21235147.jpeg?auto=compress&w=600',
    earring6: 'https://images.pexels.com/photos/15491634/pexels-photo-15491634.jpeg?auto=compress&w=600',
    // WATCHES — women's watches (6 photos)
    watch1: 'https://images.pexels.com/photos/16084642/pexels-photo-16084642.jpeg?auto=compress&w=600',
    watch2: 'https://images.pexels.com/photos/10445217/pexels-photo-10445217.jpeg?auto=compress&w=600',
    watch3: 'https://images.pexels.com/photos/15021460/pexels-photo-15021460.jpeg?auto=compress&w=600',
    watch4: 'https://images.pexels.com/photos/691120/pexels-photo-691120.jpeg?auto=compress&w=600',
    watch5: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600',
    watch6: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=600',
};

/* ===== DATA — 30 PRODUCTS (6 per category) ===== */
const ALL_PRODUCTS = [
    // Rings (6)
    { id: 1, name: 'Celestial Diamond Ring', price: 1250, category: 'Rings', image: IMG.ring1, stock: 15, description: 'A breathtaking diamond ring set in 18k white gold, featuring a 1.2 carat center stone surrounded by a halo of smaller diamonds.' },
    { id: 2, name: 'Zanvari Floral Diamond Ring', price: 3400, category: 'Rings', image: IMG.ring2, stock: 2, description: 'Exquisite silver ring featuring a floral diamond cluster design, inspired by Zanvari craftsmanship.' },
    { id: 3, name: 'Eternity Band Ring', price: 2200, category: 'Rings', image: IMG.ring3, stock: 10, description: 'Full eternity band featuring channel-set round diamonds in platinum.' },
    { id: 4, name: 'Orlina Moonstone Ring', price: 890, category: 'Rings', image: IMG.ring4, stock: 18, description: 'Enchanting moonstone ring in rose gold setting with delicate diamond accents.' },
    { id: 5, name: 'Royal Diamond Solitaire', price: 5800, category: 'Rings', image: IMG.ring5, stock: 3, description: 'Stunning 2 carat round brilliant diamond solitaire in 18k white gold cathedral setting.' },
    { id: 6, name: 'Rose Gold Pavé Ring', price: 1650, category: 'Rings', image: IMG.ring6, stock: 8, description: 'Elegant rose gold ring with micro-pavé diamond band and cushion-cut center stone.' },
    // Necklaces (6)
    { id: 7, name: 'Midnight Pearl Necklace', price: 2800, category: 'Necklaces', image: IMG.necklace1, stock: 3, description: 'Elegant freshwater pearl necklace with 18k gold clasp, handcrafted with precision and care.' },
    { id: 8, name: 'Vintage Rose Pendant', price: 1100, category: 'Necklaces', image: IMG.necklace2, stock: 7, description: 'Rose-inspired pendant in rose gold with pavé diamond petals on a delicate chain.' },
    { id: 9, name: 'Orlina Crescent Necklace', price: 1800, category: 'Necklaces', image: IMG.necklace3, stock: 12, description: 'Crescent moon necklace in 18k gold with diamond-encrusted tips, our signature piece.' },
    { id: 10, name: 'Diamond Solitaire Pendant', price: 4500, category: 'Necklaces', image: IMG.necklace4, stock: 4, description: 'Classic solitaire diamond pendant featuring a 1.5 carat round brilliant center stone.' },
    { id: 11, name: 'Golden Heart Chain', price: 950, category: 'Necklaces', image: IMG.necklace5, stock: 20, description: 'Delicate 18k gold chain with heart pendant, perfect for layering or wearing alone.' },
    { id: 12, name: 'Emerald Drop Necklace', price: 3200, category: 'Necklaces', image: IMG.necklace6, stock: 5, description: 'Stunning emerald drop pendant on a fine gold chain with diamond accent bail.' },
    // Bracelets (6)
    { id: 13, name: 'Royal Gold Bracelet', price: 1650, category: 'Bracelets', image: IMG.bracelet1, stock: 8, description: 'Luxurious 18k gold bracelet featuring intricate chain design with safety clasp.' },
    { id: 14, name: 'Diamond Tennis Bracelet', price: 5200, category: 'Bracelets', image: IMG.bracelet2, stock: 4, description: 'Classic diamond tennis bracelet featuring 3.5 carats of brilliant-cut diamonds.' },
    { id: 15, name: 'Pearl Strand Bracelet', price: 780, category: 'Bracelets', image: IMG.bracelet3, stock: 22, description: 'Delicate freshwater pearl bracelet with 14k gold toggle clasp.' },
    { id: 16, name: 'Sapphire Bangle', price: 3200, category: 'Bracelets', image: IMG.bracelet4, stock: 3, description: 'Stunning sapphire and diamond bangle bracelet in white gold.' },
    { id: 17, name: 'Gold Cuff Bracelet', price: 2100, category: 'Bracelets', image: IMG.bracelet5, stock: 6, description: 'Bold 18k gold cuff bracelet with hammered finish and polished edges.' },
    { id: 18, name: 'Crystal Chain Bracelet', price: 1400, category: 'Bracelets', image: IMG.bracelet6, stock: 11, description: 'Elegant chain bracelet with Swarovski crystal stations in sterling silver.' },
    // Earrings (6)
    { id: 19, name: 'Sapphire Drop Earrings', price: 950, category: 'Earrings', image: IMG.earring1, stock: 20, description: 'Stunning drop earrings featuring natural sapphires set in white gold with diamond accents.' },
    { id: 20, name: 'Pearl Stud Earrings', price: 680, category: 'Earrings', image: IMG.earring2, stock: 25, description: 'Timeless Akoya pearl studs set in 14k white gold, perfect for everyday elegance.' },
    { id: 21, name: 'Diamond Hoop Earrings', price: 2900, category: 'Earrings', image: IMG.earring3, stock: 6, description: 'Inside-out diamond hoops featuring 2 carats of round brilliant diamonds.' },
    { id: 22, name: 'Orlina Moon Earrings', price: 1200, category: 'Earrings', image: IMG.earring4, stock: 14, description: 'Crescent moon-shaped earrings with pavé diamonds, part of the Luna collection.' },
    { id: 23, name: 'Gold Chandelier Earrings', price: 1850, category: 'Earrings', image: IMG.earring5, stock: 9, description: 'Exquisite chandelier earrings in 18k gold with cascading diamond drops.' },
    { id: 24, name: 'Ruby Vintage Earrings', price: 3600, category: 'Earrings', image: IMG.earring6, stock: 2, description: 'Art deco inspired earrings featuring natural rubies surrounded by brilliant diamonds.' },
    // Watches — women's (6)
    { id: 25, name: 'Rose Gold Elegance Watch', price: 4900, category: 'Watches', image: IMG.watch1, stock: 5, description: 'Elegant ladies timepiece in rose gold with mother-of-pearl dial and diamond hour markers.' },
    { id: 26, name: 'Gold Diamond Watch', price: 7800, category: 'Watches', image: IMG.watch2, stock: 3, description: 'Luxurious women\'s watch in 18k gold with diamond-set bezel and satin strap.' },
    { id: 27, name: 'Pearl Dial Watch', price: 3500, category: 'Watches', image: IMG.watch3, stock: 8, description: 'Feminine watch with genuine pearl dial, Swiss quartz movement, and mesh bracelet.' },
    { id: 28, name: 'Classic Gold Watch', price: 2200, category: 'Watches', image: IMG.watch4, stock: 12, description: 'Timeless ladies gold watch with slim profile and sapphire crystal case back.' },
    { id: 29, name: 'Orlina Moonphase Watch', price: 6500, category: 'Watches', image: IMG.watch5, stock: 4, description: 'Sophisticated moonphase complication watch for women with diamond-set case.' },
    { id: 30, name: 'Platinum Slim Watch', price: 9800, category: 'Watches', image: IMG.watch6, stock: 2, description: 'Ultra-thin platinum watch with pavé diamond dial and alligator leather strap.' },
];

const CATEGORIES = [
    { name: 'Rings', id: 'rings', img: IMG.catRings },
    { name: 'Necklaces', id: 'necklaces', img: IMG.catNecklaces },
    { name: 'Bracelets', id: 'bracelets', img: IMG.catBracelets },
    { name: 'Earrings', id: 'earrings', img: IMG.catEarrings },
    { name: 'Watches', id: 'watches', img: IMG.catWatches },
];

/* ===== NAVBAR — with Admin link ===== */
const Navbar = ({ cartCount, onSearchClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-inner">
                    {/* Left: Nav Links */}
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/category/rings">Rings</Link>
                        <Link to="/category/necklaces">Necklaces</Link>
                        <Link to="/category/bracelets">Bracelets</Link>
                        <Link to="/category/earrings">Earrings</Link>
                        <Link to="/category/watches">Watches</Link>
                    </div>

                    {/* Center: Logo */}
                    <Link to="/" className="logo">ORLINA&nbsp;<span>JEWELRY</span></Link>

                    {/* Right: Icons */}
                    <div className="nav-icons">
                        <Link to="/admin" title="Admin Dashboard"><LayoutDashboard size={20} /></Link>
                        <Link to="/account"><User size={20} /></Link>
                        <button onClick={onSearchClick}><Search size={20} /></button>
                        <Link to="/cart" className="badge-container cart-badge">
                            <ShoppingBag size={22} />
                            {cartCount > 0 && <span className="badge">{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div className="mobile-menu"
                        initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <button className="mobile-menu-close" onClick={() => setMobileOpen(false)}><X size={28} /></button>
                        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
                        {CATEGORIES.map(c => (
                            <Link key={c.id} to={`/category/${c.id}`} onClick={() => setMobileOpen(false)}>{c.name}</Link>
                        ))}
                        <div className="mobile-menu-bottom">
                            <Link to="/account" onClick={() => setMobileOpen(false)}><User size={18} /> My Account</Link>
                            <Link to="/admin" onClick={() => setMobileOpen(false)}><LayoutDashboard size={18} /> Admin Dashboard</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

/* ===== FOOTER ===== */
const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="logo">ORLINA&nbsp;<span>JEWELRY</span></div>
                    <p>Crafting elegance since 2005. Our jewelry is designed for those who appreciate the extraordinary.</p>
                    <div className="footer-socials">
                        <span className="social-circle">f</span>
                        <span className="social-circle">in</span>
                        <span className="social-circle">ig</span>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Collections</h4>
                    <ul>
                        <li><Link to="/category/rings">Diamond Rings</Link></li>
                        <li><Link to="/category/necklaces">Gold Necklaces</Link></li>
                        <li><Link to="/category/watches">Luxury Watches</Link></li>
                        <li><Link to="/category/bracelets">Bracelets</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Customer Service</h4>
                    <ul>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">Store Locator</a></li>
                        <li><a href="#">Care Guide</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Newsletter</h4>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '16px', lineHeight: 1.7 }}>
                        Join our elite circle for exclusive offers.
                    </p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Email Address" />
                        <button>Join</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Orlina Jewelry. All rights reserved.
            </div>
        </div>
    </footer>
);

/* ===== PRODUCT CARD ===== */
const ProductCard = ({ product, onAddToCart, index = 0 }) => (
    <motion.div className="product-card"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
    >
        <div className="product-card-img">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
            </Link>
            <div className="product-card-actions">
                <button className="product-action-btn fav"><Heart size={18} /></button>
                <button className="product-action-btn cart-btn" onClick={() => onAddToCart(product)}><ShoppingBag size={18} /></button>
            </div>
            {product.stock < 5 && <span className="product-badge">Limited</span>}
        </div>
        <div className="product-card-info">
            <span className="product-card-category">{product.category}</span>
            <Link to={`/product/${product.id}`} className="product-card-name">{product.name}</Link>
            <span className="product-card-price">${product.price.toLocaleString()}</span>
        </div>
    </motion.div>
);

/* ===== HOME PAGE ===== */
const Home = ({ products, onAddToCart }) => (
    <div>
        {/* Hero with Moon */}
        <section className="v3-hero">
            <div className="v3-hero-bg">
                {/* Midnight dark background with teal/teal-glow accents inspired by reference */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, #0B1120 0%, #05080f 100%)'
                }} />


                {/* Simulated Green/Teal Fabric Glow */}
                <div style={{
                    position: 'absolute', top: '-20%', left: '-10%', width: '70%', height: '90%',
                    background: 'radial-gradient(circle, rgba(20, 100, 100, 0.4) 0%, transparent 70%)',
                    filter: 'blur(100px)', transform: 'rotate(-10deg)'
                }} />

                <div className="v3-hero-overlay" />
            </div>

            <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Side Jewellery Accents */}
                <motion.div className="v3-jewelry v3-left"
                    initial={{ y: -500, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1.5, type: 'spring' }}
                >
                    <img src="https://images.pexels.com/photos/12144990/pexels-photo-12144990.jpeg?auto=compress&w=600" alt="Earrings" />
                </motion.div>

                <motion.div className="v3-jewelry v3-right"
                    initial={{ y: -500, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, type: 'spring' }}
                >
                    <img src="https://images.pexels.com/photos/6154083/pexels-photo-6154083.jpeg?auto=compress&w=600" alt="Necklace" />
                </motion.div>

                <div className="v3-hero-content">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        style={{ textAlign: 'center' }}
                    >
                        <span className="v3-brand-label">ORLINA JEWELRY</span>
                        <h1 className="v3-main-title">Timeless Craft.<br />Modern Elegance.</h1>
                        <p className="v3-subtitle">Exquisite Handcrafted Pieces for Every Occasion</p>

                        <div className="v3-actions">
                            <Link to="/category/all" className="v3-btn">SHOP NOW</Link>
                        </div>
                    </motion.div>
                </div>
            </div>


        </section>

        {/* Categories */}
        <section className="section" style={{ background: 'var(--pearl)' }}>
            <div className="container">
                <div className="section-header-row">
                    <div>
                        <span className="section-label">Categories</span>
                        <h2 className="section-title">Explore Collections</h2>
                    </div>
                    <Link to="/category/all" className="view-all">View All <ArrowRight size={16} /></Link>
                </div>
                <div className="categories-grid">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div key={cat.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link to={`/category/${cat.id}`} className="category-card">
                                <div className="category-card-img">
                                    <img src={cat.img} alt={cat.name} loading="lazy" />
                                    <div className="category-card-overlay" />
                                </div>
                                <h3>{cat.name}</h3>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Featured Products */}
        <section className="section" style={{ background: 'white' }}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Exquisite Selection</span>
                    <h2 className="section-title">Featured Products</h2>
                    <div className="section-line" />
                </div>
                <div className="products-grid">
                    {products.slice(0, 8).map((p, i) => (
                        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} index={i} />
                    ))}
                </div>
            </div>
        </section>

        {/* Luxury Banner */}
        <section className="banner">
            <div className="banner-bg">
                <img src={IMG.banner} alt="Luxury Collection" />
                <div className="banner-overlay" />
            </div>
            <motion.div className="banner-content"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <span className="section-label">Legacy Handcraft</span>
                <h2>Eternal Radiance</h2>
                <p>Every piece in our Legacy Collection tells a unique story of artisanal skill and timeless beauty.</p>
                <Link to="/category/all" className="btn btn-primary btn-lg">Discover More</Link>
            </motion.div>
        </section>

        {/* More Products */}
        <section className="section" style={{ background: 'var(--pearl)' }}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Latest Arrivals</span>
                    <h2 className="section-title">New In Store</h2>
                    <div className="section-line" />
                </div>
                <div className="products-grid">
                    {products.slice(8, 16).map((p, i) => (
                        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} index={i} />
                    ))}
                </div>
            </div>
        </section>

        {/* Features Strip */}
        <section className="features-strip">
            <div className="container">
                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon"><Truck size={22} /></div>
                        <div className="feature-text"><h4>Free Shipping</h4><p>On orders over $500</p></div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon"><Shield size={22} /></div>
                        <div className="feature-text"><h4>Authenticity</h4><p>100% certified genuine</p></div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon"><Gift size={22} /></div>
                        <div className="feature-text"><h4>Gift Wrapping</h4><p>Complimentary luxury box</p></div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon"><RefreshCw size={22} /></div>
                        <div className="feature-text"><h4>Easy Returns</h4><p>30-day return policy</p></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

/* ===== PRODUCT DETAILS ===== */
const ProductDetails = ({ products, onAddToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id)) || products[0];
    const [qty, setQty] = useState(1);
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="product-detail">
            <div className="container">
                <div className="product-detail-grid">
                    <div className="product-detail-img">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div>
                        <div className="breadcrumb">
                            <Link to="/">Home</Link> <ChevronRight size={12} />
                            <Link to={`/category/${product.category.toLowerCase()}`}>{product.category}</Link> <ChevronRight size={12} />
                            <span className="active">{product.name}</span>
                        </div>
                        <h1 className="detail-title">{product.name}</h1>
                        <div className="detail-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? 'currentColor' : 'none'} />)}
                            </div>
                            <span className="rating-text">12 Reviews</span>
                        </div>
                        <div className="detail-price">${(product.price * qty).toLocaleString()}</div>
                        <p className="detail-desc">{product.description}</p>

                        <div className="qty-section">
                            <label>Quantity</label>
                            <div className="qty-control">
                                <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
                                <span>{qty}</span>
                                <button onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
                            </div>
                        </div>

                        <div className="detail-actions">
                            <button className="btn btn-dark btn-full btn-lg" onClick={() => onAddToCart({ ...product, quantity: qty })}>
                                <ShoppingBag size={20} /> Add to Bag
                            </button>
                        </div>

                        <div className="detail-features">
                            <div className="detail-feature">
                                <CheckCircle size={18} />
                                <div><h5>Complimentary Shipping</h5><p>Delivered in 2-4 business days.</p></div>
                            </div>
                            <div className="detail-feature">
                                <CheckCircle size={18} />
                                <div><h5>Elegantly Packaged</h5><p>Signature Luna Gift Box & Authenticity Certificate.</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div style={{ marginTop: '80px' }}>
                        <div className="section-header">
                            <span className="section-label">You May Also Like</span>
                            <h2 className="section-title">Related Products</h2>
                            <div className="section-line" />
                        </div>
                        <div className="products-grid">
                            {related.map((p, i) => (
                                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ===== CATEGORY PAGE with WORKING SORT ===== */
const CategoryPage = ({ products, onAddToCart }) => {
    const { catId } = useParams();
    const [sortBy, setSortBy] = useState('newest');

    const baseProducts = catId === 'all'
        ? products
        : products.filter(p => p.category.toLowerCase() === catId.toLowerCase());

    const sorted = [...baseProducts].sort((a, b) => {
        if (sortBy === 'low') return a.price - b.price;
        if (sortBy === 'high') return b.price - a.price;
        return 0; // newest = default order
    });

    return (
        <div className="category-page">
            <div className="container">
                <div className="category-page-header">
                    <h1>{catId === 'all' ? 'All Products' : catId}</h1>
                    <p>Showing {sorted.length} exquisite pieces</p>
                </div>
                <div className="category-layout">
                    <aside className="category-sidebar">
                        <div className="filter-group">
                            <h4>Sort By Price</h4>
                            <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                                <option value="newest">Newest First</option>
                                <option value="low">Price: Low to High</option>
                                <option value="high">Price: High to Low</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <h4>Categories</h4>
                            <Link to="/category/all" className="filter-link" style={{ display: 'block', padding: '8px 0', fontSize: '14px', color: catId === 'all' ? 'var(--gold)' : 'var(--text-medium)' }}>All Products</Link>
                            {CATEGORIES.map(c => (
                                <Link key={c.id} to={`/category/${c.id}`} className="filter-link" style={{ display: 'block', padding: '8px 0', fontSize: '14px', color: catId === c.id ? 'var(--gold)' : 'var(--text-medium)', fontWeight: catId === c.id ? 700 : 400 }}>
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                    </aside>
                    <div className="category-products">
                        <div className="products-grid products-grid-3">
                            {sorted.map((p, i) => (
                                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ===== CART ===== */
const CartPage = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    return (
        <div className="cart-page">
            <div className="container">
                <h1>Shopping Bag</h1>
                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <ShoppingBag size={64} />
                        <p>Your bag is currently empty.</p>
                        <Link to="/category/all" className="btn btn-dark">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div>
                            {cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-img"><img src={item.image} alt={item.name} /></div>
                                    <div className="cart-item-details">
                                        <div className="cart-item-top">
                                            <div>
                                                <div className="cart-item-name">{item.name}</div>
                                                <div className="cart-item-cat">{item.category}</div>
                                            </div>
                                            <div className="cart-item-price">${(item.price * item.quantity).toLocaleString()}</div>
                                        </div>
                                        <div className="cart-item-bottom">
                                            <div className="qty-control">
                                                <button onClick={() => onUpdateQuantity(item.id, -1)}><Minus size={14} /></button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, 1)}><Plus size={14} /></button>
                                            </div>
                                            <button className="remove-btn" onClick={() => onRemoveFromCart(item.id)}>
                                                <Trash2 size={14} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-row"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                            <div className="summary-row"><span>Shipping</span><span className="free">Free</span></div>
                            <div className="summary-row"><span>Tax</span><span>Calculated at checkout</span></div>
                            <div className="summary-row total"><span>Total</span><span>${subtotal.toLocaleString()}</span></div>
                            <Link to="/checkout" className="btn btn-dark btn-full" style={{ marginTop: '20px' }}>Proceed to Checkout</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ===== CHECKOUT ===== */
const CheckoutPage = ({ cart }) => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>
                <div className="checkout-grid">
                    <div>
                        <div className="checkout-box">
                            <h3>Shipping Information</h3>
                            <div className="form-grid">
                                <input className="form-input" type="text" placeholder="First Name" />
                                <input className="form-input" type="text" placeholder="Last Name" />
                                <input className="form-input full" type="email" placeholder="Email Address" />
                                <input className="form-input full" type="text" placeholder="Street Address" />
                                <input className="form-input" type="text" placeholder="City" />
                                <input className="form-input" type="text" placeholder="Postal Code" />
                            </div>
                        </div>
                        <div className="checkout-box">
                            <h3>Payment Method</h3>
                            <label className="payment-option">
                                <input type="radio" name="payment" defaultChecked />
                                <span>Credit / Debit Card</span>
                            </label>
                            <div className="form-grid" style={{ marginTop: '16px' }}>
                                <input className="form-input full" type="text" placeholder="Card Number" />
                                <input className="form-input" type="text" placeholder="MM / YY" />
                                <input className="form-input" type="text" placeholder="CVV" />
                            </div>
                        </div>
                    </div>
                    <div className="checkout-summary">
                        <h3>Order Summary</h3>
                        {cart.map(item => (
                            <div key={item.id} className="checkout-item">
                                <span>{item.name} × {item.quantity}</span>
                                <span className="bold">${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="summary-row" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '16px' }}>
                            <span>Subtotal</span><span>${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row total"><span>Total</span><span className="gold">${subtotal.toLocaleString()}</span></div>
                        <button className="btn btn-dark btn-full" style={{ marginTop: '20px' }}>Complete Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ===== ACCOUNT ===== */
const AccountPage = () => (
    <div className="account-page">
        <div className="container">
            <div className="account-layout">
                <div className="account-sidebar">
                    <div className="account-profile-card">
                        <div className="account-avatar">JD</div>
                        <h3>John Doe</h3>
                        <p>Member since 2023</p>
                    </div>
                    <div className="account-nav">
                        <button className="active">Profile Settings</button>
                        <button>My Orders</button>
                        <button>Wishlist</button>
                        <button className="danger">Log Out</button>
                    </div>
                </div>
                <div className="account-content">
                    <h1>Profile Settings</h1>
                    <div className="account-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input className="form-input" type="text" defaultValue="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input className="form-input" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input className="form-input" type="text" defaultValue="+1 234 567 890" />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <button className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

/* ===== ADMIN DASHBOARD — WELL-DESIGNED & CLICKABLE ===== */
const AdminDashboard = ({ products }) => {
    const [activeTab, setActiveTab] = useState('products');

    // AI conversations mock data
    const aiConversations = [
        { id: 1, user: 'Klienti #1042', message: 'Po kërkoj një dhuratë për motrën', response: 'Për një dhuratë elegante ju rekomandoj varëse minimaliste...', time: '2 min ago' },
        { id: 2, user: 'Klienti #1043', message: 'Sa kushton unaza me diamant?', response: 'Çmimet tona variojnë nga $890 deri në $3,400...', time: '15 min ago' },
        { id: 3, user: 'Klienti #1044', message: 'Pershendetje, si jeni?', response: 'Pershendetje! Jam ORLINA, AI asistenti...', time: '1 hour ago' },
        { id: 4, user: 'Klienti #1045', message: 'A keni orë luksoze?', response: 'Po! Kemi orë fantastike Swiss-made...', time: '2 hours ago' },
    ];

    // Orders mock
    const orders = [
        { id: '#ORD-2024-001', customer: 'Elena Hoxha', items: 2, total: 4050, status: 'Delivered', date: 'Mar 8, 2024' },
        { id: '#ORD-2024-002', customer: 'Arben Krasniqi', items: 1, total: 2800, status: 'Processing', date: 'Mar 9, 2024' },
        { id: '#ORD-2024-003', customer: 'Fjolla Berisha', items: 3, total: 6450, status: 'Shipped', date: 'Mar 9, 2024' },
        { id: '#ORD-2024-004', customer: 'Driton Gashi', items: 1, total: 7800, status: 'Pending', date: 'Mar 9, 2024' },
    ];

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p style={{ color: 'var(--text-light)', fontSize: '14px', marginTop: '4px' }}>Welcome back! Here's what's happening.</p>
                    </div>
                    <div className="admin-header-actions">
                        <button className="btn btn-dark"><Plus size={18} /> Add Product</button>
                        <button className="btn" style={{ color: 'var(--midnight)', border: '2px solid var(--midnight)' }}>Export Data</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-card-header"><span>Total Sales</span><TrendingUp size={20} style={{ color: '#22c55e' }} /></div>
                        <div className="stat-value">$124,500</div>
                        <div className="stat-change positive">+12% from last month</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header"><span>Active Orders</span><ShoppingCart size={20} style={{ color: 'var(--midnight)' }} /></div>
                        <div className="stat-value">48</div>
                        <div className="stat-change neutral">6 pending approval</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header"><span>Inventory</span><Package size={20} style={{ color: 'var(--midnight)' }} /></div>
                        <div className="stat-value">{products.length}</div>
                        <div className="stat-change negative">{products.filter(p => p.stock < 5).length} low stock items</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header"><span>AI Interactions</span><MessageSquare size={20} style={{ color: 'var(--violet)' }} /></div>
                        <div className="stat-value">1,204</div>
                        <div className="stat-change positive">94% resolution rate</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                    <button className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
                        <Package size={18} /> Products
                    </button>
                    <button className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                        <ShoppingCart size={18} /> Orders
                    </button>
                    <button className={`admin-tab ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
                        <MessageSquare size={18} /> AI Agent
                    </button>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="data-table-wrapper">
                        <div className="data-table-header">
                            <h3>Product Management ({products.length} products)</h3>
                            <button>View All</button>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td><div className="table-product"><img src={p.image} alt="" /><span>{p.name}</span></div></td>
                                        <td>{p.category}</td>
                                        <td className="price-gold">${p.price.toLocaleString()}</td>
                                        <td>{p.stock}</td>
                                        <td><span className={`status-badge ${p.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>{p.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
                                        <td><div className="table-actions"><button className="edit">Edit</button><button className="delete">Delete</button></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="data-table-wrapper">
                        <div className="data-table-header">
                            <h3>Order Management</h3>
                            <button>Export Orders</button>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.id}>
                                        <td style={{ fontWeight: 600 }}>{o.id}</td>
                                        <td>{o.customer}</td>
                                        <td>{o.items}</td>
                                        <td className="price-gold">${o.total.toLocaleString()}</td>
                                        <td><span className={`status-badge ${o.status === 'Delivered' ? 'in-stock' : o.status === 'Pending' ? 'out-of-stock' : 'in-stock'}`} style={o.status === 'Processing' ? { background: '#fef3c7', color: '#92400e' } : o.status === 'Shipped' ? { background: '#dbeafe', color: '#1e40af' } : {}}>{o.status}</span></td>
                                        <td>{o.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* AI Tab */}
                {activeTab === 'ai' && (
                    <div className="data-table-wrapper">
                        <div className="data-table-header">
                            <h3>AI Agent Monitoring — ORLINA</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '13px', fontWeight: 600 }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} /> Active
                            </div>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr><th>User</th><th>Message</th><th>AI Response</th><th>Time</th></tr>
                            </thead>
                            <tbody>
                                {aiConversations.map(c => (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: 600 }}>{c.user}</td>
                                        <td style={{ maxWidth: '200px' }}>"{c.message}"</td>
                                        <td style={{ maxWidth: '250px', color: 'var(--text-medium)' }}>{c.response}</td>
                                        <td style={{ color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{c.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ===== ORLINA AI AGENT ===== */
const OrlinaAI = ({ products }) => {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([
        { role: 'ai', text: "Hello! I am ORLINA, the AI assistant for Orlina Jewelry. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const msgEndRef = useRef(null);

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs, typing]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userText = input;
        const lc = userText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        setMsgs(prev => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setTyping(true);

        setTimeout(() => {
            let response = '';
            if (lc.includes('mirmengjes') || lc.includes('miremengjesi') || lc.includes('morning'))
                response = "Good morning and welcome to Orlina Jewelry. How can I help you today?";
            else if (lc.includes('miredita') || lc.includes('mir dita') || lc.includes('afternoon'))
                response = "Good afternoon! Thank you for visiting Orlina Jewelry. What kind of accessories are you looking for?";
            else if (lc.includes('mirembrema') || lc.includes('evening'))
                response = "Good evening! I'm here to help you find the perfect accessory.";
            else if (lc.includes('pershendetje') || lc.includes('si jeni') || lc.includes('hello') || lc.includes('hi'))
                response = "Hello! I am ORLINA, your AI assistant. How can I assist you?";
            else if (lc.includes('dhurate') || lc.includes('vajze') || lc.includes('gift'))
                response = "For an elegant gift, I recommend:\n• A minimalist pendant\n• A luxury bracelet\n• An elegant ring\n\nWould you like me to show you some specific options?";
            else if (lc.includes('cmim') || lc.includes('sa kushton') || lc.includes('price') || lc.includes('cost'))
                response = "Our prices range from $680 to $12,400. What type of accessory are you looking for?";
            else if (lc.includes('unaze') || lc.includes('ring')) {
                const rings = products.filter(p => p.category === 'Rings');
                response = `We have fantastic rings! I suggest:\n• "${rings[0]?.name}" — $${rings[0]?.price?.toLocaleString()}\n• "${rings[1]?.name}" — $${rings[1]?.price?.toLocaleString()}\n• "${rings[2]?.name}" — $${rings[2]?.price?.toLocaleString()}`;
            } else if (lc.includes('necklace') || lc.includes('varese') || lc.includes('qafe')) {
                const n = products.filter(p => p.category === 'Necklaces');
                response = `Our necklaces:\n• "${n[0]?.name}" — $${n[0]?.price?.toLocaleString()}\n• "${n[1]?.name}" — $${n[1]?.price?.toLocaleString()}`;
            } else if (lc.includes('bracelet') || lc.includes('byzylyk')) {
                const b = products.filter(p => p.category === 'Bracelets');
                response = `Our bracelets:\n• "${b[0]?.name}" — $${b[0]?.price?.toLocaleString()}\n• "${b[1]?.name}" — $${b[1]?.price?.toLocaleString()}`;
            } else if (lc.includes('ore') || lc.includes('watch') || lc.includes('ora')) {
                const w = products.filter(p => p.category === 'Watches');
                response = `Luxury watches:\n• "${w[0]?.name}" — $${w[0]?.price?.toLocaleString()}\n• "${w[1]?.name}" — $${w[1]?.price?.toLocaleString()}`;
            } else if (lc.includes('porosi') || lc.includes('order'))
                response = "For order information, please visit 'My Account' or provide your order number.";
            else if (lc.includes('help') || lc.includes('ndihm'))
                response = "I can help you with:\n• Product search\n• Gift recommendations\n• Pricing information\n• Order status";
            else
                response = "Thank you for your message! I can help you search for products, find gift recommendations, or provide pricing information.";

            setMsgs(prev => [...prev, { role: 'ai', text: response }]);
            setTyping(false);
        }, 1200);
    };

    return (
        <div className="buna-container">
            <AnimatePresence>
                {open && (
                    <motion.div className="buna-window"
                        initial={{ scale: 0.8, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 40 }}
                    >
                        <div className="buna-header">
                            <div className="buna-header-info">
                                <div className="buna-avatar">O</div>
                                <div><div className="buna-name">ORLINA AI</div><div className="buna-status"><span className="buna-status-dot" /> Online Now</div></div>
                            </div>
                            <button className="buna-close" onClick={() => setOpen(false)}><X size={22} /></button>
                        </div>
                        <div className="buna-messages">
                            {msgs.map((m, i) => (
                                <div key={i} className={`buna-msg ${m.role}`}>
                                    {m.text.split('\n').map((line, li) => <p key={li}>{line}</p>)}
                                </div>
                            ))}
                            {typing && <div className="buna-typing"><span /><span /><span /></div>}
                            <div ref={msgEndRef} />
                        </div>
                        <div className="buna-input-area">
                            <input className="buna-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type your message..." />
                            <button className="buna-send" onClick={handleSend}><Send size={18} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button className="buna-toggle" onClick={() => setOpen(!open)}>
                {open ? <X size={26} /> : <MessageSquare size={26} />}
            </button>
        </div>
    );
};

/* ===== SEARCH OVERLAY ===== */
const SearchOverlay = ({ isOpen, onClose, products }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
        }
    }, [isOpen]);

    const filtered = query.trim() === '' ? [] : products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="search-overlay"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                    <div className="search-container">
                        <div className="search-box">
                            <Search className="search-icon" size={24} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for rings, necklaces, watches..."
                            />
                            <button onClick={onClose}><X size={24} /></button>
                        </div>

                        <div className="search-results">
                            {filtered.length > 0 ? (
                                filtered.map(p => (
                                    <Link key={p.id} to={`/category/${p.category.toLowerCase()}`} onClick={() => { onClose(); window.scrollTo(0, 0); }} className="search-result-item">
                                        <img src={p.image} alt={p.name} />
                                        <div>
                                            <h4>{p.name}</h4>
                                            <p>{p.category} • ${p.price.toLocaleString()}</p>
                                        </div>
                                        <ArrowRight size={16} />
                                    </Link>
                                ))
                            ) : query.trim() !== '' ? (
                                <p className="no-results">No products found for "{query}"</p>
                            ) : (
                                <div className="search-popular">
                                    <p>Popular Searches</p>
                                    <div className="popular-tags">
                                        <button onClick={() => setQuery('Diamond')}>Diamond</button>
                                        <button onClick={() => setQuery('Gold')}>Gold</button>
                                        <button onClick={() => setQuery('Watch')}>Watch</button>
                                        <button onClick={() => setQuery('Engagement')}>Engagement</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="search-backdrop" onClick={onClose} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ===== APP ===== */
const App = () => {
    const [cart, setCart] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);

    const onAddToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + (product.quantity || 1) } : i);
            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
    };

    const onRemoveFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
    const onUpdateQuantity = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
    const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

    return (
        <Router>
            <div className="app">
                <Navbar cartCount={cartCount} onSearchClick={() => setSearchOpen(true)} />
                <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} products={ALL_PRODUCTS} />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home products={ALL_PRODUCTS} onAddToCart={onAddToCart} />} />
                        <Route path="/product/:id" element={<ProductDetails products={ALL_PRODUCTS} onAddToCart={onAddToCart} />} />
                        <Route path="/category/:catId" element={<CategoryPage products={ALL_PRODUCTS} onAddToCart={onAddToCart} />} />
                        <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={onRemoveFromCart} onUpdateQuantity={onUpdateQuantity} />} />
                        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/admin" element={<AdminDashboard products={ALL_PRODUCTS} />} />
                    </Routes>
                </main>
                <Footer />
                <OrlinaAI products={ALL_PRODUCTS} />
            </div>
        </Router>
    );
};

export default App;
