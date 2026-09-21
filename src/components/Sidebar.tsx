/* eslint-disable */
// @ts-nocheck
import Link from 'next/link';
import { Home, Compass, PawPrint, BarChart3, Rocket, FileText, ShieldCheck } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Rescues', href: '/rescues', icon: PawPrint },
    { name: 'Launch', href: '/launch', icon: Rocket },
    { name: 'Shelter Portal', href: '/claim', icon: ShieldCheck },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Docs', href: '/docs', icon: FileText },
  ];

  return (
    <div className="sticky top-0 hidden h-screen w-[275px] flex-col border-r border-border bg-background px-3 pb-3 xl:flex shrink-0">
      <div className="py-2">
        <Link href="/" className="flex h-16 w-fit items-center gap-3 rounded-full px-3 text-primary transition-colors hover:bg-secondary/40">
          <PawPrint className="h-8 w-8 text-accent fill-accent" />
          <span className="text-xl font-bold">ShelterFund</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 rounded-full px-3 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-primary"
            >
              <Icon className="h-6 w-6" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto">
        <Link href="https://x.com/ShelterFund" target="_blank" className="flex items-center gap-3 rounded-full p-2 hover:bg-secondary/40 transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
            <span className="font-bold">SF</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-primary">ShelterFund</span>
            <span className="text-sm text-muted-foreground">@ShelterFund</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
