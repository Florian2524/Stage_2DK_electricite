<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ContactReplyMail;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    /**
     * Liste paginée + filtres
     * GET /api/admin/contact-messages?only_unread=1&ownership=proprietaire&work=pose-prises
     */
    public function index(Request $request)
{
    $q = ContactMessage::query();

    // Non lus uniquement
    if ($request->boolean('only_unread')) {
        $q->where('is_read', false);
    }

    // Filtre statut d'occupation (proprietaire|locataire)
    $ownership = $request->query('ownership'); // string|null
    if (is_string($ownership) && $ownership !== '') {
        $q->where('ownership', $ownership);
    }

    // Filtre par type de travaux (élément présent dans works_json[])
    $work = $request->query('work'); // string|null
    if (is_string($work) && $work !== '') {
        $q->whereJsonContains('works_json', $work);
    }

    // 🔧 MODE PLAIN (pas de pagination) — utile pour diagnostiquer/compat front
    if ($request->boolean('plain')) {
        $items = $q->orderBy('is_read')
                   ->orderByDesc('id')
                   ->get();

        return response()->json($items);
    }

    // Par défaut : pagination Laravel
    $items = $q->orderBy('is_read')
               ->orderByDesc('id')
               ->paginate(20);

    return response()->json($items);
}


    /**
     * Lecture (marque comme lu)
     * GET /api/admin/contact-messages/{id}
     */
    public function show(ContactMessage $contactMessage)
    {
        if (!$contactMessage->is_read) {
            $contactMessage->is_read = true;
            $contactMessage->save();
        }
        return response()->json($contactMessage);
    }

    /**
     * Suppression
     * DELETE /api/admin/contact-messages/{id}
     */
    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return response()->json(['success' => true]);
    }

    /**
     * Réponse email
     * POST /api/admin/contact-messages/{id}/reply
     * body: { subject: string, body: string }
     */
    public function reply(Request $request, ContactMessage $contactMessage)
    {
        $data = $request->validate([
            'subject' => ['required', 'string', 'min:2', 'max:150'],
            'body'    => ['required', 'string', 'min:2'],
        ]);

        Mail::to($contactMessage->email)->send(
            new ContactReplyMail($contactMessage->name, $data['subject'], $data['body'])
        );

        return response()->json(['success' => true]);
    }
}
