<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../../config/Database.php';
require_once '../../models/Product.php';

// Instantiate DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate product object
$product = new react_php_test\models\Product($db);

// Read product information
echo json_encode($product->read());
