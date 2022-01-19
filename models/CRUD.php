<?php

namespace react_php_test\models;

abstract class CRUD
{
    // db connection
    public $db;
    public function __construct($db)
    {
        $this->db = $db;
    }

    // Crud operations
    abstract public function create(): array;
    abstract public function read(): array;
    abstract public function update(): array;
    abstract public function delete(): string;
}
