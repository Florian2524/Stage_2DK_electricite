<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactReceivedMail;
use App\Mail\ContactAutoReplyMail; // ⬅️ ajout
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Champs de base
        $rules = [
            'name'    => ['required','string','min:2','max:120'],
            'email'   => ['required','email','max:255'],
            'subject' => ['required','string','min:2','max:150'],
            'message' => ['required','string','min:5'],
        ];

        // Champs structurés (optionnels)
        $rules += [
            'phone'        => ['nullable','string','max:30'],
            'ownership'    => ['nullable', Rule::in(['proprietaire','locataire'])],
            'site_address' => ['nullable','string','max:255'],
            'works'        => ['nullable','array'],
            'works.*'      => ['string','max:50'],
            'rgpd'         => ['nullable','boolean'],
        ];

        $data = $request->validate($rules);

        // Mapping vers colonnes
        $payload = [
            'name'         => $data['name'],
            'email'        => $data['email'],
            'subject'      => $data['subject'],
            'message'      => $data['message'],
            'phone'        => $data['phone']        ?? null,
            'ownership'    => $data['ownership']    ?? null,
            'site_address' => $data['site_address'] ?? null,
            'works_json'   => isset($data['works']) ? array_values($data['works']) : null,
            'rgpd'         => (bool)($data['rgpd'] ?? false),
        ];

        $msg = ContactMessage::create($payload);

        // Mail admin (destinataire = MAIL_FROM_ADDRESS par défaut)
        $to = config('mail.from.address');
        if ($to) {
            Mail::to($to)->send(new ContactReceivedMail($msg));
        }

        // Accusé de réception au visiteur
        if (!empty($msg->email)) {
            Mail::to($msg->email)->send(new ContactAutoReplyMail($msg));
        }

        return response()->json(['success' => true], 201);
    }
}
