<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMountainRequest;
use App\Http\Requests\UpdateMountainRequest;
use App\Services\MountainService;
use Illuminate\Http\Request;

class MountainController extends Controller
{
    protected $mountainService;

    public function __construct(MountainService $mountainService)
    {
        $this->mountainService = $mountainService;
    }

    public function getAllMountains(Request $request)
    {
        $filters = $request->only(['name', 'location', 'min_height', 'max_height']);
        $perPage = $request->get('limit', default: 9);

        $mountains = $this->mountainService->getAll($filters, $perPage);

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
            'data' => $mountain,
        ], 201);
    }

    public function deleteMountain($id)
    {
        $this->mountainService->delete($id);

        return response()->json(['message' => 'Mountain deleted successfully!'], 200);
    }

    public function updateMountain(UpdateMountainRequest $request, $id)
    {
        $mountain = $this->mountainService->update($id, $request->validated());

        return response()->json([
            'message' => 'Mountain updated successfully!',
            'data' => $mountain,
        ]);
    }
}
