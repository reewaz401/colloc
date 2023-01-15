<?php

namespace App\Controllers;

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
    $flat_share_id = $_REQUEST['flat_share_id'];
    $creation_date = $_REQUEST['creation_date'];
    // $uniqId = uniqid('', true);
    $expenditureManager = new ExpenditureManager(new PDOFactory());
    $countUser = $expenditureManager->countUser($flat_share_id);
    $queryUser = $expenditureManager->userFlatShare($flat_share_id);
    $amount = $amount / $countUser;
    $expenditureManager->createExpenditure($expenditureName, $flat_share_id, $amount, $creation_date, $id_creator, $queryUser);
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
    $expenditureId = $_REQUEST['expenditureId'];
    $expenditureManageGet = new ExpenditureManager(new PDOFactory());

    $data = $expenditureManageGet->UserExpenditure($userId, $expenditureId);
    $this->renderJson($data);
  }
  #[Route('/deleteExpenditure', name: "delete-expenditure", methods: ["POST", "GET"])]
  public function deleteExpenditure()
  {

    $expenditureId = $_REQUEST['expenditureId'];
    $expenditureManagerDelete = new ExpenditureManager(new PDOFactory());

    $expenditureManagerDelete->deleteExpenditure($expenditureId);
  }
}
