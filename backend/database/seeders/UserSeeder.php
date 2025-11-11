<?php

namespace Database\Seeders;

use App\Services\AuthService;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $authService = new AuthService;
        $users = [
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'password' => 'password',
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob@example.com',
                'password' => 'password',
            ],
            [
                'name' => 'Charlie Brown',
                'email' => 'charlie@example.com',
                'password' => 'password',
            ],
        ];

        foreach ($users as $userData) {
            $authService->register($userData);
        }
    }
}
