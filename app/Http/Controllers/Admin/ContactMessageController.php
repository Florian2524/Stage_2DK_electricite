<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ContactReplyMail;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    // Liste des messages (non lus en premier, puis récents)
    public function index(Request $request)
    {
        $query = ContactMessage::query();

        if ($request->boolean('only_unread')) {
            $query->where('is_read', false);
        }

        $messages = $query->orderBy('is_read')->orderByDesc('created_at')->get();

        return response()->json($messages);
    }

    // Détail d'un message + marquer comme lu
    public function show(ContactMessage $contactMessage)
    {
        if (!$contactMessage->is_read) {
            $contactMessage->is_read = true;
            $contactMessage->save();
        }

        return response()->json($contactMessage);
    }

    // Supprimer
    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return response()->noContent();
    }

    // Répondre par email
    public function reply(Request $request, ContactMessage $contactMessage)
    {
        $data = $request->validate([
            'subject' => ['required','string','min:2','max:150'],
            'body'    => ['required','string','min:2'],
        ]);

        Mail::to($contactMessage->email)
            ->send(new ContactReplyMail($contactMessage->name, $data['subject'], $data['body']));

        return response()->json(['success' => true]);
    }
}
