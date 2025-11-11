<?php

namespace App\Services;

use App\Exceptions\UserNotFoundException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data): User
    {
        $data['password'] = bcrypt($data['password']);

        return User::create($data);
    }

    public function login(string $email, string $password): User
    {
        $user = User::where('email', $email)->first();

        if (! $user || ! Hash::check($password, $user->password)) {
            throw new UserNotFoundException('The provided credentials are incorrect.');
        }

        return $user;
    }

    public function logout($user): void
    {
        $user->currentAccessToken()->delete();
    }
}
