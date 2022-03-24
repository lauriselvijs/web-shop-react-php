<?php

namespace Src\TableGateways;

abstract class ProductGateway
{

    // Crud operations
    abstract public function read(): array;
    abstract public function insert(array $input): int;
    abstract public function delete(string $id): int;
    abstract public function find(string $id): array;
}
