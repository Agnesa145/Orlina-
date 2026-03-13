// Database Simulation using localStorage
const DB_NAME = 'orlina_db';

const initialDB = {
    users: [
        { id: 1, name: 'Admin', email: 'admin@orlina.com', password: 'admin', role: 'admin' },
        { id: 2, name: 'John Doe', email: 'user@example.com', password: 'user123', role: 'user' }
    ],
    orders: [
        { id: 'ORD-001', customer: 'John Doe', customerEmail: 'user@example.com', items: 2, total: 4050, status: 'Delivered', date: 'Mar 8, 2024' },
    ],
    products: [], // Will be populated from ALL_PRODUCTS if empty
    aiChats: [
        { id: 1, user: 'Klienti #1042', message: 'Po kërkoj një dhuratë për motrën', response: 'Për një dhuratë elegante ju rekomandoj varëse minimaliste...', time: new Date().toISOString() },
    ],
    currentUser: null
};

export const dbInput = {
    init: (allProducts) => {
        const stored = localStorage.getItem(DB_NAME);
        if (!stored) {
            const db = { ...initialDB, products: allProducts };
            localStorage.setItem(DB_NAME, JSON.stringify(db));
            return db;
        }
        return JSON.parse(stored);
    },

    get: () => JSON.parse(localStorage.getItem(DB_NAME)) || initialDB,

    save: (data) => localStorage.setItem(DB_NAME, JSON.stringify(data)),

    // Users
    login: (email, password) => {
        const db = dbInput.get();
        const user = db.users.find(u => u.email === email && u.password === password);
        if (user) {
            db.currentUser = user;
            dbInput.save(db);
            return user;
        }
        return null;
    },

    signup: (name, email, password, role = 'user') => {
        const db = dbInput.get();
        if (db.users.find(u => u.email === email)) return { error: 'Email already exists' };
        const newUser = { id: Date.now(), name, email, password, role };
        db.users.push(newUser);
        db.currentUser = newUser;
        dbInput.save(db);
        return newUser;
    },

    logout: () => {
        const db = dbInput.get();
        db.currentUser = null;
        dbInput.save(db);
    },

    // Orders
    addOrder: (orderData) => {
        const db = dbInput.get();
        const newOrder = {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Processing',
            ...orderData
        };
        db.orders.unshift(newOrder);
        dbInput.save(db);
        return newOrder;
    },

    // AI Chats
    addAIChat: (message, response) => {
        const db = dbInput.get();
        const currentUser = db.currentUser;
        const chat = {
            id: Date.now(),
            user: currentUser ? currentUser.name : 'Guest User',
            message,
            response,
            time: new Date().toISOString()
        };
        db.aiChats.unshift(chat);
        dbInput.save(db);
    },

    // Products
    addProduct: (product) => {
        const db = dbInput.get();
        const newProduct = { ...product, id: Date.now() };
        db.products.unshift(newProduct);
        dbInput.save(db);
        return newProduct;
    },

    updateProduct: (id, updates) => {
        const db = dbInput.get();
        db.products = db.products.map(p => p.id === id ? { ...p, ...updates } : p);
        dbInput.save(db);
    },

    deleteProduct: (id) => {
        const db = dbInput.get();
        db.products = db.products.filter(p => p.id !== id);
        dbInput.save(db);
    }
};
