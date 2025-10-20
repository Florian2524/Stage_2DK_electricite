<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Mail\ContactReceivedMail;
use App\Mail\ContactAutoReplyMail;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;


class ContactController extends Controller
{
public function store(Request $request)
{
$data = $request->validate([
'name' => ['required','string','min:2','max:120'],
'email' => ['required','email','max:150'],
'subject' => ['required','string','min:2','max:150'],
'message' => ['required','string','min:5'],


'phone' => ['nullable','string','max:50'],
'ownership' => ['nullable', Rule::in(['proprietaire','locataire'])],
'site_address' => ['nullable','string','max:255'],
'works' => ['nullable','array'],
'works.*' => ['string','max:80'],
'rgpd' => ['boolean'],
]);


$msg = new ContactMessage();
$msg->fill([
'name' => $data['name'],
'email' => $data['email'],
'subject' => $data['subject'],
'message' => $data['message'],
'phone' => $data['phone'] ?? null,
'ownership' => $data['ownership'] ?? null,
'site_address'=> $data['site_address'] ?? null,
'works_json' => $data['works'] ?? null,
'rgpd' => (bool)($data['rgpd'] ?? false),
]);
$msg->is_read = false;
$msg->save();


// Envoi mail admin
if ($to = config('mail.from.address')) {
Mail::to($to)->send(new ContactReceivedMail($msg));
}


// Accusé de réception visiteur
Mail::to($msg->email)->send(new ContactAutoReplyMail($msg));


return response()->json(['success' => true], 201);
}
}