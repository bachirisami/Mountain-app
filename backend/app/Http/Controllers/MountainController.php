<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mountain;
use Illuminate\Validation\ValidationException;
use App\Services\MountainService;
use App\Http\Requests\CreateMountainRequest;
use App\Http\Requests\UpdateMountainRequest;

class MountainController extends Controller
{
    protected $mountainService;

    public function __construct(MountainService $mountainService)
    {
        $this->mountainService = $mountainService;
    }

    public function getAllMountains()
    {
        $mountains = $this->mountainService->getAll();
        return response()->json($mountains);
    }

    public function getMountainById($id)
    {
        $mountain = $this->mountainService->getById($id);
        return response()->json($mountain);
    }

    public function createMountain(CreateMountainRequest $request)
    {
        $mountain = $this->mountainService->create($request->validated());

        return response()->json([
            'message' => 'Mountain created successfully!',
            'data' => $mountain
        ], 201);
    }

    public function deleteMountain($id)
    {
        $deleted = $this->mountainService->delete($id);

        return response()->json(['message' => 'Mountain deleted successfully!'], 200);
    }

    public function updateMountain(UpdateMountainRequest $request, $id)
    {
        $mountain = $this->mountainService->update($id, $request->validated());

        return response()->json([
            'message' => 'Mountain updated successfully!',
            'data' => $mountain
        ]);
    }
}
// api_call?page=2&limit=10&query=Alpen