<?php

namespace App\Services;

use App\Models\Mountain;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use \App\Exceptions\MountainNotFoundException;

class MountainService
{
    public function getAll()
    {
        return Mountain::all();
    }

    public function getById(int $id): ?Mountain
    {
        $mountain = Mountain::find($id);
        if (!$mountain) {
            throw new MountainNotFoundException("Mountain not found");
        }
        return $mountain;
    }

    public function create(array $data): Mountain
    {
        return Mountain::create($data);
    }

    public function update(int $id, array $data): Mountain
    {
        $mountain = Mountain::find($id);

        if (!$mountain) {
            throw new MountainNotFoundException('Mountain not found');
        }

        $mountain->update($data);

        return $mountain;
    }

    public function delete(int $id): bool
    {
        $mountain = Mountain::find($id);

        if (!$mountain) {
            throw new MountainNotFoundException("Mountain not found");
        }

        $mountain->delete();
        return true;
    }
}