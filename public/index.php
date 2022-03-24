<?php

require "../bootstrap.php";

use Src\Controller\DvdController;
use Src\Controller\FurnitureController;
use Src\Controller\BookController;

const BOOK = "book";
const DVD = "dvd";
const FURNITURE = "furniture";

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

// all of the endpoints start with /products
// everything else results in a 404 Not Found
if ($uri[1] !== 'products') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

if (
    !isset($_GET['product_type'])
    || ($_GET['product_type'] !== BOOK
        && $_GET['product_type'] !== DVD
        && $_GET['product_type'] !== FURNITURE)
) {
    echo $_GET['product_type'] !== BOOK;
    header("HTTP/1.1 422 Unprocessable Entity");
    exit();
}


if ($_GET['product_type'] === BOOK) {
    $bookController = new BookController($dbConnection);
    $bookController->setRequestMethod($requestMethod);

    if (isset($_GET['product_id'])) {
        $bookController->setBookId((int) $_GET['product_id']);
    } else {
        $bookController->setBookId(null);
    }

    $bookController->processRequest();
}

if ($_GET['product_type'] === DVD) {
    $dvdController = new DvdController($dbConnection);
    $dvdController->setRequestMethod($requestMethod);

    if (isset($_GET['product_id'])) {
        $dvdController->setDvdId((int) $_GET['product_id']);
    } else {
        $dvdController->setDvdId(null);
    }

    $dvdController->processRequest();
}

if ($_GET['product_type'] === FURNITURE) {
    $furnitureController = new FurnitureController($dbConnection);
    $furnitureController->setRequestMethod($requestMethod);

    if (isset($_GET['product_id'])) {
        $furnitureController->setFurnitureId((int) $_GET['product_id']);
    } else {
        $furnitureController->setFurnitureId(null);
    }

    $furnitureController->processRequest();
}
