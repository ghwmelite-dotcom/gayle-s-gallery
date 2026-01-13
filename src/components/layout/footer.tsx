import Link from 'next/link'
import { Heart, Palette, Instagram, Mail } from 'lucide-react'

const footerLinks = {
  gallery: [
    { href: '/gallery', label: 'All Artwork' },
    { href: '/gallery?featured=true', label: 'Featured Pieces' },
  ],
  about: [
    { href: '/about', label: 'About Gayle' },
    { href: '/support', label: 'Support' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gallery-900 text-gallery-100 mt-auto">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-accent-coral via-accent-lavender to-accent-mint" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-coral to-accent-lavender flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-white">
                Gayle&apos;s Gallery
              </span>
            </Link>
            <p className="text-gallery-400 max-w-sm mb-6">
              A magical collection of original paintings by Gayle. Each piece tells a story,
              capturing imagination and wonder on canvas.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 text-gallery-400 hover:text-accent-coral hover:bg-gallery-800 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@gaylesgallery.com"
                className="p-2 text-gallery-400 hover:text-accent-coral hover:bg-gallery-800 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Gallery Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Gallery
            </h4>
            <ul className="space-y-2">
              {footerLinks.gallery.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gallery-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gallery-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gallery-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gallery-500">
            &copy; {new Date().getFullYear()} Gayle&apos;s Gallery. All artwork is original and protected.
          </p>
          <p className="text-sm text-gallery-500 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent-coral" /> for Gayle
          </p>
        </div>
      </div>
    </footer>
  )
}
