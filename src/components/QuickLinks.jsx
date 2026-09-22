import React from 'react';

export function QuickLinks({ href, t, Icon }) {
  const links = [
    { icon: 'machine', title: t.quickEquipment, text: t.quickEquipmentText, href: href('equipment') },
    { icon: 'parts', title: t.quickParts, text: t.quickPartsText, href: href('parts') },
    { icon: 'tool', title: t.quickService, text: t.quickServiceText, href: href('service') },
  ];

  return <nav aria-label={t.menu} className="border-y border-rule bg-white" data-quick-links>
    <div className="mx-auto grid max-w-site divide-y divide-rule px-5 sm:px-10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
      {links.map(item => <a key={item.icon} href={item.href} className="group flex min-h-16 items-center gap-4 py-3 text-industrial transition-colors hover:bg-paper sm:min-h-20 sm:gap-5 sm:py-4 lg:px-7 lg:first:ps-0 lg:last:pe-0">
        <span className="grid size-11 shrink-0 place-items-center text-steel group-hover:text-brand"><Icon name={item.icon} size={25} /></span>
        <span className="min-w-0 flex-1"><strong className="block text-sm font-bold leading-tight">{item.title}</strong><small className="mt-1 block text-xs leading-snug text-steel">{item.text}</small></span>
        <Icon className="directional shrink-0 text-steel transition-transform group-hover:translate-x-1" size={20} />
      </a>)}
    </div>
  </nav>;
}
