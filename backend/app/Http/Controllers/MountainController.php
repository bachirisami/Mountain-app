<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mountain;
use Illuminate\Validation\ValidationException;

class MountainController extends Controller
{
    public function getAllMountains(){
        $mountains = Mountain::all();
        return response()->json($mountains);
    }

    public function getMountainById($id){
        $mountain = Mountain::find($id);
        if (!$mountain) {
            return response()->json([
                'message' => 'Mountain not found'
            ], 404);
        }
        return response()->json($mountain);
    }

    public function createMountain(Request $request){
        try {
            $fields = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'height' => ['required', 'integer', 'min:1'],
                'location' => ['required', 'string', 'max:255']
            ]);

            $mountain = Mountain::create([
                'name' => $fields['name'],
                'height' => $fields['height'],
                'location' => $fields['location']
            ]);

            return response()->json([
                'message' => 'Mountain created successfully!',
                'data' => $mountain
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function deleteMountain($id){
        $mountain = Mountain::find($id);

        if (!$mountain) {
            return response()->json([
                'message' => 'Mountain not found'
            ], 404);
        }

        $mountain->delete();

        return response()->json([
            'message' => 'Mountain deleted successfully!'
        ], 200);
    }

    public function updateMountain(Request $request, $id){
        $mountain = Mountain::find($id);

        if (!$mountain) {
            return response()->json([
                'message' => 'Mountain not found'
            ], 404);
        }

        $fields = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'height' => ['sometimes', 'integer', 'min:1'],
            'location' => ['sometimes', 'string', 'max:255']
        ]);

        $mountain->update($fields);

        return response()->json([
            'message' => 'Mountain updated successfully!',
            'data' => $mountain
        ], 200);
    }
}
