import { motion } from "framer-motion"
import { Home, Compass, Library, MessageCircle, User } from "lucide-react"
import { cn } from "../lib/utils"

export type TabKey = 'home' | 'discover' | 'bookshelf' | 'discussion' | 'profile';

type BottomNavProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Compass, label: 'Descobrir' },
    { id: 'bookshelf', icon: Library, label: 'Estante' },
    { id: 'discussion', icon: MessageCircle, label: 'Discussão' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id as TabKey)}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={24} className={cn("transition-transform", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
