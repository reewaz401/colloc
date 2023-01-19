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
    if($countUser > 0) $amount = $amount / $countUser;
    else $amount = 0;
    $amount =floatval(number_format($amount,2, '.',''));
    // var_dump ($amount);die;
    $expenditureManager->createExpenditure($expenditureName, $flat_share_id, $amount, $id_creator, $queryUser);
  }
  #[Route('/update_payed', name: "payed-expenditure", methods: ["POST", "GET"])]
  public function update_payed()
  {
    $userId = $_REQUEST['user_id'];
    $expenditureId = $_REQUEST['expenditureId'];
    $expenditureManageUpdate = new ExpenditureManager(new PDOFactory());

    $expenditureManageUpdate->updatePayed($userId, $expenditureId);
  }
  #[Route('/getUserExpenditure', name: "get-expenditure", methods: ["POST", "GET"])]
  public function getUserExpenditure()
  {
    $userId = $_REQUEST['user_id'];
    $flat_share_id = $_REQUEST['flat_share_id'];

    // $getMonthFeeDate=$expenditureManageGet->UserExpenditure($flat_share_id);
    $data = $expenditureManageGet->UserExpenditure($userId, $flat_share_id);
    $this->renderJson($data);
  }
  #[Route('/deleteExpenditure', name: "delete-expenditure", methods: ["POST", "GET"])]
  public function deleteExpenditure()
  {

    $expenditureId = $_REQUEST['expenditureId'];
    $expenditureManagerDelete = new ExpenditureManager(new PDOFactory());

    $expenditureManagerDelete->deleteExpenditure($expenditureId);
  }
  #[Route('/createMonthFee', name: "create-month", methods: ["POST", "GET"])]
  public function createMonthFee()
  {
    $fee_name= $_REQUEST['name'];
    $flat_share_id = $_REQUEST['flat_share_id'];
    $feeAmount = $_REQUEST['amount'];
    $date = $_REQUEST['date'];
    $expenditureManagerCreate = new ExpenditureManager(new PDOFactory());

    $expenditureManagerCreate->createMonthFee($fee_name,$flat_share_id,$feeAmount,$date);
  }
  #[Route('/delteMonthFee', name: "create-month", methods: ["POST", "GET"])]
  public function deleteMonthFee()
  {
    $monthFeedId= $_REQUEST['id'];

    $expenditureManagerDelete = new ExpenditureManager(new PDOFactory());

    $expenditureManagerDelete->deleteMonthFee($monthFeedId);
  }
  #[Route('/getMonthFee', name: "get-month", methods: ["POST", "GET"])]
  public function getMonthFee()
  {
    $flat_share_id= $_REQUEST['flat_share_id'];

    $expenditureManagerGetMonth = new ExpenditureManager(new PDOFactory());

    $expenditureManagerGetMonth->getMonthFee($flat_share_id);
  }
}
