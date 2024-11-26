import { SignedOut, SignIn, SignInButton } from '@clerk/clerk-react'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'search' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
]

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/owl logo.svg"
            width={40}
            height={40}
            alt="logo"
          />

          <p className="nav-logo">
            <span className='text-primary'>OWL</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            <Image 
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        
      </nav>
    </header>
  )
}

export default Navbar