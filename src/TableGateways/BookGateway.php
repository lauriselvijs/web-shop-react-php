<?php

namespace Src\TableGateways;

use Src\TableGateways\ProductGateway;

class BookGateway extends ProductGateway
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
            weight 
        FROM 
            books 
        ORDER BY id DESC';

        //weight - decimal(15,3)

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
            INSERT INTO books 
                (sku, name, price, weight)
            VALUES
                (:sku, :name, :price, :weight);
        ";

        try {
            $statement = $this->db->prepare($statement);

            $statement->execute(
                array(
                    'sku' => $input['sku'],
                    'name' => $input['name'],
                    'price' => $input['price'],
                    'weight' => $input['weight'],
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
            books 
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
            id, sku, name, price, weight
        FROM 
            books
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
