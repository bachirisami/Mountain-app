<?php

namespace Database\Factories;

use App\Models\Mountain;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mountain>
 */
class MountainFactory extends Factory
{
    protected $model = Mountain::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'height' => $this->faker->numberBetween(1000, 8000),
            'location' => $this->faker->word(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'image_url' => $this->faker->imageUrl(),
        ];
    }
}
