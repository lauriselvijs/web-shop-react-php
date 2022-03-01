<?php

require 'bootstrap.php';

$statement = <<<EOS
    CREATE TABLE IF NOT EXISTS `products` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `sku` varchar(30) NOT NULL,
        `name` varchar(30) NOT NULL,
        `price` decimal(15,2) NOT NULL,
        `product_attribute` varchar(30) NOT NULL,
        `type` varchar(255) NOT NULL,
        `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE=INNODB; 
    INSERT INTO emails
        (sku, name, price, product_attribute, type)
    VALUES
        ('SKUTest000','NameTest000',25.00,'200','DVD'),
        ('SKUTest001','NameTest001',25.00,'200','Book'),
        ('SKUTest002','NameTest002',25.00,'200x200x200','Furniture'),
EOS;

try {
    $createTable = $dbConnection->exec($statement);
    echo "Success!\n";
} catch (\PDOException $e) {
    exit($e->getMessage());
}
