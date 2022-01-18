<?php
include_once '../../models/CRUD.php';

class Product extends CRUD
{
    // DB conn
    public $conn;
    public $table = 'products';

    public $sku;
    public $name;
    public $price;
    public $product_attribute;

    public function read(): array
    {
        $this->conn = $this->db;


        // Create query
        $query = 'SELECT 
       id,
       sku,
       name,
       price,
       product_attribute
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

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $product_item = array(
                    'SKU' => $SKU,
                    'name' => $name,
                    'price' => $price,
                    'product_attribute' => $product_attribute,
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


        // Create query
        $query = 'INSERT INTO ' . $this->table . '
       SET
           sku = ' . $this->sku . ', name =  ' . $this->name . ', price = '  . $this->price . ', product_attribute = ' . $this->product_attribute .  '';



        // Prepare statement
        $stmt = $this->conn->prepare($query);

        //Clean data
        $this->sku = htmlspecialchars(strip_tags($this->sku));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->product_attribute = htmlspecialchars(strip_tags($this->product_attribute));

        $stmt->execute();

        if ($stmt->execute()) {
            return array('message' => 'Product Created');
        } else {
            // Print error if something goes wrong
            return array('Error: %s.\n', $stmt->error);
        }
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
     * @return  self
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
     * @return  self
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
     * @return  self
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
     * @return  self
     */
    public function setProductAttribute($product_attribute)
    {
        $this->product_attribute = $product_attribute;

        return $this;
    }
}
