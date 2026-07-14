"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-white/10 p-8 text-center">
        <p className="font-serif text-lg text-foreground">
          Terima kasih, pesanmu sudah terkirim.
        </p>
        <p className="mt-2 text-sm text-muted">
          Tim kami akan membalas secepatnya melalui email yang kamu berikan.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="text-xs uppercase tracking-widest text-muted"
        >
          Nama
        </label>
        <input
          id="name"
          type="text"
          required
          className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-xs uppercase tracking-widest text-muted"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-widest text-muted"
        >
          Pesan
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="mt-2 w-full resize-none border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center border border-white/30 px-8 py-3 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-white hover:text-black"
      >
        Kirim Pesan
      </button>
    </form>
  );
}
