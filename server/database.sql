CREATE DATABASE interior_haven;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    images TEXT[],
    video_url TEXT,
    specifications JSONB,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, image_url) VALUES
('tables', 'https://images.unsplash.com/photo-1577140917170-285929fb55b7'),
('lanterns', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15'),
('wall-fireplaces', 'https://images.unsplash.com/photo-1600585152220-90363fe7e115'),
('floor-fireplaces', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde');

-- Insert sample products
INSERT INTO products (name, price, description, category, images, video_url, specifications, stock_quantity) VALUES
-- Tables
('Modern Dining Table', 1299.99, 'Elegant modern dining table perfect for contemporary homes. Features a solid wood construction with a beautiful natural finish.', 
'tables', 
ARRAY['https://images.unsplash.com/photo-1577140917170-285929fb55b7', 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc'],
'https://www.youtube.com/embed/dQw4w9WgXcQ',
'{"dimensions": "72\" L x 36\" W x 30\" H", "weight": "120 lbs", "material": "Solid Oak", "finish": "Natural Matte"}'::jsonb,
10),

('Rustic Coffee Table', 599.99, 'Handcrafted coffee table with reclaimed wood and industrial metal legs. Perfect centerpiece for any living room.',
'tables',
ARRAY['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc'],
NULL,
'{"dimensions": "48\" L x 24\" W x 18\" H", "weight": "85 lbs", "material": "Reclaimed Pine", "finish": "Distressed"}'::jsonb,
15),

('Scandinavian Side Table', 299.99, 'Minimalist side table with clean lines and organic form. Made from sustainable materials.',
'tables',
ARRAY['https://images.unsplash.com/photo-1499933374294-4584851497cc'],
NULL,
'{"dimensions": "20\" L x 20\" W x 24\" H", "weight": "25 lbs", "material": "Birch", "finish": "White Oak"}'::jsonb,
20),

-- Lanterns
('Vintage Brass Lantern', 149.99, 'Classic brass lantern with antique finish. Perfect for both indoor and outdoor lighting.',
'lanterns',
ARRAY['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15'],
NULL,
'{"dimensions": "8\" L x 8\" W x 15\" H", "weight": "3 lbs", "material": "Brass", "finish": "Antique"}'::jsonb,
25),

('Modern Glass Lantern Set', 199.99, 'Set of 3 contemporary glass lanterns with LED candles. Perfect for creating ambient lighting.',
'lanterns',
ARRAY['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15'],
NULL,
'{"dimensions": "Various sizes", "material": "Glass and Metal", "includes": "3 LED candles", "finish": "Black Metal"}'::jsonb,
15),

('Moroccan Style Lantern', 179.99, 'Intricate Moroccan-inspired design with colorful glass panels. Creates beautiful light patterns.',
'lanterns',
ARRAY['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15'],
NULL,
'{"dimensions": "10\" L x 10\" W x 18\" H", "weight": "4 lbs", "material": "Metal and Glass", "finish": "Bronze"}'::jsonb,
12),

-- Wall Fireplaces
('Modern Electric Wall Fireplace', 899.99, 'Sleek wall-mounted electric fireplace with realistic flame effects and heating.',
'wall-fireplaces',
ARRAY['https://images.unsplash.com/photo-1600585152220-90363fe7e115'],
'https://www.youtube.com/embed/dQw4w9WgXcQ',
'{"dimensions": "50\" W x 22\" H x 6\" D", "heat_output": "5000 BTU", "features": "Remote control, LED display", "finish": "Black Glass"}'::jsonb,
8),

('Contemporary Linear Fireplace', 1299.99, 'Ultra-wide electric fireplace with multiple flame colors and ambient lighting.',
'wall-fireplaces',
ARRAY['https://images.unsplash.com/photo-1600585152220-90363fe7e115'],
NULL,
'{"dimensions": "72\" W x 15\" H x 5.5\" D", "heat_output": "5500 BTU", "features": "WiFi enabled, smartphone control", "finish": "Stainless Steel"}'::jsonb,
5),

('Compact Wall Fireplace', 599.99, 'Space-saving wall fireplace perfect for smaller rooms and apartments.',
'wall-fireplaces',
ARRAY['https://images.unsplash.com/photo-1600585152220-90363fe7e115'],
NULL,
'{"dimensions": "36\" W x 20\" H x 5\" D", "heat_output": "4000 BTU", "features": "Touch controls, timer", "finish": "White"}'::jsonb,
15),

-- Floor Fireplaces
('Freestanding Electric Stove', 799.99, 'Traditional style electric stove with modern features. Creates a cozy atmosphere.',
'floor-fireplaces',
ARRAY['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde'],
NULL,
'{"dimensions": "24\" W x 28\" H x 15\" D", "heat_output": "4600 BTU", "features": "Realistic log effect, adjustable thermostat", "finish": "Matt Black"}'::jsonb,
10),

('Modern Floor Fireplace', 1499.99, 'Contemporary floor-standing electric fireplace with 360-degree viewing.',
'floor-fireplaces',
ARRAY['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde'],
NULL,
'{"dimensions": "30\" diameter x 48\" H", "heat_output": "5200 BTU", "features": "360-degree flame view, remote control", "finish": "Brushed Steel"}'::jsonb,
6),

('Portable Electric Fireplace', 449.99, 'Compact and mobile electric fireplace with casters for easy movement.',
'floor-fireplaces',
ARRAY['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde'],
NULL,
'{"dimensions": "20\" W x 23\" H x 13\" D", "heat_output": "4000 BTU", "features": "Portable design, safety switch", "finish": "Cherry Wood"}'::jsonb,
20);

-- Create admin user (password: admin123)
INSERT INTO users (email, password, name, is_admin) VALUES
('admin@interiorhaven.com', '$2a$10$rQnqQKqQ9qQ9qQ9qQ9qQ9O9qQ9qQ9qQ9qQ9qQ9qQ9qQ9qQ9qQ9', 'Admin User', true);