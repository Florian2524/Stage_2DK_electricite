<?php

namespace Tests\Feature;

use App\Mail\ContactAutoReplyMail;
use App\Mail\ContactReceivedMail;
use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_requires_mandatory_fields(): void
    {
        // On envoie une requête POST JSON vide sur /api/contact
        $response = $this->postJson('/api/contact', []);

        // On s'attend à une erreur de validation : status HTTP 422
        $response->assertStatus(422);

        // On vérifie que des erreurs existent bien pour ces champs
        $response->assertJsonValidationErrors([
            'name',
            'email',
            'subject',
            'message',
        ]);
    }

    public function test_valid_contact_creates_message_and_sends_mails(): void
    {
        // On évite d'envoyer de vrais mails pendant le test
        Mail::fake();

        // On part d'une base vide
        $this->assertSame(0, ContactMessage::count());

        $payload = [
            'name'         => 'Jean Dupont',
            'email'        => 'jean.dupont@example.com',
            'subject'      => 'Demande de devis',
            'message'      => 'Bonjour, je souhaite un devis pour une installation électrique.',
            'phone'        => '0600000000',
            'ownership'    => 'proprietaire',
            'site_address' => '1 rue des Tests, 33000 Bordeaux',
            'works'        => ['pose-prises', 'depannage'],
            'rgpd'         => true,
        ];

        // On envoie la requête POST JSON sur /api/contact
        $response = $this->postJson('/api/contact', $payload);

        // 1) Vérifier la réponse HTTP + JSON
        $response
            ->assertStatus(201)             // 201 = ressource créée
            ->assertJson(['success' => true]);

        // 2) Vérifier qu'un message a bien été créé en base
        $this->assertSame(1, ContactMessage::count());

        /** @var \App\Models\ContactMessage $message */
        $message = ContactMessage::first();

        $this->assertSame($payload['name'], $message->name);
        $this->assertSame($payload['email'], $message->email);
        $this->assertSame($payload['subject'], $message->subject);
        $this->assertSame($payload['message'], $message->message);
        $this->assertSame($payload['phone'], $message->phone);
        $this->assertSame($payload['ownership'], $message->ownership);
        $this->assertSame($payload['site_address'], $message->site_address);
        $this->assertSame((bool) $payload['rgpd'], (bool) $message->rgpd);
        $this->assertFalse($message->is_read);

        // 3) Vérifier que les mails ont bien été "envoyés"

        // Mail admin (ContactReceivedMail)
        Mail::assertSent(ContactReceivedMail::class, function ($mail) {
            $to = config('mail.from.address');

            // Si aucun mail "from" n'est configuré, on ne force pas le test là-dessus
            if (empty($to)) {
                return true;
            }

            return $mail->hasTo($to);
        });

        // Mail d'auto-réponse visiteur (ContactAutoReplyMail)
        Mail::assertSent(ContactAutoReplyMail::class, function ($mail) use ($payload) {
            return $mail->hasTo($payload['email']);
        });
    }
}
