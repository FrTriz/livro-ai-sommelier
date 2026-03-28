import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type BookStatus = 'reading' | 'read' | 'wantToRead' | 'discover';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  coverUrl?: string;
  progress: number; // 0 to 100
  status: BookStatus;
  rating?: number;
  notes: string[];
  tags: string[];
  pages: number;
  pagesRead: number;
  reasonForYou?: string;
  matchPercentage?: number;
}

export interface UserStats {
  streak: number;
  booksReadThisYear: number;
  pagesReadThisYear: number;
  spacedRepPending: boolean;
  spacedRepRetention: number;
}

interface StoreContextType {
  books: Book[];
  stats: UserStats;
  selectedBookId: string | null;
  setSelectedBookId: (id: string | null) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  updateBookProgress: (id: string, pagesRead: number) => void;
  changeBookStatus: (id: string, newStatus: BookStatus) => void;
  addNoteToBook: (id: string, note: string) => void;
  completeSpacedRep: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    coverColor: 'bg-indigo-900',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9788599296493-L.jpg',
    progress: 45,
    status: 'reading',
    notes: ['A narrativa do Kvothe é fascinante.', 'A magia da Simpatia parece um sistema científico.'],
    tags: ['Fantasia', 'Épico', 'Magia'],
    pages: 656,
    pagesRead: 295,
  },
  {
    id: '2',
    title: 'A Coragem de Ser Imperfeito',
    author: 'Brené Brown',
    coverColor: 'bg-rose-800',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781592408412-L.jpg',
    progress: 100,
    status: 'read',
    rating: 5,
    notes: ['A vulnerabilidade não é fraqueza, é nossa maior medida de coragem.'],
    tags: ['Autoconhecimento', 'Psicologia'],
    pages: 208,
    pagesRead: 208,
  },
  {
    id: '3',
    title: 'A Redoma de Vidro',
    author: 'Sylvia Plath',
    coverColor: 'bg-emerald-800',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780060830495-L.jpg',
    progress: 0,
    status: 'wantToRead',
    notes: [],
    tags: ['Ficção', 'Clássico'],
    pages: 244,
    pagesRead: 0,
  },
  // Recomendações (Discover)
  {
    id: '4',
    title: 'O Oceano no Fim do Caminho',
    author: 'Neil Gaiman',
    coverColor: 'bg-cyan-800',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062255655-L.jpg',
    progress: 0,
    status: 'discover',
    notes: [],
    tags: ['Fantasia', 'Memória', 'Nostalgia'],
    pages: 208,
    pagesRead: 0,
    reasonForYou: 'Uma reflexão mágica e terna sobre perda e a jornada da vida adulta, perfeito para um recomeço esperançoso.',
    matchPercentage: 94,
  },
  {
    id: '5',
    title: 'Tudo Sobre o Amor',
    author: 'bell hooks',
    coverColor: 'bg-amber-700',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780060959470-L.jpg',
    progress: 0,
    status: 'discover',
    notes: [],
    tags: ['Amor', 'Ensaios', 'Cura'],
    pages: 266,
    pagesRead: 0,
    reasonForYou: 'Explora as dinâmicas de afeto de forma não-idealizada, construindo novos caminhos em tempos de desilusão.',
    matchPercentage: 88,
  }
];

const initialStats: UserStats = {
  streak: 12,
  booksReadThisYear: 4,
  pagesReadThisYear: 1420,
  spacedRepPending: true,
  spacedRepRetention: 85,
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedBooks = localStorage.getItem('@livroai:books');
    const storedStats = localStorage.getItem('@livroai:stats');
    
    if (storedBooks) setBooks(JSON.parse(storedBooks));
    if (storedStats) setStats(JSON.parse(storedStats));
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('@livroai:books', JSON.stringify(books));
      localStorage.setItem('@livroai:stats', JSON.stringify(stats));
    }
  }, [books, stats, isLoaded]);

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(book => book.id === id ? { ...book, ...updates } : book));
  };

  const addBook = (book: Book) => {
    setBooks(prev => [...prev, book]);
  };

  const removeBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const updateBookProgress = (id: string, pagesRead: number) => {
    setBooks(prev => prev.map(book => {
      if (book.id === id) {
        const progress = Math.min(100, Math.round((pagesRead / book.pages) * 100));
        let status = book.status;
        if (pagesRead >= book.pages) {
          status = 'read';
        } else if (pagesRead > 0 && status === 'wantToRead') {
          status = 'reading';
        }
        return { ...book, pagesRead, progress, status };
      }
      return book;
    }));
  };

  const changeBookStatus = (id: string, newStatus: BookStatus) => {
    setBooks(prev => prev.map(book => book.id === id ? { ...book, status: newStatus } : book));
  };

  const addNoteToBook = (id: string, note: string) => {
    setBooks(prev => prev.map(book => book.id === id ? { ...book, notes: [...book.notes, note] } : book));
  };

  const completeSpacedRep = () => {
    setStats(prev => ({ ...prev, spacedRepPending: false }));
  };

  if (!isLoaded) return null;

  return (
    <StoreContext.Provider value={{ 
      books, stats, selectedBookId, setSelectedBookId, 
      updateBook, addBook, removeBook, updateBookProgress, changeBookStatus, addNoteToBook, 
      completeSpacedRep 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
