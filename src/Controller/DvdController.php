<?php

namespace Src\Controller;

use Src\TableGateways\DvdGateway;

class DvdController extends DvdGateway
{
    private $requestMethod;
    private $dvdId;

    private $errorMsg;


    public function processRequest()
    {
        switch ($this->getRequestMethod()) {
            case 'GET':
                if ($this->getDvdId()) {
                    $response = $this->getDvd($this->getDvdId());
                } else {
                    $response = $this->getAllDvds();
                }
                break;
            case 'POST':
                $response = $this->createDvdFromRequest();
                break;
            case 'DELETE':
                $response = $this->deleteDvd($this->getDvdId());
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

    private function getAllDvds()
    {
        $result = $this->read();
        if (!$result) {
            return $this->notFoundResponse();
        }


        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getDvd($id)
    {

        $result = $this->find($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }



    private function createDvdFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), true);
        if (!$this->validateDvd($input)) {
            return $this->unprocessableEntityResponse($this->getErrorMsg());
        }
        $this->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }


    private function deleteDvd($id)
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

    private function validateDvd($input)
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
     * Get the value of dvdId
     */
    public function getDvdId()
    {
        return $this->dvdId;
    }

    /**
     * Set the value of dvdId
     *
     * @return self
     */
    public function setDvdId($dvdId)
    {
        $this->dvdId = $dvdId;

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