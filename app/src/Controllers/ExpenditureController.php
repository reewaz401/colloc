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
    // $id_creator = $_REQUEST['id_creator'];
    $expenditureName = $_REQUEST['expenditureName'];
    $amount = $_REQUEST['amount'];
    $flat_share_id = $_REQUEST['flat_share_id'];
    $creation_date = $_REQUEST['creation_date'];
    $expenditureManager = new ExpenditureManager(new PDOFactory());

    $expenditureManager->createExpenditure($expenditureName, $flat_share_id, $amount, $creation_date);
  }
}
