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
('Modern Dining Table', 1299.99, 'Elegant modern dining table perfect for contemporary homes. Features a solid wood construction with a beautiful natural finish.', 
'tables', 
ARRAY['https://images.unsplash.com/photo-1577140917170-285929fb55b7', 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc'],
'https://www.youtube.com/embed/dQw4w9WgXcQ',
'{"dimensions": "72\" L x 36\" W x 30\" H", "weight": "120 lbs", "material": "Solid Oak", "finish": "Natural Matte"}'::jsonb,
10);

-- Create admin user (password: admin123)
INSERT INTO users (email, password, name, is_admin) VALUES
('admin@interiorhaven.com', '$2a$10$rQnqQKqQ9qQ9qQ9qQ9qQ9O9qQ9qQ9qQ9qQ9qQ9qQ9qQ9qQ9qQ9', 'Admin User', true);