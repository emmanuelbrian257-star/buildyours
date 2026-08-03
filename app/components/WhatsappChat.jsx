import Link from 'next/link'
import React from 'react'

const WhatsappChat = () => {
    const phoneNumber = "254750552061";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  return (
    <div>
        <Link
            href={whatsappUrl}
            target="_blank"
            className="bg-green-500 text-white font-bosch px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
            Chat with us on WhatsApp
        </Link>
    </div>
  )
}

export default WhatsappChat
