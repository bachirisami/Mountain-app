<?php

namespace Tests\Unit;

use App\Exceptions\MountainNotFoundException;
use App\Models\Mountain;
use App\Services\MountainService;
use Illuminate\Pagination\LengthAwarePaginator;
use Mockery;
use Mockery\MockInterface;
use PHPUnit\Framework\TestCase;

class MountainServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Mockery::close();
    }

    public function test_get_all_mountains(): void
    {
        $mountains = collect([
            new Mountain(['id' => 1, 'name' => 'Everest', 'height' => 8848]),
            new Mountain(['id' => 2, 'name' => 'K2', 'height' => 8611]),
        ]);

        $mockPaginator = Mockery::mock(LengthAwarePaginator::class);
        $mockPaginator->shouldReceive('items')->andReturn($mountains);

        $service = Mockery::mock(MountainService::class)->makePartial();
        $service->shouldReceive('getAll')
            ->once()
            ->with([], 9)
            ->andReturn($mockPaginator);

        $result = $service->getAll([], 9);

        $this->assertEquals($mountains, $result->items());
    }

    public function test_get_all_mountains_with_name_filter(): void
    {
        $mountains = collect([
            new Mountain(['id' => 1, 'name' => 'Everest', 'height' => 8848]),
        ]);

        $mockPaginator = Mockery::mock(LengthAwarePaginator::class);
        $mockPaginator->shouldReceive('items')->andReturn($mountains);

        $service = Mockery::mock(MountainService::class)->makePartial();
        $service->shouldReceive('getAll')
            ->once()
            ->with(['name' => 'Everest'], 9)
            ->andReturn($mockPaginator);

        $result = $service->getAll(['name' => 'Everest'], 9);

        $this->assertEquals($mountains, $result->items());
    }

    public function test_get_by_id_returns_mountain(): void
    {
        $mountain = new Mountain([
            'id' => 1,
            'name' => 'Everest',
            'height' => 8848,
            'location' => 'Nepal/China',
        ]);

        $service = Mockery::mock(MountainService::class)->makePartial();
        $service->shouldReceive('getById')
            ->once()
            ->with(1)
            ->andReturn($mountain);

        $result = $service->getById(1);

        $this->assertInstanceOf(Mountain::class, $result);
        $this->assertEquals('Everest', $result->name);
    }

    public function test_create_mountain(): void
    {
        $request = [
            'name' => 'Everest',
            'height' => 8848,
            'location' => 'Nepal/China',
            'latitude' => 27.9881,
            'longitude' => 86.925,
            'image_url' => 'http://example.com/everest.jpg',
        ];

        $mountain = new Mountain(array_merge(['id' => 1], $request));

        $service = Mockery::mock(MountainService::class, function (MockInterface $mock) use ($mountain) {
            $mock->shouldReceive('create')
                ->once()
                ->withAnyArgs()
                ->andReturn($mountain);
        });

        $result = $service->create($request);

        $this->assertInstanceOf(Mountain::class, $result);
        $this->assertEquals('Everest', $result->name);
    }

    public function test_update_mountain(): void
    {
        $id = 1;
        $payload = [
            'name' => 'K2',
            'height' => 8611,
            'location' => 'Pakistan/China',
            'latitude' => 35.8818,
            'longitude' => 76.5133,
            'image_url' => 'http://example.com/k2.jpg',
        ];

        $mountain = new Mountain(array_merge(['id' => $id], [
            'name' => 'Old Name',
            'height' => 8000,
            'location' => 'Old Location',
            'latitude' => 0,
            'longitude' => 0,
            'image_url' => 'http://example.com/old.jpg',
        ]));

        $service = Mockery::mock(MountainService::class, function (MockInterface $mock) use ($mountain, $payload, $id) {
            $mock->shouldReceive('update')
                ->once()
                ->with($id, $payload)
                ->andReturnUsing(function ($id, $data) use ($mountain) {
                    $mountain->fill($data);

                    return $mountain;
                });
        });

        $result = $service->update($id, $payload);

        $this->assertInstanceOf(Mountain::class, $result);
        $this->assertEquals('K2', $result->name);
        $this->assertEquals(8611, $result->height);
        $this->assertEquals('Pakistan/China', $result->location);
    }

    /**
     * @runInSeparateProcess
     *
     * @preserveGlobalState disabled
     */
    public function test_update_nonexistent_mountain_throws_exception(): void
    {
        Mockery::mock('overload:'.Mountain::class)
            ->shouldReceive('find')
            ->with(999)
            ->once()
            ->andReturn(null);

        $service = new MountainService;

        $this->expectException(MountainNotFoundException::class);

        $service->update(999, ['name' => 'Nonexistent']);
    }

    /**
     * @runInSeparateProcess
     *
     * @preserveGlobalState disabled
     */
    public function test_delete_mountain(): void
    {
        $mountain = Mockery::mock(Mountain::class);
        $mountain->shouldReceive('delete')
            ->once()
            ->andReturn(true);

        $service = Mockery::mock(MountainService::class)->makePartial();
        $service->shouldReceive('delete')
            ->once()
            ->with(1)
            ->andReturnNull();

        $service->delete(1);

        $this->assertTrue(true);
    }

    /**
     * @runInSeparateProcess
     *
     * @preserveGlobalState disabled
     */
    public function test_delete_nonexistent_mountain_throws_exception(): void
    {
        Mockery::mock('alias:'.Mountain::class)
            ->shouldReceive('find')
            ->with(999)
            ->once()
            ->andReturn(null);

        $service = new MountainService;

        $this->expectException(MountainNotFoundException::class);
        $this->expectExceptionMessage('Mountain not found');

        $service->delete(999);
    }
}
