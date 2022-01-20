<?php

namespace react_php_test\models;

use \PDO;

require_once '../../models/CRUD.php';

class Product extends CRUD
{
    // DB conn
    private $conn;
    private $table = 'products';

    public $id;
    public $sku;
    public $name;
    public $price;
    public $product_attribute;
    public $type;

    public function read(): array
    {
        $this->conn = $this->db;


        // Read query
        $query = 'SELECT 
       id,
       sku,
       name,
       price,
       product_attribute,
       type
       FROM 
       ' . $this->table . '   
       ORDER BY id DESC';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        // Get row count
        $num = $stmt->rowCount();

        // Check if any products
        if ($num > 0) {
            // Product array
            $products_arr['data'] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $product_item = array(
                    'id' => $id,
                    'sku' => $sku,
                    'name' => $name,
                    'price' => $price,
                    'product_attribute' => $product_attribute,
                    'type' => $type,
                );

                // Push to 'data'
                array_push($products_arr['data'], $product_item);
            }

            return $products_arr;
        } else {
            // No Products
            return array('message' => 'No product found');
        }
    }


    public function create(): array
    {
        $this->conn = $this->db;


        $data_missing = array();
        $correct_data = array();

        // Check if data empty
        $this->sku === "" && $data_missing[] = 'SKU';
        $this->name === "" && $data_missing[] = 'name';
        $this->price === "" && $data_missing[] = 'price';
        $this->product_attribute === "" && $data_missing[] = 'product_attribute';
        $this->type === "" && $data_missing[] = 'type';

        // Clean data
        $product_attr_number = str_replace(array('X', 'x'), '', $this->product_attribute);

        // Check if correct data format
        !is_numeric($this->price) && $correct_data[] = 'price';
        !is_numeric($product_attr_number) && $correct_data[] = 'product_attribute';

        if (empty($data_missing)) {
            if (empty($correct_data)) {
                // Create query
                $query = 'INSERT INTO ' . $this->table . '
                     SET sku = :sku, name =  :name, price = :price, product_attribute = :product_attribute, type = :type';

                // Prepare statement
                $stmt = $this->conn->prepare($query);

                //Clean data
                $this->sku = htmlspecialchars(strip_tags($this->sku));
                $this->name = htmlspecialchars(strip_tags($this->name));
                $this->price = htmlspecialchars(strip_tags($this->price));
                $this->product_attribute = htmlspecialchars(strip_tags($this->product_attribute));
                $this->type = htmlspecialchars(strip_tags($this->type));

                // Bind data
                $stmt->bindParam(':sku', $this->sku);
                $stmt->bindParam(':name', $this->name);
                $stmt->bindParam(':price', $this->price);
                $stmt->bindParam(':product_attribute', $this->product_attribute);
                $stmt->bindParam(':type', $this->type);

                if ($stmt->execute()) {
                    return array('message' => 'Product Created');
                } else {
                    // Print error if something goes wrong
                    return array('Error: %s.\n', $stmt->error);
                }
            } else {
                return ['incorrect_data' => $correct_data];
            }
        } else {
            return ['empty_data' => $data_missing];
        }
    }

    public function delete(): string
    {
        $this->conn = $this->db;

        // Create query
        $query = "DELETE FROM " . $this->table . ' WHERE id = :id';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind data
        $stmt->bindParam(':id', $this->id);


        if ($stmt->execute()) {
            return "Product deleted";
        };

        return 'Error ' + $stmt->error;
    }

    public function update(): array
    {
        return [];
    }

    /**
     * Get the value of sku
     */
    public function getSku()
    {
        return $this->sku;
    }

    /**
     * Set the value of sku
     *
     * @return self
     */
    public function setSku($sku)
    {
        $this->sku = $sku;

        return $this;
    }

    /**
     * Get the value of price
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set the value of price
     *
     * @return self
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of product_attribute
     */
    public function getProductAttribute()
    {
        return $this->product_attribute;
    }

    /**
     * Set the value of product_attribute
     *
     * @return self
     */
    public function setProductAttribute($product_attribute)
    {
        $this->product_attribute = $product_attribute;

        return $this;
    }

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of type
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @return  self
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }
}
