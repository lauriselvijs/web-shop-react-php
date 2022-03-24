<?php

namespace Src\TableGateways;

use Src\TableGateways\ProductGateway;

class FurnitureGateway extends ProductGateway
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
            height,
            width,
            length
        FROM 
            furniture 
        ORDER BY id DESC';


        // h,w,l - decimal(15,2)

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
            INSERT INTO furniture 
                (sku, name, price, height, width, length)
            VALUES
                (:sku, :name, :price, :height, :width, :length);
        ";

        try {
            $statement = $this->db->prepare($statement);

            $statement->execute(
                array(
                    'sku' => $input['sku'],
                    'name' => $input['name'],
                    'price' => $input['price'],
                    'height' => $input['height'],
                    'width' => $input['width'],
                    'length' => $input['length'],
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
            furniture 
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
            id, sku, name, price, height, width, length
        FROM 
            furniture
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
