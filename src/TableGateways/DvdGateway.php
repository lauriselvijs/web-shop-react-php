<?php

namespace Src\TableGateways;

use Src\TableGateways\ProductGateway;


class DvdGateway extends ProductGateway
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
            size     
        FROM 
            dvds 
        ORDER BY id DESC';

        // size - int 

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
            INSERT INTO dvds 
                (sku, name, price, size)
            VALUES
                (:sku, :name, :price, :size);
        ";

        try {
            $statement = $this->db->prepare($statement);

            $statement->execute(
                array(
                    'sku' => $input['sku'],
                    'name' => $input['name'],
                    'price' => $input['price'],
                    'size' => $input['size'],
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
            dvds 
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
            id, sku, name, price, size 
        FROM 
            dvds
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
