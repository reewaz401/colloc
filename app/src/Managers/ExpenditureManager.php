<?php

namespace App\Managers;

use App\Entities\Expenditure;
use App\Factories\PDOFactory;
use App\Interfaces\Database;

class ExpenditureManager extends BaseManager
{
  public function createExpenditure(string $expenditureName, int $flat_share_id, int $amount, string $creation_date)
  {

    $queryUser = $this->pdo->prepare('SELECT roommate_id FROM roomate_has_flat_share WHERE flat_share_id=:actual_flat_share_id');
    $queryUser->bindValue('actual_flat_share_id', $flat_share_id, \PDO::PARAM_INT);
    $queryUser->execute();
    while ($data = $queryUser->fetch(\PDO::FETCH_ASSOC)) {

      $query = $this->pdo->prepare('INSERT INTO expenditure ( expenditure_name ,flat_share_id , roommate_id, amount, creation_date) VALUES (:expenditureName, :flat_share_id, :roommate_id, :amount,:creation_date)');
      $query->bindValue('expenditureName', $expenditureName, \PDO::PARAM_STR);
      $query->bindValue('flat_share_id', $flat_share_id, \PDO::PARAM_INT);
      $query->bindValue('roommate_id', $data['roommate_id'], \PDO::PARAM_INT);
      $query->bindValue('amount', $amount, \PDO::PARAM_INT);
      $query->bindValue('creation_date', $creation_date, \PDO::PARAM_STR);
      $query->execute();
    }
  }
}
