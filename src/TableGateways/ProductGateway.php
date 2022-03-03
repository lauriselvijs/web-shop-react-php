<?php

namespace Src\TableGateways;

use Src\TableGateways\CRUD;


class ProductGateway extends CRUD
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function read(): array
    {

        $statement = '
        SELECT 
            id,
            sku,
            name,
            price,
            product_attribute,
            type
        FROM 
            products 
        ORDER BY id DESC';

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }



    public function insert(array $input): int
    {
        $statement = "
            INSERT INTO products 
                (sku, name, price, product_attribute, type)
            VALUES
                (:sku, :name, :price, :product_attribute, :type);
        ";

        try {
            $statement = $this->db->prepare($statement);

            $statement->execute(
                array(
                    'sku' => $input['sku'],
                    'name' => $input['name'],
                    'price' => $input['price'],
                    'product_attribute' => $input['product_attribute'],
                    'type' => $input['type'],

                )
            );
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }


    public function delete(string $id): int
    {

        $statement = '
        DELETE FROM 
            products 
        WHERE 
            id = :id';


        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array('id' => $id));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function find(string $id): array
    {
        $statement = "
        SELECT 
            id, sku, name, price, product_attribute, type
        FROM 
            products
        WHERE id = ?;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}
