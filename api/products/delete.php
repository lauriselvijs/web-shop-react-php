<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header(
    'Access-Control-Allow-Headers: Access-Control-Allow-Headers, 
Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With'
);

require_once '../../config/Database.php';
require_once '../../models/Product.php';

// Instantiate DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate product object
$product = new react_php_test\models\Product($db);

// Get raw product data
$data = json_decode(file_get_contents('php://input'));

// Set ID to delete
$product->setId($data->id);

// Delete product
echo json_encode($product->delete());
