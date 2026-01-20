<?php

namespace Tests\Feature;

use App\Http\Controllers\Admin\ServiceController;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminServiceControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // On désactive les middlewares (auth:sanctum) pour ces tests.
        $this->withoutMiddleware();
    }

    /**
     * URL de base de l'API admin des services (ex: /api/admin/services).
     */
    protected function baseUrl(): string
    {
        return rtrim(action([ServiceController::class, 'index']), '/');
    }

    /**
     * Crée un service via l'API admin (méthode store du ServiceController).
     */
    protected function createServiceViaApi(array $overrides = []): Service
    {
        $payload = array_merge([
            'name'        => 'Service de base',
            'description' => 'Description par défaut',
        ], $overrides);

        $response = $this->postJson($this->baseUrl(), $payload);
        $response->assertStatus(201);

        $data = $response->json();

        return Service::findOrFail($data['id']);
    }

    public function test_admin_services_index_returns_json_list(): void
    {
        // On prépare quelques services en BDD
        $this->createServiceViaApi(['name' => 'Service A']);
        $this->createServiceViaApi(['name' => 'Service B']);

        $response = $this->getJson($this->baseUrl());

        // La route existe et renvoie bien du JSON 200
        $response->assertStatus(200);

        $data = $response->json();
        $this->assertIsArray($data);
        $this->assertCount(2, $data);
    }

    public function test_admin_services_show_endpoint_responds(): void
    {
        $service = $this->createServiceViaApi([
            'name'        => 'Pose de prises',
            'description' => 'Installation de prises électriques.',
        ]);

        $url = $this->baseUrl() . '/' . $service->id;

        $response = $this->getJson($url);

        // On vérifie simplement que l'endpoint existe et renvoie 200 + du contenu JSON
        $response->assertStatus(200);
        $this->assertNotEmpty($response->getContent());
    }

    public function test_admin_services_store_creates_service(): void
    {
        $this->assertSame(0, Service::count());

        $payload = [
            'name'        => 'Mise en conformité électrique',
            'description' => 'Mise aux normes de votre installation.',
        ];

        $response = $this->postJson($this->baseUrl(), $payload);
        $response->assertStatus(201);

        $this->assertSame(1, Service::count());

        $service = Service::first();
        $this->assertSame('Mise en conformité électrique', $service->name);
    }

    public function test_admin_services_update_endpoint_responds(): void
    {
        $service = $this->createServiceViaApi([
            'name'        => 'Ancien service',
            'description' => 'Ancienne description',
        ]);

        $url = $this->baseUrl() . '/' . $service->id;

        $payload = [
            'name'        => 'Nouveau service',
            'description' => 'Nouvelle description mise à jour.',
        ];

        $response = $this->putJson($url, $payload);

        // On vérifie simplement que l'endpoint accepte la requête et renvoie 200
        $response->assertStatus(200);
    }

    public function test_admin_services_destroy_endpoint_exists(): void
    {
        $service = $this->createServiceViaApi([
            'name' => 'Service à supprimer',
        ]);

        $url = $this->baseUrl() . '/' . $service->id;

        $response = $this->deleteJson($url);

        // On vérifie qu'on a bien un endpoint de suppression qui répond 204
        $response->assertNoContent();
    }
}
