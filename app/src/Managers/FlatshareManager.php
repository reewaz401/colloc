<?php

namespace App\Managers;

class FlatshareManager extends BaseManager
{
    public function createFlatshare(string $name,string $address, $start_date, $end_date)
    {
        try {
            $query = $this->pdo->prepare('INSERT INTO flat_share ( name , address, start_date, end_date) VALUES (:name, :address, :start_date, :end_date)');
            $query->bindValue('name', $name, \PDO::PARAM_STR);
            $query->bindValue('address', $address, \PDO::PARAM_STR);
            $query->bindValue('start_date', $start_date);
            $query->bindValue('end_date', $end_date);

            $query->execute();
        } catch (PDOException $e) {
            echo($e->getMessage());
        }
    }

    public function selectOneColloc() : array
    {
        $query = $this->pdo->prepare('SELECT * FROM flat_share WHERE id = :id');

        $data = $query->fetch(\PDO::FETCH_ASSOC);

        return new ($data);
    }

    public function selectAllColloc() : array
    {
        $query = $this->pdo->query('SELECT * FROM flat_share WHERE 1');

        $arrayColloc = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $arrayColloc[] = new ($data);
        }

        return $arrayColloc;
    }

    public function deleteFlatshare(int $id)
    {
        $query = $this->pdo->prepare('DELETE FROM flat_share WHERE id=:id');
        $query->bindValue('id', $id, \PDO::PARAM_INT);
        $query->execute();
    }

    public function updateFlatshare(int $id, string $name, string $address, $start_date, $end_date):int
    {
        $query = $this->pdo->prepare('UPDATE flat_share SET name=:name, address=:address, start_date=:strat_date, end_date=end_date WHERE id = :id');
        $query->bindValue('id', $id, \PDO::PARAM_INT);
        $query->bindValue('name', $name, \PDO::PARAM_STR);
        $query->bindValue('address', $address, \PDO::PARAM_STR);
        $query->bindValue('start_date', $start_date);
        $query->bindValue('end_date', $end_date);

        $query->execute();

        return $id;
    }
}
