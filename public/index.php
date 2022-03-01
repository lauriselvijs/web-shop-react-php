<?php

require "../bootstrap.php";

use Src\Controller\ProductController;

$requestMethod = $_SERVER['REQUEST_METHOD'];

// Is this a pre-flight request (the request method is OPTIONS)? Then start output buffering.
if ($requestMethod === 'OPTIONS') {
    ob_start();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Request-Method, Access-Control-Request-Headers");

// If this is a pre-flight request (the request method is OPTIONS)? Then flush the output buffer and exit.
if ($requestMethod === 'OPTIONS') {
    ob_end_flush();
    exit();
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// all of our endpoints start with /products
// everything else results in a 404 Not Found
if ($uri[1] !== 'products') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$controller = new ProductController($dbConnection);

$requestMethod = $_SERVER["REQUEST_METHOD"];

$controller->setRequestMethod($requestMethod);

if (isset($_GET['product_id'])) {
    $controller->setProductId((string) $_GET['product_id']);
} else {
    $controller->setProductId(null);
}

$controller->processRequest();
