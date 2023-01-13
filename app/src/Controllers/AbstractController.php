<?php

namespace App\Controllers;


abstract class AbstractController
{
    public function __construct(string $action, array $params = [])
    {
        if (!is_callable([$this, $action])) {
            throw new \RuntimeException("La methode $action n'est pas disponible dans ce controller");
        }
        call_user_func_array([$this, $action], $params);
    }

    public function renderJson(array|string $data){

        header('Content-Type: application/json');
        echo json_encode(['statut' => 200,
            'data' => $data]);
    }

    public function renderJsonError(int $codeError, string $nameError)
    {
        header('Content-Type: application/json');
        echo json_encode([
            'status' => $codeError,
            'message' => $nameError.''
        ]);
    }
}