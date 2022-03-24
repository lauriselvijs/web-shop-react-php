<?php

namespace Src\Controller;

use Src\TableGateways\FurnitureGateway;

class FurnitureController extends FurnitureGateway
{
    private $requestMethod;
    private $furnitureId;

    private $errorMsg;


    public function processRequest()
    {
        switch ($this->getRequestMethod()) {
            case 'GET':
                if ($this->getFurnitureId()) {
                    $response = $this->getFurniture($this->getFurnitureId());
                } else {
                    $response = $this->getAllFurniture();
                }
                break;
            case 'POST':
                $response = $this->createFurnitureFromRequest();
                break;
            case 'DELETE':
                $response = $this->deleteFurniture($this->getFurnitureId());
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function getAllFurniture()
    {
        $result = $this->read();
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getFurniture($id)
    {
        $result = $this->find($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }



    private function createFurnitureFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), true);
        if (!$this->validateFurniture($input)) {
            return $this->unprocessableEntityResponse($this->getErrorMsg());
        }
        $this->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }


    private function deleteFurniture($id)
    {
        $result = $this->find($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $this->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function validateFurniture($input)
    {
        $nullValueArr = array_keys($input, null, true);
        $emptyValueArr = array_keys($input, "", true);

        if ($nullValueArr) {
            $this->setErrorMsg("Missing values found: " . implode(", ", $nullValueArr));
            return false;
        }

        if ($emptyValueArr) {
            $this->setErrorMsg("Empty values found: " . implode(", ", $emptyValueArr));
            return false;
        }

        return true;
    }

    private function unprocessableEntityResponse($errorMsg)
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode(
            [
                'error' => $errorMsg
            ]
        );
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }

    /**
     * Get the value of requestMethod
     */
    public function getRequestMethod()
    {
        return $this->requestMethod;
    }

    /**
     * Set the value of requestMethod
     *
     * @return self
     */
    public function setRequestMethod($requestMethod)
    {
        $this->requestMethod = $requestMethod;

        return $this;
    }

    /**
     * Get the value of furnitureId
     */
    public function getFurnitureId()
    {
        return $this->furnitureId;
    }

    /**
     * Set the value of furnitureId
     *
     * @return self
     */
    public function setFurnitureId($furnitureId)
    {
        $this->furnitureId = $furnitureId;

        return $this;
    }

    /**
     * Get the value of errorMsg
     */
    public function getErrorMsg()
    {
        return $this->errorMsg;
    }

    /**
     * Set the value of errorMsg
     *
     * @return self
     */
    public function setErrorMsg($errorMsg)
    {
        $this->errorMsg = $errorMsg;

        return $this;
    }
}
