'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from "./SidebarNotes.module.css";

// Список тегів, що доступні для фільтрації
const AVAILABLE_TAGS = [
  { id: 'all', name: 'All notes' },
  { id: 'Todo', name: 'Todo' },
  { id: 'Work', name: 'Work' },
  { id: 'Personal', name: 'Personal' },
  { id: 'Meeting', name: 'Meeting' },
  { id: 'Shopping', name: 'Shopping' },
];

export default function SidebarNotes() {
  const pathname = usePathname();

  // Визначаємо активний тег з поточного маршруту
  const getActiveTag = () => {
    const match = pathname.match(/\/notes\/filter\/([^/]+)$/);
    return match ? match[1] : 'all';
  };

  const activeTag = getActiveTag();

  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {AVAILABLE_TAGS.map((tag) => (
          <li key={tag.id} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag.id}`}
              className={`${css.menuLink} ${activeTag === tag.id ? css.active : ''}`}
            >
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
