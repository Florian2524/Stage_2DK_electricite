<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactReceivedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactMessage $messageModel) {}

    public function build()
    {
        return $this->subject('Nouvelle demande de contact')
            ->view('emails.contact_received')
            ->with([
                'm' => $this->messageModel,
            ]);
    }
}
