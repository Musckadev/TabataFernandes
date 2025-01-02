-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS tabata_fernandes;
USE tabata_fernandes;

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    category VARCHAR(100) NOT NULL,
    collection VARCHAR(100) NOT NULL,
    material VARCHAR(100) NOT NULL,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    is_new BOOLEAN NOT NULL DEFAULT FALSE,
    is_sale BOOLEAN NOT NULL DEFAULT FALSE,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    rating DECIMAL(2, 1),
    reviews_count INT DEFAULT 0,
    sold_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de imagens dos produtos
CREATE TABLE IF NOT EXISTS product_images (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    url VARCHAR(255) NOT NULL,
    position INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabela de tamanhos dos produtos
CREATE TABLE IF NOT EXISTS product_sizes (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    size VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabela de pedras dos produtos
CREATE TABLE IF NOT EXISTS product_stones (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    stone VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Inserção de dados de exemplo
INSERT INTO products (
    id, name, description, price, category, collection, 
    material, in_stock, is_new, is_sale, featured, slug, 
    rating, reviews_count, sold_count
) VALUES (
    '1', 'Colar Delicado Coração', 
    'Um colar delicado com pingente de coração em prata 925',
    129.90, 'Colares', 'Romântica', 'Prata 925',
    TRUE, TRUE, FALSE, FALSE, 'colar-delicado-coracao',
    4.5, 12, 25
);

INSERT INTO product_images (id, product_id, url) VALUES 
('1', '1', '/images/products/colar-coracao-1.jpg');

INSERT INTO product_sizes (id, product_id, size) VALUES 
('1', '1', 'Único');

INSERT INTO product_stones (id, product_id, stone) VALUES 
('1', '1', 'Zircônia');

-- Índices para melhorar a performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_collection ON products(collection);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);
CREATE INDEX idx_product_stones_product_id ON product_stones(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
