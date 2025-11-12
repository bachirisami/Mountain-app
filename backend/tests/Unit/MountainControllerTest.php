<?php

namespace Tests\Unit;

use App\Http\Controllers\MountainController;
use App\Http\Requests\CreateMountainRequest;
use App\Http\Requests\UpdateMountainRequest;
use App\Models\Mountain;
use App\Services\MountainService;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Mockery;
use Tests\TestCase;

class MountainControllerTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all_mountains(): void
    {
        $mountains = collect([
            new Mountain(['id' => 1, 'name' => 'Everest', 'height' => 8848]),
            new Mountain(['id' => 2, 'name' => 'K2', 'height' => 8611]),
        ]);

        $mockPaginator = Mockery::mock(LengthAwarePaginator::class);
        $mockPaginator->shouldReceive('toJson')
            ->andReturn(json_encode($mountains));

        $serviceMock = Mockery::mock(MountainService::class);
        $serviceMock->shouldReceive('getAll')
            ->once()
            ->with([], 9)
            ->andReturn($mockPaginator);

        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('only')
            ->with(['name', 'location', 'min_height', 'max_height'])
            ->andReturn([]);
        $requestMock->shouldReceive('get')
            ->with('limit', 9)
            ->andReturn(9);

        $controller = new MountainController($serviceMock);
        $response = $controller->getAllMountains($requestMock);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function test_get_all_mountains_with_filters(): void
    {
        $filters = [
            'name' => 'Everest',
            'location' => 'Nepal',
            'min_height' => 8000,
            'max_height' => 9000,
        ];

        $mountains = collect([
            new Mountain(['id' => 1, 'name' => 'Everest', 'height' => 8848]),
        ]);

        $mockPaginator = Mockery::mock(LengthAwarePaginator::class);
        $mockPaginator->shouldReceive('toJson')
            ->andReturn(json_encode($mountains));

        $serviceMock = Mockery::mock(MountainService::class);
        $serviceMock->shouldReceive('getAll')
            ->once()
            ->with($filters, 15)
            ->andReturn($mockPaginator);

        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('only')
            ->with(['name', 'location', 'min_height', 'max_height'])
            ->andReturn($filters);
        $requestMock->shouldReceive('get')
            ->with('limit', 9)
            ->andReturn(15);

        $controller = new MountainController($serviceMock);
        $response = $controller->getAllMountains($requestMock);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function test_get_mountain_by_id(): void
    {
        $mountain = new Mountain([
            'id' => 1,
            'name' => 'Everest',
            'height' => 8848,
            'location' => 'Nepal/China',
            'latitude' => 27.9881,
            'longitude' => 86.925,
        ]);

        $serviceMock = Mockery::mock(MountainService::class);
        $serviceMock->shouldReceive('getById')
            ->once()
            ->with(1)
            ->andReturn($mountain);

        $controller = new MountainController($serviceMock);
        $response = $controller->getMountainById(1);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertEquals('Everest', $data['name']);
        $this->assertEquals(8848, $data['height']);
        $this->assertEquals('Nepal/China', $data['location']);
    }

    public function test_create_mountain(): void
    {
        $validatedData = [
            'name' => 'Everest',
            'height' => 8848,
            'location' => 'Nepal/China',
            'latitude' => 27.9881,
            'longitude' => 86.925,
            'image_url' => 'http://example.com/everest.jpg',
        ];

        $mountain = new Mountain(array_merge(['id' => 1], $validatedData));

        $serviceMock = Mockery::mock(MountainService::class);
        $serviceMock->shouldReceive('create')
            ->once()
            ->with($validatedData)
            ->andReturn($mountain);

        $requestMock = Mockery::mock(CreateMountainRequest::class);
        $requestMock->shouldReceive('validated')
            ->once()
            ->andReturn($validatedData);

        $controller = new MountainController($serviceMock);
        $response = $controller->createMountain($requestMock);

        $this->assertEquals(201, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertEquals('Mountain created successfully!', $data['message']);
        $this->assertArrayHasKey('data', $data);
        $this->assertEquals('Everest', $data['data']['name']);
        $this->assertEquals(8848, $data['data']['height']);
        $this->assertEquals('Nepal/China', $data['data']['location']);
    }

    public function test_update_mountain(): void
    {
        $validatedData = [
            'name' => 'K2',
            'height' => 8611,
            'location' => 'Pakistan/China',
            'latitude' => 35.8818,
            'longitude' => 76.5133,
            'image_url' => 'http://example.com/k2.jpg',
        ];

        $mountain = new Mountain(array_merge(['id' => 1], $validatedData));

        $serviceMock = Mockery::mock(MountainService::class);
        $serviceMock->shouldReceive('update')
            ->once()
            ->with(1, $validatedData)
            ->andReturn($mountain);

        $requestMock = Mockery::mock(UpdateMountainRequest::class);
        $requestMock->shouldReceive('validated')
            ->once()
            ->andReturn($validatedData);

        $controller = new MountainController($serviceMock);
        $response = $controller->updateMountain($requestMock, 1);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertEquals('Mountain updated successfully!', $data['message']);
        $this->assertEquals('K2', $data['data']['name']);
        $this->assertEquals(8611, $data['data']['height']);
        $this->assertEquals('Pakistan/China', $data['data']['location']);
    }

    public function test_delete_mountain(): void
    {
        $serviceMock = Mockery::mock(MountainService::class);
        $serviceMock->shouldReceive('delete')
            ->once()
            ->with(1)
            ->andReturnNull();

        $controller = new MountainController($serviceMock);
        $response = $controller->deleteMountain(1);

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertEquals('Mountain deleted successfully!', $data['message']);
        $this->assertArrayNotHasKey('data', $data);
    }
}
