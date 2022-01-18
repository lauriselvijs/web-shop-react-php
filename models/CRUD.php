<?php

abstract class CRUD
{
    public $db;
    public function __construct($db)
    {
        $this->db = $db;
    }
    abstract public function read(): array;
    abstract public function create(): array;
}
