<?php

namespace App\Controllers;
use App\Factories\PDOFactory;
use App\Managers\FlatshareManager;
use App\Managers\UserManager;
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

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUser($id_creator);

        if($result instanceof \Exception) {
            $this->renderJson('Un problème est survenu lors de la création, problème avec le compte créant la collocation, veuillez réessayer !', 401);
            die;
        }

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->createFlatshare($id_creator, $name, $address, $start_date, $end_date);

        if($result instanceof \Exception) {
            $this->renderJson('Un problème est survenu lors de la création, veuillez réessayer ! '.$result->getMessage(), 401);
            die;
        }

        $lastInsertFlatshare = $flatshareManager->selectOneFlatshareToReturn($result);

        if ($lastInsertFlatshare instanceof \Exception){
            $this->renderJson('Créé avec succès, mais il est impossible de récuperer les données !', 555);
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

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception){
            $this->renderJson("Nous n'arrivons pas à effectuer la suppresion, vérifiez que la collocation existe toujours !", 501);
            die;
        }

        $nameFlatshare = $result->getName();

        $result = $flatshareManager->deleteFlatshare($id_flatshare);

        if ($result instanceof \Exception){
            $this->renderJson("Impossible d'effectuer la suppresion, veuillez réessayer !", 501);
            die;
        }

        $this->renderJson("La collocation $nameFlatshare a été supprimée avec succès !");
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

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception){
            $this->renderJson("Nous n'arrivons pas à effectuer la modification, vérifiez que la collocation est toujours existante !", 501);
            die;
        }

        $nameFlatshare = $result->getName();

        $result = $flatshareManager->updateFlatshare($id_flatshare, $name, $address, $start_date, $end_date);

        if ($result instanceof \Exception){
            $this->renderJson("Impossible d'effectuer la modification, veuillez réessayer !", 501);
            die;
        }

        $this->renderJson("La collocation $nameFlatshare a été modifiée avec succès !");
    }


    #[Route('/selectAll', name: "selectall", methods: ["GET"])]
    public function select()
    {
        $flatshareManager = new FlatshareManager(new PDOFactory());

        $data = $flatshareManager->selectAllFlatshare();

        if ($data instanceof \Exception) {
            $this->renderJson("Impossible d'effectuer la sélection, veuillez réessayer !", 501);
            die;
        }

        $this->renderJson($data);
    }

    #[Route('/add_roommate', name: "addRoommate", methods: ["POST", "GET"])]
    public function addRoommate()
    {
        $id_new_roommate = $_REQUEST['new_roomate'];
        $id_flatshare = $_REQUEST['id_flatshare'];
        $role = $_REQUEST['role'] ?? 0;
        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer l'ajout du collocataire vérifiez que la collocation est toujours existante !", 401);
            die;
        }

        $flatshareName = $result->getName();

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUser($id_new_roommate);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer l'ajout du collocataire, vérifiez que le compte du collocataire est toujours existant !", 401);
            die;
        }

        $roommateName = $result->getUsername();


        $result = $flatshareManager->insertRoomateHasFlatshare($id_flatshare, $id_new_roommate, $role);

        if($result instanceof \Exception) {
            $this->renderJson("Un problème est survenu lors de l'ajout du nouveau collocataire, vérifiez qu'il ne fait pas déjà partie de la collocation, sinon, veuillez réessayer !", 401);
            die;
        }

        // all success //
        $this->renderJson("Le collocataire $roommateName a été ajouté avec succès dans la collocation $flatshareName !");
    }

    #[Route('/kick_roommate', name: "kickRoommate", methods: ["POST", "GET"])]
    public function deleteRoomateFromFlatshare()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];
        $id_roommate = $_REQUEST['id_roommate'];

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $result = $flatshareManager->selectOneFlatshare($id_flatshare);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer la suppression vérifiez que la collocation est toujours existante !", 401);
            die;
        }

        $flatshareName = $result->getName();

        $userManager = new UserManager(new PDOFactory());

        $result = $userManager->readUser($id_roommate);

        if ($result instanceof \Exception) {
            $this->renderJson("Nous n'arrivons pas à effectuer la suppression vérifiez que le collocataire est toujours dans la collocation ou/et que son compte est toujours existant !", 401);
            die;
        }

        $roommateName = $result->getUsername();

        $result = $flatshareManager->deleteRoomateHasFlatshare($id_flatshare, $id_roommate);

        if ($result instanceof \Exception) {
            $this->renderJson("Un problème est survenu lors de la suppression, vérifiez que le collocataire fait toujours parti de la collocation !", 401);
            die;
        }

        // all success //
        $this->renderJson("Le collocataire $roommateName a été supprimé avec succès de la collocation $flatshareName !");
    }
}
