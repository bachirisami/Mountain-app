<?php

namespace Database\Seeders;

use App\Models\Mountain;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class MountainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $mountains = [
            ['Mount Everest', 8849, 'Himalaya, Nepal/China', 27.9881, 86.9250],
            ['K2', 8611, 'Karakoram, Pakistan/China', 35.8808, 76.5158],
            ['Kangchenjunga', 8586, 'Himalaya, Nepal/India', 27.7025, 88.1475],
            ['Lhotse', 8516, 'Himalaya, Nepal/China', 27.9617, 86.9330],
            ['Makalu', 8485, 'Himalaya, Nepal/China', 27.8897, 87.0883],
            ['Cho Oyu', 8188, 'Himalaya, Nepal/China', 28.0942, 86.6608],
            ['Dhaulagiri I', 8167, 'Nepal', 28.6978, 83.4875],
            ['Manaslu', 8163, 'Nepal', 28.5497, 84.5610],
            ['Nanga Parbat', 8126, 'Pakistan', 35.2372, 74.5892],
            ['Annapurna I', 8091, 'Nepal', 28.5958, 83.8203],
        ];

        foreach ($mountains as $m) {
            Mountain::create([
                'name' => $m[0],
                'height' => $m[1],
                'location' => $m[2],
                'latitude' => $m[3],
                'longitude' => $m[4],
                'image_url' => 'https://picsum.photos/seed/'.urlencode($m[0]).'/640/480',
            ]);
        }

        for ($i = 0; $i < 40; $i++) {
            $name = 'Mount '.$faker->unique()->lastName();

            Mountain::create([
                'name' => $name,
                'height' => $faker->numberBetween(1000, 8900),
                'location' => $faker->country().', '.$faker->city(),
                'latitude' => $faker->latitude(-90, 90),
                'longitude' => $faker->longitude(-180, 180),
                'image_url' => 'https://picsum.photos/seed/'.urlencode($name).'/640/480',
            ]);
        }
    }
}
