import BookReader from '@/components/book/BookReader';
import { BookSheet } from '@/components/book/BookPageContent';
import { bookPages } from '@/lib/book';

export default function Home() {
  return <BookReader pages={bookPages.map((page, index) => <BookSheet key={page.id} page={page} index={index} />)} />;
}
