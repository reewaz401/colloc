<?php

namespace App\Controllers;

use App\Factorys\PDOFactory;
use App\Managers\UserManager;
use App\Managers\SessionManager;
use App\Routes\Route;

class UserController extends AbstractController
{
    #[Route('/login', name: "login", methods: ["GET"])]
    public function login()
    {
        $sessionManager = new SessionManager();
        $logStatut = $sessionManager->check_login();

        $this->render("login.php", [], "Login page", $logStatut);
    }

    #[Route('/logout', name: "logout", methods: ["GET"])]
    public function logout()
    {
        $sessionManager = new SessionManager();
        //$logStatut = $sessionManager->check_login();
        $sessionManager->logout();
        header("location: /" );

        //$this->render("logout.php", [], "Logout page", $logStatut);
    }

    #[Route('/login', name: "login", methods: ["POST"])]
    public function signin()
    {

        $username = filter_input(INPUT_POST, "username");
        $pwd = filter_input(INPUT_POST, "pwd");
        $pwd_hash =  password_hash($pwd, PASSWORD_DEFAULT);

        $userManager = new UserManager(new PDOFactory());
        $sessionManager = new SessionManager();

        $login = filter_input(INPUT_POST, "login");
        $getUser = $userManager->readUser($username);


        if($login){
            if(isset($getUser[0])){
                if (!password_verify($pwd, $getUser[0]->getPwd())){
                    echo "<script type='text/javascript'>alert('Password an username don't match.'); </script>";
                }
                elseif(password_verify($pwd, $getUser[0]->getPwd())){
                    $sessionManager->login($username);
                    header("location: /" );
                }
            }else{
                header("location: /login" );
                echo "<script type='text/javascript'>alert('Password an username don't match.'); </script>";

            }

        }

    }

    #[Route('/signin', name: "signin", methods: ["POST"])]
    public function signin2()
    {
        $firstname = filter_input(INPUT_POST, "firstname");
        $lastname = filter_input(INPUT_POST, "lastname");
        $email = filter_input(INPUT_POST, "email");
        $birthdate = filter_input(INPUT_POST, "birthdate");

        $username = filter_input(INPUT_POST, "username");
        $pwd = filter_input(INPUT_POST, "pwd");
        $pwd_hash =  password_hash($pwd, PASSWORD_DEFAULT);

        $userManager = new UserManager(new PDOFactory());

        $signin = filter_input(INPUT_POST, "signin");
        $getUser = $userManager->readUser($username);

        if($signin){
            if($getUser){
                echo "<script type='text/javascript'>alert('this pseudo already use, please choice an other.'); location.href='/login'</script>";
            }else{
                $userManager->creatUser($username, $pwd_hash, $firstname, $lastname, $email, $birthdate);
                header("location: /login" );
            }
        }

    }

    #[Route('/respwd', name: "respwd", methods: ["POST"])]
    public function signin3()
    {

        $update_username = filter_input(INPUT_POST, "username");
        $update_pwd = filter_input(INPUT_POST, "pwd");
        $update_pwd_hash =  password_hash($update_pwd, PASSWORD_DEFAULT);


        $userManager = new UserManager(new PDOFactory());

        $resmdp = filter_input(INPUT_POST, "resmdp");


        if($resmdp){
            $userManager->updatePwd($update_username, $update_pwd_hash);
            header("location: /login" );

        }

    }

}
