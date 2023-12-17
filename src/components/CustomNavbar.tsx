'use client';
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react';
import { AcmeLogo } from './logo.jsx';
import { usePathname, useRouter } from 'next/navigation';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const menuItems = ['home', 'perhitungan', 'resep', 'Log Out'];

  return (
    <Navbar
      position='sticky'
      onMenuOpenChange={setIsMenuOpen}
      disableAnimation
      shouldHideOnScroll
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarContent justify='start'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
        <NavbarBrand>
          <AcmeLogo />
          <p className='text-lg font-bold text-inherit'>FlexCore</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        <NavbarItem isActive={pathname === '/'}>
          <Link href='/' color={pathname === '/' ? undefined : 'foreground'} aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/perhitungan'}>
          <Link href='/perhitungan' color={pathname === '/perhitungan' ? undefined : 'foreground'} aria-current={pathname === '/perhitungan' ? 'page' : undefined}>
            Perhitungan
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/resep'}>
          <Link color={pathname === '/resep' ? undefined : 'foreground'} href='/resep' aria-current={pathname === '/resep' ? 'page' : undefined}>
            Resep
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className='capitalize'>
            <Link color={pathname === `/${item}` ? undefined : index === menuItems.length - 1 ? 'danger' : 'foreground'} className='w-full' href={`/${item}`} size='lg' aria-current={pathname === `/${item}` ? 'page' : undefined}>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
