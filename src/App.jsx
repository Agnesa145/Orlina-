import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import {
    ShoppingBag, Search, User, Menu, X, Heart, MessageSquare,
    ArrowRight, Star, ChevronRight, Trash2, Plus, Minus,
    CheckCircle, LayoutDashboard, Package, ShoppingCart,
    TrendingUp, Truck, Shield, Gift, RefreshCw, Send, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { dbInput } from './lib/db';

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
const Navbar = ({ cartCount, onSearchClick, scrollProgress, user }) => {
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
                {/* Scroll Progress Bar */}
                <motion.div 
                    className="scroll-progress-bar"
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        height: '3px', 
                        background: 'var(--gold)', 
                        width: `${scrollProgress}%`,
                        zIndex: 1001
                    }} 
                />
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
                        <button onClick={onSearchClick}><Search size={20} /></button>
                        <Link to="/account" title={user ? user.name : 'Login'} className="badge-container">
                            <User size={20} style={user ? { color: 'var(--gold)' } : {}} />
                            {user?.role === 'admin' && <span className="admin-badge-dot" />}
                        </Link>
                        {user?.role === 'admin' && <Link to="/admin" title="Admin Dashboard" className="admin-tab-link"><LayoutDashboard size={20} /></Link>}
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

/* ===== ANIMATED COUNTER HOOK ===== */
const useCounter = (target, duration = 2000, start = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
};

/* ===== STAT COUNTER CARD ===== */
const StatCard = ({ value, suffix, label, icon }) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    const count = useCounter(value, 2000, inView);
    return (
        <motion.div ref={ref} className="stat-anim-card"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ duration: 0.5 }}
        >
            <div className="stat-anim-icon">{icon}</div>
            <div className="stat-anim-number">{count.toLocaleString()}{suffix}</div>
            <div className="stat-anim-label">{label}</div>
        </motion.div>
    );
};

/* ===== FLOATING PARTICLE ===== */
const Particle = ({ style }) => (
    <motion.div
        className="hero-particle"
        style={style}
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.4, 1] }}
        transition={{ duration: style.duration || 4, repeat: Infinity, ease: 'easeInOut', delay: style.delay || 0 }}
    />
);

/* ===== HOME PAGE ===== */
const Home = ({ products, onAddToCart }) => {
    const particles = [
        { top: '15%', left: '8%', width: 6, height: 6, delay: 0, duration: 3.5 },
        { top: '25%', left: '18%', width: 4, height: 4, delay: 0.8, duration: 4.2 },
        { top: '60%', left: '5%', width: 8, height: 8, delay: 1.5, duration: 3.8 },
        { top: '80%', left: '12%', width: 3, height: 3, delay: 0.3, duration: 5.1 },
        { top: '10%', right: '10%', width: 5, height: 5, delay: 0.6, duration: 4.0 },
        { top: '35%', right: '7%', width: 7, height: 7, delay: 1.2, duration: 3.4 },
        { top: '70%', right: '15%', width: 4, height: 4, delay: 0.9, duration: 4.8 },
        { top: '50%', left: '50%', width: 5, height: 5, delay: 2.0, duration: 3.6 },
        { top: '88%', right: '25%', width: 6, height: 6, delay: 1.7, duration: 4.5 },
        { top: '42%', left: '30%', width: 3, height: 3, delay: 0.4, duration: 5.5 },
    ];

    return (
    <div>
        {/* ===== ANIMATED HERO ===== */}
        <section className="v3-hero">
            <div className="v3-hero-bg">
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, #0B1120 0%, #05080f 100%)'
                }} />
                {/* Animated teal glow orb 1 */}
                <motion.div
                    style={{
                        position: 'absolute', top: '-20%', left: '-10%', width: '70%', height: '90%',
                        background: 'radial-gradient(circle, rgba(20, 100, 100, 0.4) 0%, transparent 70%)',
                        filter: 'blur(100px)',
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Animated gold glow orb 2 */}
                <motion.div
                    style={{
                        position: 'absolute', bottom: '-10%', right: '-5%', width: '55%', height: '70%',
                        background: 'radial-gradient(circle, rgba(180, 140, 60, 0.25) 0%, transparent 70%)',
                        filter: 'blur(120px)',
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
                <div className="v3-hero-overlay" />

                {/* Floating Particles */}
                {particles.map((p, i) => (
                    <Particle key={i} style={{ position: 'absolute', ...p }} />
                ))}
            </div>

            <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Side Jewellery Accents */}
                <motion.div className="v3-jewelry v3-left"
                    initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
                    whileHover={{ scale: 1.06, rotate: 2 }}
                >
                    <img src="https://images.pexels.com/photos/12144990/pexels-photo-12144990.jpeg?auto=compress&w=600" alt="Earrings" />
                    <motion.div className="jewelry-shine"
                        animate={{ opacity: [0, 0.6, 0], x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                </motion.div>

                <motion.div className="v3-jewelry v3-right"
                    initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1.2, type: 'spring' }}
                    whileHover={{ scale: 1.06, rotate: -2 }}
                >
                    <img src="https://images.pexels.com/photos/6154083/pexels-photo-6154083.jpeg?auto=compress&w=600" alt="Necklace" />
                    <motion.div className="jewelry-shine"
                        animate={{ opacity: [0, 0.6, 0], x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, delay: 1.5 }}
                    />
                </motion.div>

                <div className="v3-hero-content">
                    <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1, type: 'spring' }}
                        style={{ textAlign: 'center' }}
                    >
                        <motion.span className="v3-brand-label"
                            initial={{ letterSpacing: '0.2em', opacity: 0 }}
                            animate={{ letterSpacing: '0.4em', opacity: 1 }}
                            transition={{ delay: 1, duration: 1.2 }}
                        >ORLINA JEWELRY</motion.span>

                        <h1 className="v3-main-title hero-shimmer-text">Timeless Craft.<br />Modern Elegance.</h1>

                        <motion.p className="v3-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        >Exquisite Handcrafted Pieces for Every Occasion</motion.p>

                        <motion.div className="v3-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.7, duration: 0.8 }}
                        >
                            <Link to="/category/all" className="v3-btn hero-btn-pulse">SHOP NOW</Link>
                        </motion.div>

                        {/* Animated scroll indicator */}
                        <motion.div className="hero-scroll-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5 }}
                        >
                            <motion.div className="scroll-dot"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* ===== ANIMATED STATS SECTION ===== */}
        <section className="stats-section">
            <div className="container">
                <div className="stats-anim-grid">
                    <StatCard value={2500} suffix="+" label="Happy Clients" icon={<Star size={28} />} />
                    <StatCard value={500} suffix="+" label="Unique Designs" icon={<Gift size={28} />} />
                    <StatCard value={19} suffix="yr" label="Years of Craft" icon={<Shield size={28} />} />
                    <StatCard value={98} suffix="%" label="Satisfaction Rate" icon={<CheckCircle size={28} />} />
                </div>
            </div>
        </section>

        {/* ===== CATEGORIES ===== */}
        <section className="section" style={{ background: 'var(--pearl)' }}>
            <div className="container">
                <div className="section-header-row">
                    <div>
                        <motion.span className="section-label"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >Categories</motion.span>
                        <motion.h2 className="section-title"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >Explore Collections</motion.h2>
                    </div>
                    <Link to="/category/all" className="view-all">View All <ArrowRight size={16} /></Link>
                </div>
                <div className="categories-grid">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div key={cat.id}
                            initial={{ y: 60, opacity: 0, scale: 0.95 }}
                            whileInView={{ y: 0, opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, type: 'spring', stiffness: 100 }}
                            whileHover={{ y: -8 }}
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

        {/* ===== FEATURED PRODUCTS ===== */}
        <section className="section" style={{ background: 'white' }}>
            <div className="container">
                <div className="section-header">
                    <motion.span className="section-label"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >Exquisite Selection</motion.span>
                    <motion.h2 className="section-title"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >Featured Products</motion.h2>
                    <div className="section-line" />
                </div>
                <div className="products-grid">
                    {products.slice(0, 8).map((p, i) => (
                        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} index={i} />
                    ))}
                </div>
            </div>
        </section>

        {/* ===== MARQUEE LUXURY STRIP ===== */}
        <div className="marquee-strip">
            <motion.div className="marquee-inner"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                {['DIAMONDS', 'GOLD', 'PLATINUM', 'LUXURY', 'HANDCRAFTED', 'ELEGANCE', 'TIMELESS', 'ORLINA',
                  'DIAMONDS', 'GOLD', 'PLATINUM', 'LUXURY', 'HANDCRAFTED', 'ELEGANCE', 'TIMELESS', 'ORLINA'
                ].map((word, i) => (
                    <span key={i} className="marquee-word">{word} <span className="marquee-dot">✦</span> </span>
                ))}
            </motion.div>
        </div>

        {/* ===== LUXURY BANNER ===== */}
        <section className="banner">
            <div className="banner-bg">
                <img src={IMG.banner} alt="Luxury Collection" />
                <div className="banner-overlay" />
            </div>
            <motion.div className="banner-content"
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, type: 'spring' }}
            >
                <span className="section-label">Legacy Handcraft</span>
                <h2>Eternal Radiance</h2>
                <p>Every piece in our Legacy Collection tells a unique story of artisanal skill and timeless beauty.</p>
                <Link to="/category/all" className="btn btn-primary btn-lg">Discover More</Link>
            </motion.div>
        </section>

        {/* ===== MORE PRODUCTS ===== */}
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

        {/* ===== TESTIMONIALS ===== */}
        <section className="testimonials-section">
            <div className="container">
                <motion.div className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="section-label">What Clients Say</span>
                    <h2 className="section-title">Loved by Thousands</h2>
                    <div className="section-line" />
                </motion.div>
                <div className="testimonials-grid">
                    {[
                        { name: 'Elena Hoxha', text: 'The diamond ring I ordered was absolutely breathtaking. Orlina truly delivers luxury at its finest!', stars: 5, loc: 'Tirana, Albania' },
                        { name: 'Sarah Johnson', text: 'Impeccable craftsmanship and fast delivery. The jewelry exceeded all my expectations!', stars: 5, loc: 'New York, USA' },
                        { name: 'Fjolla Berisha', text: 'Mora byzylykun e artë si dhuratë. Ishte mahnitës! Jam klientja e tyre e devotshme.', stars: 5, loc: 'Prishtina, Kosovo' },
                    ].map((t, i) => (
                        <motion.div key={i} className="testimonial-card"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
                        >
                            <div className="testimonial-stars">
                                {[...Array(t.stars)].map((_, si) => <Star key={si} size={16} fill="#c9a84c" color="#c9a84c" />)}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">{t.name[0]}</div>
                                <div>
                                    <div className="testimonial-name">{t.name}</div>
                                    <div className="testimonial-loc">{t.loc}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ===== FEATURES STRIP ===== */}
        <section className="features-strip">
            <div className="container">
                <div className="features-grid">
                    {[
                        { icon: <Truck size={22} />, title: 'Free Shipping', sub: 'On orders over $500' },
                        { icon: <Shield size={22} />, title: 'Authenticity', sub: '100% certified genuine' },
                        { icon: <Gift size={22} />, title: 'Gift Wrapping', sub: 'Complimentary luxury box' },
                        { icon: <RefreshCw size={22} />, title: 'Easy Returns', sub: '30-day return policy' },
                    ].map((f, i) => (
                        <motion.div key={i} className="feature-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.04 }}
                        >
                            <div className="feature-icon">{f.icon}</div>
                            <div className="feature-text"><h4>{f.title}</h4><p>{f.sub}</p></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    </div>
    );
};

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
                        <motion.div 
                            className="products-grid products-grid-3"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.15 }
                                }
                            }}
                        >
                            {sorted.map((p, i) => (
                                <motion.div 
                                    key={p.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25 } }
                                    }}
                                >
                                    <ProductCard product={p} onAddToCart={onAddToCart} index={i} />
                                </motion.div>
                            ))}
                        </motion.div>
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
const CheckoutPage = ({ cart, onOrderSuccess }) => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePurchase = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Save to DB
        const formData = new FormData(e.target);
        const orderData = {
            customer: `${formData.get('first')} ${formData.get('last')}`,
            customerEmail: formData.get('email'),
            items: cart.reduce((s, i) => s + i.quantity, 0),
            total: subtotal,
            products: cart.map(i => i.name)
        };
        
        dbInput.addOrder(orderData);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            onOrderSuccess();
            window.scrollTo(0,0);
        }, 1500);
    };

    if (success) return (
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
            <CheckCircle size={64} color="#22c55e" style={{ marginBottom: '20px' }} />
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for choosing Orlina Jewelry. Your order is being processed.</p>
            <Link to="/" className="btn btn-dark" style={{ marginTop: '32px' }}>Back to Home</Link>
        </div>
    );

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>
                <form onSubmit={handlePurchase} className="checkout-grid">
                    <div>
                        <div className="checkout-box">
                            <h3>Shipping Information</h3>
                            <div className="form-grid">
                                <input className="form-input" name="first" type="text" placeholder="First Name" required />
                                <input className="form-input" name="last" type="text" placeholder="Last Name" required />
                                <input className="form-input full" name="email" type="email" placeholder="Email Address" required />
                                <input className="form-input full" type="text" placeholder="Street Address" required />
                                <input className="form-input" type="text" placeholder="City" required />
                                <input className="form-input" type="text" placeholder="Postal Code" required />
                            </div>
                        </div>
                        <div className="checkout-box">
                            <h3>Payment Method</h3>
                            <label className="payment-option">
                                <input type="radio" name="payment" defaultChecked />
                                <span>Credit / Debit Card</span>
                            </label>
                            <div className="form-grid" style={{ marginTop: '16px' }}>
                                <input className="form-input full" type="text" placeholder="Card Number" required />
                                <input className="form-input" type="text" placeholder="MM / YY" required />
                                <input className="form-input" type="text" placeholder="CVV" required />
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
                        <button className="btn btn-dark btn-full" disabled={loading} style={{ marginTop: '20px' }}>
                            {loading ? 'Processing...' : 'Complete Purchase'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/* ===== ACCOUNT PAGE — REAL LOGIN & SIGNUP ===== */
const AccountPage = ({ user, onLogin, onSignup, onLogout }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [activeTab, setActiveTab] = useState('settings');
    const [role, setRole] = useState('user'); // New role state for signup
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const db = dbInput.get();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const fd = new FormData(e.target);
        
        setTimeout(() => {
            if (isLogin) {
                const u = onLogin(fd.get('email'), fd.get('pass'));
                if (!u) setError('Invalid email or password.');
            } else {
                const u = onSignup(fd.get('name'), fd.get('email'), fd.get('pass'), role);
                if (u?.error) setError(u.error);
            }
            setLoading(false);
        }, 800);
    };

    if (!user) return (
        <div className="container">
            <div className="auth-container">
                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p>{isLogin ? 'Sign in to access your orders' : 'Join our club of jewelry lovers'}</p>
                
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <>
                            <input className="form-input" name="name" type="text" placeholder="Full Name" required />
                            <div className="role-selector">
                                <label className={role === 'user' ? 'active' : ''}>
                                    <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} />
                                    <span>User</span>
                                </label>
                                <label className={role === 'admin' ? 'active' : ''}>
                                    <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                                    <span>Admin</span>
                                </label>
                            </div>
                        </>
                    )}
                    <input className="form-input" name="email" type="email" placeholder="Email Address" required />
                    <input className="form-input" name="pass" type="password" placeholder="Password" required />
                    <button className="btn btn-dark btn-full" disabled={loading}>
                        {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div className="auth-switch">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Log In'}</button>
                </div>
            </div>
        </div>
    );

    const myOrders = db.orders.filter(o => o.customerEmail === user.email);

    return (
        <div className="account-page">
            <div className="container">
                <div className="account-layout">
                    <div className="account-sidebar">
                        <div className="account-profile-card">
                            <div className="account-avatar">{user.name.split(' ').map(n=>n[0]).join('')}</div>
                            <h3>{user.name}</h3>
                            <p>{user.role === 'admin' ? 'Administrator' : 'Premium Member'}</p>
                        </div>
                        <div className="account-nav">
                            <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Profile Settings</button>
                            <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>My Orders ({myOrders.length})</button>
                            <button onClick={onLogout} className="danger">Log Out</button>
                        </div>
                    </div>
                    <div className="account-content">
                        {activeTab === 'settings' ? (
                            <>
                                <h1>Profile Settings</h1>
                                <div className="account-form">
                                    <div className="form-group"><label>Full Name</label><input className="form-input" type="text" defaultValue={user.name} /></div>
                                    <div className="form-group"><label>Email Address</label><input className="form-input" type="email" defaultValue={user.email} /></div>
                                    <div className="form-group"><label>Account Role</label><input className="form-input" type="text" disabled defaultValue={user.role} /></div>
                                    <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <button className="btn btn-primary">Save Changes</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>My Order History</h1>
                                {myOrders.length === 0 ? (
                                    <div className="empty-state">
                                        <Package size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                                        <p>You haven't placed any orders yet.</p>
                                        <Link to="/" className="btn btn-dark" style={{ marginTop: '16px' }}>Start Shopping</Link>
                                    </div>
                                ) : (
                                    <div className="data-table-wrapper">
                                        <table className="data-table">
                                            <thead><tr><th>Order ID</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
                                            <tbody>
                                                {myOrders.map(o => (
                                                    <tr key={o.id}>
                                                        <td style={{ fontWeight: 600 }}>{o.id}</td>
                                                        <td>{o.date}</td>
                                                        <td>{o.items}</td>
                                                        <td className="price-gold">${o.total.toLocaleString()}</td>
                                                        <td><span className={`status-badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ===== ADMIN DASHBOARD — FULLY FUNCTIONAL ===== */
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [dbState, setDbState] = useState(dbInput.get());
    const [showAddForm, setShowAddForm] = useState(false);

    const refresh = () => setDbState(dbInput.get());

    const handleToggleRole = (id, currentRole) => {
        if (id === 1) return; // Super admin protection
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        if (window.confirm(`Change user role to ${newRole}?`)) {
            const db = dbInput.get();
            db.users = db.users.map(u => u.id === id ? { ...u, role: newRole } : u);
            dbInput.save(db);
            refresh();
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dbInput.deleteProduct(id);
            refresh();
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        dbInput.addProduct({
            name: fd.get('name'),
            category: fd.get('category'),
            price: parseInt(fd.get('price')),
            stock: parseInt(fd.get('stock')),
            image: IMG.ring1 // Default mock image
        });
        setShowAddForm(false);
        refresh();
    };

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p style={{ color: 'var(--text-light)', fontSize: '14px', marginTop: '4px' }}>Managing Orlina Jewelry operations.</p>
                    </div>
                    <div className="admin-header-actions">
                        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-dark"><Plus size={18} /> Add Product</button>
                    </div>
                </div>

                {/* Add Product Form */}
                {showAddForm && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="admin-item-form">
                        <h3>Create New Product</h3>
                        <form onSubmit={handleAddProduct}>
                            <div className="form-row">
                                <input name="name" className="form-input" placeholder="Product Name" required />
                                <select name="category" className="form-input" required>
                                    {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="form-row">
                                <input name="price" className="form-input" type="number" placeholder="Price ($)" required />
                                <input name="stock" className="form-input" type="number" placeholder="Stock Quantity" required />
                            </div>
                            <div className="table-actions">
                                <button type="submit" className="btn btn-dark">Save Product</button>
                                <button type="button" onClick={() => setShowAddForm(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-card-header"><span>Sales</span><TrendingUp size={20} color="#22c55e" /></div>
                        <div className="stat-value">${dbState.orders.reduce((s,o)=>s+o.total, 0).toLocaleString()}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header"><span>Active Orders</span><ShoppingCart size={20} /></div>
                        <div className="stat-value">{dbState.orders.length}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header"><span>Products</span><Package size={20} /></div>
                        <div className="stat-value">{dbState.products.length}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header"><span>Conversations</span><MessageSquare size={20} /></div>
                        <div className="stat-value">{dbState.aiChats.length}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                    <button className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}><Package size={18} /> Products</button>
                    <button className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><ShoppingCart size={18} /> Orders</button>
                    <button className={`admin-tab ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}><MessageSquare size={18} /> AI Agent</button>
                </div>

                {activeTab === 'products' && (
                    <div className="data-table-wrapper">
                        <table className="data-table">
                            <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                            <tbody>
                                {dbState.products.map(p => (
                                    <tr key={p.id}>
                                        <td><div className="table-product"><img src={p.image} alt="" /><span>{p.name}</span></div></td>
                                        <td>{p.category}</td>
                                        <td className="price-gold">${p.price.toLocaleString()}</td>
                                        <td>{p.stock}</td>
                                        <td><div className="table-actions"><button onClick={() => handleDelete(p.id)} className="delete">Delete</button></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="data-table-wrapper">
                        <table className="data-table">
                            <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
                            <tbody>
                                {dbState.orders.map(o => (
                                    <tr key={o.id}>
                                        <td style={{ fontWeight: 600 }}>{o.id}</td>
                                        <td>{o.customer}<br/><small style={{color:'var(--text-light)'}}>{o.customerEmail}</small></td>
                                        <td>{o.items}</td>
                                        <td className="price-gold">${o.total.toLocaleString()}</td>
                                        <td><span className={`status-badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
                                        <td>{o.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="data-table-wrapper">
                        <table className="data-table">
                            <thead><tr><th>User Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                            <tbody>
                                {dbState.users.map(u => (
                                    <tr key={u.id}>
                                        <td style={{ fontWeight: 600 }}>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td><span className={`status-badge ${u.role}`}>{u.role}</span></td>
                                        <td>
                                            {u.id !== 1 && (
                                                <button onClick={() => handleToggleRole(u.id, u.role)} className="btn-text">
                                                    {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'ai' && (
                    <div className="data-table-wrapper">
                        <table className="data-table">
                            <thead><tr><th>User</th><th>Conversation Snippet</th><th>Time</th></tr></thead>
                            <tbody>
                                {dbState.aiChats.map(c => (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: 600 }}>{c.user}</td>
                                        <td style={{ maxWidth: '400px' }}>
                                            <strong>User:</strong> {c.message}<br/>
                                            <strong>AI:</strong> {c.response}
                                        </td>
                                        <td>Just now</td>
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

/* ===== ORLINA AI AGENT — POWERED BY GPT-4 ===== */
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1';

const OrlinaAI = ({ products }) => {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([
        { role: 'assistant', text: '💎 Welcome to Orlina Jewelry! I am ORLINA, your personal assistant. I can help you with products, pricing, gifts, or any other questions — in any language! ✨' }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [error, setError] = useState(null);
    const msgEndRef = useRef(null);

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs, typing]);

    const productCatalog = products.map(p =>
        `• ${p.name} (${p.category}) — $${p.price.toLocaleString()}, Stock: ${p.stock}`
    ).join('\n');

    const systemPrompt = `You are ORLINA, the sophisticated AI assistant for Orlina Jewelry — a luxury jewelry store.

Your personality:
- Elegant, warm, knowledgeable, and helpful
- If user writes in English, respond in English. match any language fluently.
- You are an expert in jewelry, gemstones, metals, and luxury accessories
- You can answer ANY question — not just about jewelry

About Orlina Jewelry:
- Premium luxury jewelry store since 2005
- Categories: Rings, Necklaces, Bracelets, Earrings, Watches
- Free shipping on orders over $500
- 30-day return policy
- Complimentary gift wrapping
- Certified authentic pieces

Current Product Catalog:
${productCatalog}

Guidelines:
- Keep responses concise and elegant (2-4 sentences usually)
- For product questions, reference specific items from the catalog
- For gift questions, suggest specific products with prices
- For general questions (history, science, etc.), answer helpfully and knowledgeably
- Always end with a relevant offer or question to continue the conversation
- Use elegant emojis sparingly (💎 ✨ 💍 👑)
- PRIMARY LANGUAGE: English (default to English unless user asks in another language)`;

    // ===== SMART MULTILINGUAL FALLBACK AI =====
    const localAI = (text) => {
        const t = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        // Language Detection (Defaults to EN, switches to SQ if Albanian detected)
        const isSq = /pershendet|tung|si je|si jeni|si jena|qmimi|sa kushton|dua|dhurat|unaz|ore|derges|porosi|blej|ndihm|mire|mengjes|mramje|drita|pse|mund/.test(t);
        const lang = isSq ? 'sq' : 'en'; 

        const rings = products.filter(p => p.category === 'Rings');
        const necklaces = products.filter(p => p.category === 'Necklaces');
        const watches = products.filter(p => p.category === 'Watches');

        const responses = {
            greet: {
                sq: `💎 Mirësevini në Orlina Jewelry! Jam ORLINA, asistenti juaj personal. Si mund t'ju ndihmoj sot?`,
                en: `💎 Welcome to Orlina Jewelry! I am ORLINA, your personal assistant. How can I help you today?`
            },
            morning: {
                sq: `🌅 Mirëmëngjes! Mirë se vini në Orlina Jewelry. Çfarë mund të bëj për ju sot?`,
                en: `🌅 Good morning! Welcome to Orlina Jewelry. What can I do for you today?`
            },
            evening: {
                sq: `🌙 Mirëmbrëma! Shpresoj të keni pasur një ditë të mrekullueshme. Si mund t'ju ndihmoj?`,
                en: `🌙 Good evening! I hope you've had a wonderful day. How can I assist you?`
            },
            how: {
                sq: `Jam shumë mirë, faleminderit që pyetni! 😊 Jam gati t'ju shërbej. Çfarë kërkoni sot?`,
                en: `I am doing great, thank you for asking! 😊 I am ready to assist you. What are you looking for today?`
            },
            rings: {
                sq: `💍 Kemi ${rings.length} unaza magnifike! Rekomandimi im: "${rings[0]?.name}" — $${rings[0]?.price?.toLocaleString()}. Dëshironi të shihni më shumë?`,
                en: `💍 We have ${rings.length} magnificent rings! My recommendation: "${rings[0]?.name}" — $${rings[0]?.price?.toLocaleString()}. Would you like to see more?`
            },
            watches: {
                sq: `⌚ Orët tona luksoze: "${watches[0]?.name}" dhe "${watches[1]?.name}" janë zgjedhjet më elegante. Të gjitha me garanci Swiss!`,
                en: `⌚ Our luxury watches: "${watches[0]?.name}" and "${watches[1]?.name}" are the most elegant choices. All with Swiss warranty!`
            },
            price: {
                sq: `💰 Çmimet tona fillojnë nga $680. Cilën kategori po kërkoni? (Unaza, Varëse, Orë, etj.)`,
                en: `💰 Our prices start from $680. Which category are you interested in? (Rings, Necklaces, Watches, etc.)`
            },
            gift: {
                sq: `🎁 Për dhurata sugjerojmë "${necklaces[0]?.name}". Vjen me paketim luksoz falas! ✨`,
                en: `🎁 For gifts, we suggest the "${necklaces[0]?.name}". It comes with a free luxury gift box! ✨`
            },
            ship: {
                sq: `🚚 Dërgesa është FALAS për porositë mbi $500. Arrin për 2-4 ditë!`,
                en: `🚚 Shipping is FREE for orders over $500. It arrives in 2-4 business days!`
            },
            help: {
                sq: `🛠️ Mund t'ju ndihmoj me produkte, dhurata, çmime apo dërgesa. Më tregoni çfarë ju intereson!`,
                en: `🛠️ I can help you with products, gifts, prices, or shipping. Let me know what you are interested in!`
            },
            fallback: {
                sq: `Faleminderit! Jam këtu t'ju ndihmoj të gjeni bizuterinë perfekte. Më pyesni për çdo gjë! 💎`,
                en: `Thank you! I am here to help you find the perfect jewelry. Feel free to ask me anything! 💎`
            }
        };

        // Logic Mapping
        if (/morning|mengjes/.test(t)) return responses.morning[lang];
        if (/evening|mramje|mbrema/.test(t)) return responses.evening[lang];
        if (/hello|hi |hey|pershendetje|tung|miredita/.test(t)) return responses.greet[lang];
        if (/how are you|how r u|si jeni|si je|si jena|ca va/.test(t)) return responses.how[lang];
        if (/ring|unaz|diamond|diamant/.test(t)) return responses.rings[lang];
        if (/watch|ore|sahati/.test(t)) return responses.watches[lang];
        if (/price|cost|cmimi|sa kushton|budget/.test(t)) return responses.price[lang];
        if (/gift|dhurat/.test(t)) return responses.gift[lang];
        if (/shipping|deliver|derges|porosi/.test(t)) return responses.ship[lang];
        if (/help|ndihm|asistenc/.test(t)) return responses.help[lang];

        return responses.fallback[lang];
    };

    const handleSend = async () => {
        if (!input.trim() || typing) return;
        const userText = input.trim();
        const newMsgs = [...msgs, { role: 'user', text: userText }];
        setMsgs(newMsgs);
        setInput('');
        setTyping(true);
        setError(null);

        const apiMessages = [
            { role: 'system', content: systemPrompt },
            ...newMsgs.slice(-10).map(m => ({
                role: m.role === 'assistant' ? 'assistant' : 'user',
                content: m.text
            }))
        ];

        const tryModel = async (modelName) => {
            const res = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: modelName,
                    messages: apiMessages,
                    max_tokens: 600,
                    temperature: 0.75,
                })
            });
            if (!res.ok) {
                const errBody = await res.json().catch(() => ({}));
                const code = errBody?.error?.code || '';
                if (code === 'insufficient_quota' || res.status === 429 || res.status === 402)
                    throw Object.assign(new Error('quota'), { quota: true });
                throw new Error(errBody?.error?.message || `HTTP ${res.status}`);
            }
            return res.json();
        };

        try {
            let data;
            // Determine default models based on URL
            const isDeepSeek = OPENAI_BASE_URL.includes('deepseek');
            const primaryModel = isDeepSeek ? 'deepseek-chat' : 'gpt-4o';
            const secondaryModel = isDeepSeek ? 'deepseek-chat' : 'gpt-3.5-turbo';

            try { data = await tryModel(primaryModel); }
            catch (e1) {
                if (e1.quota) throw e1;
                try { data = await tryModel(secondaryModel); }
                catch (e2) { throw e2; }
            }
            const aiText = data.choices?.[0]?.message?.content || 'M \u00eb falni, ndodhi nj \u00eb gabim.';
            setMsgs(prev => [...prev, { role: 'assistant', text: aiText }]);
            dbInput.addAIChat(userText, aiText);
        } catch (err) {
            // Quota/billing error or any API failure — use smart local fallback
            const localResponse = localAI(userText);
            setMsgs(prev => [...prev, { role: 'assistant', text: localResponse }]);
            dbInput.addAIChat(userText, localResponse);
        } finally {
            setTyping(false);
        }
    };

    const quickReplies = [
        '💍 Diamond Rings',
        '🎁 Gift Ideas',
        '⌚ Luxury Watches',
        '💰 Best Prices',
    ];

    return (
        <div className="buna-container">
            <AnimatePresence>
                {open && (
                    <motion.div className="buna-window"
                        initial={{ scale: 0.85, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.85, opacity: 0, y: 60 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className="buna-header">
                            <div className="buna-header-info">
                                <motion.div className="buna-avatar"
                                    animate={{ boxShadow: ['0 0 0px rgba(201,168,76,0.4)', '0 0 20px rgba(201,168,76,0.8)', '0 0 0px rgba(201,168,76,0.4)'] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                >O</motion.div>
                                <div>
                                    <div className="buna-name">ORLINA</div>
                                    <div className="buna-status"><span className="buna-status-dot" /> Online — Ready to help</div>
                                </div>
                            </div>
                            <button className="buna-close" onClick={() => setOpen(false)}><X size={22} /></button>
                        </div>

                        {/* Messages */}
                        <div className="buna-messages">
                            {msgs.map((m, i) => (
                                <motion.div key={i}
                                    className={`buna-msg ${m.role}`}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {m.text.split('\n').map((line, li) => <p key={li}>{line}</p>)}
                                </motion.div>
                            ))}
                            {typing && (
                                <motion.div className="buna-typing"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <span /><span /><span />
                                </motion.div>
                            )}
                            <div ref={msgEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {msgs.length <= 2 && (
                            <div className="buna-quick-replies">
                                {quickReplies.map((q, i) => (
                                    <button key={i} className="buna-quick-btn"
                                        onClick={() => { setInput(q); }}
                                    >{q}</button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="buna-input-area">
                            <input
                                className="buna-input"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                                placeholder="Type your message..."
                                disabled={typing}
                            />
                            <motion.button
                                className="buna-send"
                                onClick={handleSend}
                                disabled={typing || !input.trim()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {typing ? <RefreshCw size={18} className="spin-icon" /> : <Send size={18} />}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                className="buna-toggle"
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                animate={!open ? {
                    boxShadow: ['0 4px 20px rgba(201,168,76,0.4)', '0 4px 40px rgba(201,168,76,0.8)', '0 4px 20px rgba(201,168,76,0.4)']
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <AnimatePresence mode="wait">
                    {open
                        ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={26} /></motion.div>
                        : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageSquare size={26} /></motion.div>
                    }
                </AnimatePresence>
            </motion.button>

            {/* Notification badge */}
            {!open && (
                <motion.div className="buna-notif"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
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
    const [db, setDb] = useState(() => dbInput.init(ALL_PRODUCTS));
    const [user, setUser] = useState(db.currentUser);
    const [cart, setCart] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const onLogin = (e, p) => {
        const u = dbInput.login(e, p);
        if (u) { setUser(u); setDb(dbInput.get()); }
        return u;
    };

    const onSignup = (n, e, p, r) => {
        const u = dbInput.signup(n, e, p, r);
        if (u && !u.error) { setUser(u); setDb(dbInput.get()); }
        return u;
    };

    const onLogout = () => {
        dbInput.logout();
        setUser(null);
        setDb(dbInput.get());
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Filter products based on DB state (admin can delete/add)
    const activeProducts = db.products;

    return (
        <Router>
            <div className="app">
                <Navbar cartCount={cartCount} onSearchClick={() => setSearchOpen(true)} scrollProgress={scrollProgress} user={user} />
                <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} products={activeProducts} />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home products={activeProducts} onAddToCart={onAddToCart} />} />
                        <Route path="/product/:id" element={<ProductDetails products={activeProducts} onAddToCart={onAddToCart} />} />
                        <Route path="/category/:catId" element={<CategoryPage products={activeProducts} onAddToCart={onAddToCart} />} />
                        <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={onRemoveFromCart} onUpdateQuantity={onUpdateQuantity} />} />
                        <Route path="/checkout" element={<CheckoutPage cart={cart} onOrderSuccess={() => setCart([])} />} />
                        <Route path="/account" element={<AccountPage user={user} onLogin={onLogin} onSignup={onSignup} onLogout={onLogout} />} />
                        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <AccountPage user={user} onLogin={onLogin} onSignup={onSignup} onLogout={onLogout} />} />
                    </Routes>
                </main>
                <Footer />
                <OrlinaAI products={activeProducts} />
            </div>
        </Router>
    );
};

export default App;
