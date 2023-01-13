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
    $expenditureManager = new ExpenditureManager(new PDOFactory());
    $countUser = $expenditureManager->countUser($flat_share_id);
    $queryUser = $expenditureManager->userFlatShare($flat_share_id);
    $amount = $amount / $countUser;
    $expenditureManager->createExpenditure($expenditureName, $flat_share_id, $amount, $creation_date, $id_creator, $queryUser);
  }
  #[Route('/update_payed', name: "create-expenditure", methods: ["POST", "GET"])]
  public function update_payed()
  {
    $userId = $_REQUEST['user_id'];
    $expenditureId = $_REQUEST['expenditureId'];
    $expenditureManageUpdate = new ExpenditureManager(new PDOFactory());

    $expenditureManageUpdate->update_payed($userId, $expenditureId);
  }
}
