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

        $flatshareManager->createFlatshare($id_creator, $name, $address, $start_date, $end_date);

    }

    #[Route('/delete_flatshare', name: "delete", methods: ["POST"])]
    public function deleteFlatshare()
    {
        $id_flatshare = $_REQUEST['id_flatshare'];

        $flatshareManager = new FlatshareManager(new PDOFactory());

        $flatshareManager->deleteFlatshare($id_flatshare);
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
}