import { User, Settings, PieChart, Star, Activity, BookOpen, Repeat } from 'lucide-react';
import { useStore } from '../lib/store';

export function Profile() {
  const { stats } = useStore();

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-primary px-6 pt-16 pb-12 rounded-b-[2rem] shadow-sm relative z-10 text-center">
        <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4 border-4 border-white flex items-center justify-center p-2 backdrop-blur-sm">
          <div className="bg-secondary text-white w-full h-full rounded-full flex items-center justify-center">
            <User size={40} />
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">Leitor Curioso</h1>
        <p className="text-blue-200 text-sm font-medium">Buscando esperança e auto-descoberta</p>
        
        <button className="mt-6 border border-white/30 hover:bg-white/10 text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors mx-auto flex items-center gap-2">
          <Repeat size={16} /> Refazer Teste de Perfil
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 pb-32">
        {/* Anuais Stats */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2">
              <Activity size={20} className="text-primary" /> Seu Ano
            </h2>
            <select className="bg-slate-100 text-slate-500 font-medium text-sm py-1 px-3 rounded-full border-none focus:ring-0">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-1 items-center justify-center">
              <BookOpen size={24} className="text-secondary mb-2" />
              <span className="text-3xl font-serif font-bold text-slate-800">{stats.booksReadThisYear}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Livros Lidos</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-1 items-center justify-center">
              <Star size={24} className="text-yellow-500 mb-2" />
              <span className="text-3xl font-serif font-bold text-slate-800">{stats.pagesReadThisYear}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Páginas</span>
            </div>
          </div>
        </section>

        {/* Gêneros Favoritos */}
        <section>
          <h2 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2 mb-6">
            <PieChart size={20} className="text-primary" /> Gêneros
          </h2>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            {/* Fake progress bars for genres */}
            {[
              { label: 'Fantasia', value: 45, color: 'bg-indigo-500' },
              { label: 'Ficção', value: 30, color: 'bg-blue-400' },
              { label: 'Psicologia', value: 15, color: 'bg-teal-400' },
              { label: 'Autoajuda', value: 10, color: 'bg-orange-400' },
            ].map(genre => (
              <div key={genre.label}>
                <div className="flex justify-between text-sm font-semibold text-slate-600 mb-2">
                  <span>{genre.label}</span>
                  <span>{genre.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${genre.color} h-2 rounded-full`} style={{ width: `${genre.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Configurações */}
        <section>
          <h2 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2 mb-4">
            <Settings size={20} className="text-primary" /> Ajustes
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
            <button className="w-full text-left p-4 hover:bg-slate-50 font-medium text-slate-700 flex justify-between items-center">
              Notificações de Review <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">Ligado</span>
            </button>
            <button className="w-full text-left p-4 hover:bg-slate-50 font-medium text-slate-700">
              Gerenciar Assinatura
            </button>
            <button className="w-full text-left p-4 hover:bg-slate-50 font-medium text-red-500">
              Sair da Conta
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
