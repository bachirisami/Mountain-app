<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Mountain;

class MountainTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_mountain()
    {
        $response = $this->postJson('/api/mountains/create', [
            'name' => 'K2',
            'height' => 8611,
            'location' => 'Pakistan / China',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['message', 'data' => ['id', 'name', 'height', 'location']]);
    }

    public function test_delete_mountain()
    {
        $mountain = Mountain::create([
            'name' => 'Everest',
            'height' => 8848,
            'location' => 'Nepal / China'
        ]);

        $response = $this->deleteJson("/api/mountains/{$mountain->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Mountain deleted successfully!',
                 ]);
    }

    public function test_update_mountain()
    {
        $mountain = Mountain::create([
            'name' => 'Kangchenjunga',
            'height' => 8586,
            'location' => 'India / Nepal'
        ]);

        $response = $this->putJson("/api/mountains/{$mountain->id}", [
            'name' => 'Kangchenjunga Updated',
            'height' => 8587,
            'location' => 'India / Nepal Updated'
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Mountain updated successfully!',
                     'data' => [
                         'id' => $mountain->id,
                         'name' => 'Kangchenjunga Updated',
                         'height' => 8587,
                         'location' => 'India / Nepal Updated'
                     ]
                 ]);
    }

    public function test_get_all_mountains()
    {
        Mountain::create([
            'name' => 'Lhotse',
            'height' => 8516,
            'location' => 'Nepal / China'
        ]);

        Mountain::create([
            'name' => 'Makalu',
            'height' => 8485,
            'location' => 'Nepal / China'
        ]);

        $response = $this->getJson('/api/mountains');

        $response->assertStatus(200)
                    ->assertJsonCount(2)
                    ->assertJsonFragment(['name' => 'Lhotse'])
                    ->assertJsonFragment(['name' => 'Makalu']);
    }

    public function test_get_mountain_by_id()
    {
        $mountain = Mountain::create([
            'name' => 'Cho Oyu',
            'height' => 8188,
            'location' => 'Nepal / China'
        ]);

        $response = $this->getJson("/api/mountains/{$mountain->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $mountain->id,
                     'name' => 'Cho Oyu',
                     'height' => 8188,
                     'location' => 'Nepal / China'
                 ]);
    }
}
