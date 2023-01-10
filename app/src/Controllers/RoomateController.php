<?php

namespace App\Controllers;
use App\Routes\Route;


class RoomateController extends AbstractController
{
    #[Route('/sign_up', name: "signup", methods: ["POST", "GET"])]
    public function sign_up()
    {
        $username = $_REQUEST['username'];
        $mail = $_REQUEST['mail'];
        $password = $_REQUEST['password'];
        $lastname = $_REQUEST['lastname'];
        $firstname = $_REQUEST['firstname'];
        $date_birth = $_REQUEST['date_birth'];


    }

    public function login()
    {

    }
}