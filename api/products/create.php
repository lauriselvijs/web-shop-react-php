<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

// Instantiate DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate product object
$product = new Product($db);

$data = json_decode(file_get_contents('php://input'));

$product->setSku($data->sku);
$product->setName($data->name);
$product->setPrice($data->price);
$product->setProductAttribute($data->product_attribute);

$product->create();
echo json_encode($product->create());
