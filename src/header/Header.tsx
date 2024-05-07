import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const navigation = [
  { name: 'Trang chủ', href: '/home', current: false },
  { name: 'Thông tin', href: '/services', current: false },
  {
    name: 'Robothon 2024',
    href: '/sales',
    current: false,
  },
  {
    name: 'Liên Hệ',
    href: '/contact',
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <Disclosure
      as="nav"
      className="rounded-zoom-responsive bg-white-800 animate-fade-down relative"
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#000',
      }}
    >
      {({ open }) => (
        <>
          <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className="hover:text-#6C553E focus:ring-#6C553E inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset"
                  style={{
                    backgroundColor: open ? '#4B2727' : 'transparent',
                  }}
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/home" className="flex shrink-0 items-center">
                  <img
                    className="h-16 w-30"
                    src="/logo.png"
                    alt="Vì Người Việt"
                  />
                </Link>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:ml-6 sm:block">
                  <style jsx>{`
                    .link-underline::after {
                      content: '';
                      display: block;
                      width: 0;
                      height: 2px;
                      background: #f05924;
                      transition: width 0.3s;
                    }
                    .link-underline:hover {
                    }
                    .link-underline:hover::after {
                      width: 100%;
                    }
                  `}</style>
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href} passHref>
                        <div
                          className={classNames(
                            'px-3 py-2 text-sm font-medium relative hover:text-[#f05924] text-white font-bold link-underline',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="animate-fade-down sm:hidden">
            <div
              className="absolute z-10 w-full"
              style={{
                top: '4rem', // Adjust this value to match the height of your navigation bar
                backgroundColor: 'black', // This sets the background color of the panel
              }}
            >
              <style jsx>{`
                .link-underline::after {
                  content: '';
                  display: block;
                  width: 0;
                  height: 2px;
                  background: white;
                  transition: width 0.3s;
                  position: absolute;
                  bottom: 0;
                  left: 0;
                }

                .link-underline:hover::after {
                  width: 100%;
                }
              `}</style>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block border-b border-[white] px-3 py-2 text-base font-medium hover:text-[#f05924]"
                  style={{ color: 'white' }}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
