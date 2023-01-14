<?php

namespace App\Controllers;
use App\Factories\PDOFactory;
use App\Managers\FlatshareManager;
use App\Routes\Route;


class FlatshareController extends AbstractController
{
    #[Route('/create_flatshare', name: "create", methods: ["POST"])]
    public function create()
    {
        $id_creator = $_REQUEST['id_creator'];
        $name = $_REQUEST['name'];
        $address = $_REQUEST['address'];
        $start_date = $_REQUEST['start_date'];
        $end_date = $_REQUEST['end_date'];
        //$image = $_FILES['image'];

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->createFlatshare($id_creator, $name, $address, $start_date, $end_date);

        if($result instanceof \Exception) {
            $this->renderJson('Un problème est survenu lors de la création, veuillez réessayer !', 401);
            die;
        }

        $lastInsertFlatshare = $flatshareManager->selectOneFlatshareToReturn($result);

        if ($lastInsertFlatshare instanceof \Exception){
            $this->renderJson('Création réussie, mais il est impossible de récuperer les données !', 555);
            die;
        }

        // all success //
        $this->renderJson($lastInsertFlatshare);
    }

    #[Route('/delete_flatshare', name: "delete", methods: ["POST"])]
    public function deleteFlatshare()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->deleteFlatshare($id_flatshare);

        if ($result instanceof \Exception){
            $this->renderJson("Impossible d'effectuer la suppresion, veuillez réessayer !", 501);
        }

        $this->renderJson('Suppression réussie !');
    }

    #[Route('/update_flatshare', name: "update", methods: ["POST"])]
    public function update_flatshare()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];
        $name = $_REQUEST['name'];
        $address = $_REQUEST['address'];
        $start_date = $_REQUEST['start_date'];
        $end_date = $_REQUEST['end_date'];

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $flatshareManager->updateFlatshare($id_flatshare, $name, $address, $start_date, $end_date);
    }


    #[Route('/selectAll', name: "update", methods: ["GET"])]
    public function select()
    {
        $flatshareManager = new FlatshareManager(new PDOFactory());
        $data = $flatshareManager->selectAllFlatshare();
        $this->renderJson($data);
    }

    #[Route('/add_roommate', name: "update", methods: ["GET"])]
    public function addRoommate()
    {
        $id_new_roommate = $_REQUEST['new_roomate'];
        $id_flatshare = $_REQUEST['id_flatshare'];
        $role = $_REQUEST['role'] ?? 0;


    }
}