<?php

namespace App\Controllers;
use App\Traits\Notif;
use App\Factories\PDOFactory;
use App\Managers\ExpenditureManager;
use App\Routes\Route;


class ExpenditureController extends AbstractController
{
  #[Route('/create_expenditure', name: "create-expenditure", methods: ["POST", "GET"])]
  public function create_expenditure()
  {
    $id_creator = $_REQUEST['id_creator'];
    $expenditureName = $_REQUEST['expenditureName'];
    $amount = $_REQUEST['amount'];
    $amount= floatval($amount);


    $flat_share_id = $_REQUEST['flat_share_id'];
    $creation_date = $_REQUEST['creation_date'];
    // $uniqId = uniqid('', true);
    $expenditureManager = new ExpenditureManager(new PDOFactory());
    $countUser = $expenditureManager->countUser($flat_share_id);
    $queryUser = $expenditureManager->userFlatShare($flat_share_id);
    // var_dump($queryUser);die;
    $amount = $amount / $countUser;
    $amount =floatval(number_format($amount,2, '.',''));
    // var_dump ($amount);die;
    $result=$expenditureManager->createExpenditure($expenditureName, $flat_share_id, $amount, $id_creator, $queryUser);
       if ($result instanceof \Exception){
            $this->renderJson('Erreur lors de la création de la dépense !', 555);
            die;
        }
          $this->renderJson("La dépense a été créée avec succès !");
  }
  #[Route('/update_payed', name: "payed-expenditure", methods: ["POST", "GET"])]
  public function update_payed()
  {
    $userId = $_REQUEST['user_id'];
    $expenditureId = $_REQUEST['expenditureId'];
    $expenditureManageUpdate = new ExpenditureManager(new PDOFactory());

    $result=$expenditureManageUpdate->updatePayed($userId, $expenditureId);

    if ($result instanceof \Exception){
            $this->renderJson('Erreur lors du paiment de la dépense !', 555);
            die;
        }
          $this->renderJson("La dépense a été payée avec succès !");
  }
  #[Route('/getUserExpenditure', name: "get-expenditure", methods: ["POST", "GET"])]
  public function getUserExpenditure()
  {
    $userId = $_REQUEST['user_id'];
    $flat_share_id = $_REQUEST['flat_share_id'];
  $expenditureManageGet = new ExpenditureManager(new PDOFactory());
    // $getMonthFeeDate=$expenditureManageGet->UserExpenditure($flat_share_id);
    $data = $expenditureManageGet->UserExpenditure($userId, $flat_share_id);
     if ($data instanceof \Exception){
            $this->renderJson("Nous n'avons pas trouvé de dépenses pour cet utilisateur", 555);
            die;
        }
          // $this->renderJson("Voici toutes vos dépenses");
    $this->renderJson($data);

  }
  #[Route('/deleteExpenditure', name: "delete-expenditure", methods: ["POST", "GET"])]
  public function deleteExpenditure()
  {

    $expenditureId = $_REQUEST['expenditureId'];
    $expenditureManagerDelete = new ExpenditureManager(new PDOFactory());

    $result=$expenditureManagerDelete->deleteExpenditure($expenditureId);
     if ($result instanceof \Exception){
            $this->renderJson('Erreur lors de la suppression de la dépense !', 555);
            die;
        }
          $this->renderJson("La dépense a été supprimée avec succès !");
  }
  #[Route('/createMonthFee', name: "create-month", methods: ["POST", "GET"])]
  public function createMonthFee()
  {
    $fee_name= $_REQUEST['name'];
    $flat_share_id = $_REQUEST['flat_share_id'];
    $feeAmount = $_REQUEST['amount'];
    $date = $_REQUEST['date'];
    $expenditureManagerCreate = new ExpenditureManager(new PDOFactory());

    $result= $expenditureManagerCreate->createMonthFee($fee_name,$flat_share_id,$feeAmount,$date);
       if ($result instanceof \Exception){
            $this->renderJson('Erreur lors de la création de la dépense mensuel !', 555);
            die;
        }
          $this->renderJson("La dépense mensuel a été créée avec succès !");
  }
  #[Route('/delteMonthFee', name: "create-month", methods: ["POST", "GET"])]
  public function deleteMonthFee()
  {
    $monthFeedId= $_REQUEST['id'];

    $expenditureManagerDelete = new ExpenditureManager(new PDOFactory());

    $result= $expenditureManagerDelete->deleteMonthFee($monthFeedId);
       if ($result instanceof \Exception){
            $this->renderJson('Erreur lors de la suppression de la dépense mensuel !', 555);
            die;
        }
          $this->renderJson("La dépense mensuel a été supprimée avec succès !");
  }
  #[Route('/getMonthFee', name: "get-month", methods: ["POST", "GET"])]
  public function getMonthFee()
  {
    $flat_share_id= $_REQUEST['flat_share_id'];

    $expenditureManagerGetMonth = new ExpenditureManager(new PDOFactory());

    $result=$expenditureManagerGetMonth->getMonthFee($flat_share_id);
       if ($result instanceof \Exception){
            $this->renderJson("Nous n'avons pas trouvé la dépense mensuel !", 555);
            die;
        }
          $this->renderJson($result);
  }
}
