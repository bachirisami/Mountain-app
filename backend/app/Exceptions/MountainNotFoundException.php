<?php

namespace App\Exceptions;

use Exception;

class MountainNotFoundException extends Exception
{
    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage() ?? 'Mountain not found'
        ], 404);
    }
}