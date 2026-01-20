<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiPingTest extends TestCase
{
    public function test_ping_endpoint_returns_json_pong(): void
    {
        // On appelle l'endpoint /api/ping
        $response = $this->getJson('/api/ping');

        // On vérifie que la réponse est bien 200 OK
        $response->assertStatus(200);

        // On vérifie que le JSON contient bien { "pong": true }
        $response->assertJson([
            'pong' => true,
        ]);
    }
}
