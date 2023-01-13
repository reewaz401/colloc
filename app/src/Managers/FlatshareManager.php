<?php

namespace App\Managers;

use App\Entities\FlatShare;
use PDOException;

class FlatshareManager extends BaseManager
{
    /**
     * @param $id_creator
     * @param $name
     * @param $address
     * @param $start_date
     * @param $end_date
     * @return void
     *
     * @comment Cette fonction appel 2 fonctions
     *  1- la première permet d'insérer des données dans la table 'Flatshare'
     *  2- la deuxième s'occupe d'insérer des données dans la table de jointure/associative ( n to n )
     */
    public function createFlatshare(int $id_creator, string $name, string $address, string $start_date, string $end_date):void
    {
        try {
            $this->pdo->query('START TRANSACTION');
            $response = $this->insertFlatshare($name, $address, $start_date, $end_date);
            $this->insertRoomateHasFlatshare($id_creator, $response);

            if ($response instanceof \Exception) {
                $this->pdo->query('ROLLBACK');
            }else{
                $this->pdo->query('COMMIT');
            }
        } catch (\Exception $e) {

        }

    }

    /**
     * @param string $name
     * @param string $address
     * @param string $start_date
     * @param string $end_date
     * @return int|string
     */
    public function insertFlatshare(string $name, string $address, string $start_date, string $end_date): int|string|\Exception
    {
        try {
            $query = $this->pdo->prepare('INSERT INTO flat_share ( name , address, start_date, end_date) VALUES (:name, :address, :start_date, :end_date)');
            $query->bindValue('name', $name, \PDO::PARAM_STR);
            $query->bindValue('address', $address, \PDO::PARAM_STR);
            $query->bindValue('start_date', $start_date);
            $query->bindValue('end_date', $end_date);

            $query->execute();
        } catch (\Exception $e) {
            return $e;
        }
        return $this->pdo->lastInsertId();
    }

    public function selectOneColloc() : array
    {
        $query = $this->pdo->prepare('SELECT * FROM flat_share WHERE id = :id');

        $data = $query->fetch(\PDO::FETCH_ASSOC);

        return new FlatShare($data);
    }

    public function selectAllColloc() : array
    {
        $query = $this->pdo->query('SELECT * FROM flat_share WHERE 1');

        $arrayColloc = [];

        $data = $query->fetchAll(\PDO::FETCH_ASSOC);
        // $arrayColloc[] = new FlatShare($data);
        return $data;
    }

    public function deleteFlatshare(int $id)
    {
        $query = $this->pdo->prepare('DELETE FROM flat_share WHERE id=:id');
        $query->bindValue('id', $id, \PDO::PARAM_INT);
        $query->execute();
    }

    public function updateFlatshare(int $id, string $name, string $address, $start_date, $end_date):int
    {
        $query = $this->pdo->prepare('UPDATE flat_share SET name=:name, address=:address, start_date=:strat_date, end_date=:end_date WHERE id = :id');
        $query->bindValue('id', $id, \PDO::PARAM_INT);
        $query->bindValue('name', $name, \PDO::PARAM_STR);
        $query->bindValue('address', $address, \PDO::PARAM_STR);
        $query->bindValue('start_date', $start_date);
        $query->bindValue('end_date', $end_date);

        $query->execute();

        return $id;
    }

    /**
     * @param int $userId
     * @param int $flatshareId
     * @return void
     */
    public function insertRoomateHasFlatshare(int $userId, int $flatshareId)
    {
        try {
            $query = $this->pdo->prepare('INSERT INTO roomate_has_flat_share ( roommate_id , flat_share_id, role) VALUES (:roomate_id, :flat_share_id, :role)');
            $query->bindValue('roomate_id', $userId, \PDO::PARAM_INT);
            $query->bindValue('flat_share_id', $flatshareId, \PDO::PARAM_INT);
            $query->bindValue('role', 1, \PDO::PARAM_INT);

            $query->execute();
        } catch (\Exception $e) {
            return $e;
        }
    }
}
