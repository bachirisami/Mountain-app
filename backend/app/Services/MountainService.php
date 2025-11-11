<?php

namespace App\Services;

use App\Exceptions\MountainNotFoundException;
use App\Models\Mountain;

class MountainService
{
    public function getAll(array $filters = [], int $perPage = 2)
    {
        return Mountain::query()
            ->filterName($filters['name'] ?? null)
            ->paginate($perPage);
    }

    public function getById(int $id): ?Mountain
    {
        $mountain = Mountain::find($id);
        if (! $mountain) {
            throw new MountainNotFoundException('Mountain not found');
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

        if (! $mountain) {
            throw new MountainNotFoundException('Mountain not found');
        }

        $mountain->update($data);

        return $mountain;
    }

    public function delete(int $id)
    {
        $mountain = Mountain::find($id);

        if (! $mountain) {
            throw new MountainNotFoundException('Mountain not found');
        }

        $mountain->delete();
    }
}
