<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactAutoReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactMessage $messageModel) {}

    public function build()
    {
        return $this->subject('Nous avons bien reçu votre demande')
            ->view('emails.contact_autoreply')
            ->with([
                'm' => $this->messageModel,
            ]);
    }
}
