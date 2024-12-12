"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav className='sticky z-50 top-0 bg-background border-b fade-in'>
      <div className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.jpg" alt="Logo" className="h-8 w-auto" height={40} width={40}/>
          <span className="ml-2 text-lg">bdr</span>
        </Link>
        
        {/* Menu desktop */}
        <div className="hidden md:flex space-x-0 items-center">
          <Link href="/"><Button variant="ghost" className='text-sm font-medium px-3 rounded-md'>A propos</Button></Link>
          <Link href="/veterans"><Button variant="ghost" className='text-sm font-medium px-3 rounded-md'>Vétérans</Button></Link>
          <Link href="/redacteurs"><Button variant="ghost" className='text-sm font-medium px-3 rounded-md'>Rédacteurs</Button></Link>
          <Link href="/contact" className='ps-4'><Button className='text-sm font-medium p-5 rounded-md'>Nous contacter</Button></Link>
        </div>

        {/* Bouton menu mobile */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden hover:bg-accent rounded border p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Menu mobile déroulant */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[69px] bg-background transition-all duration-300 ease-in-out ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 max-h-[calc(100vh-73px)] overflow-y-auto">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-lg font-medium">
              A propos
            </Button>
          </Link>
          <Link href="/veterans" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-lg font-medium">
              Vétérans
            </Button>
          </Link>
          <Link href="/redacteurs" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-lg font-medium">
              Rédacteurs
            </Button>
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <Button className="w-full text-lg font-medium p-6">
              Nous contacter
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}