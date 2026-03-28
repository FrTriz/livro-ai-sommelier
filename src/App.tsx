import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BottomNav } from './components/BottomNav'
import type { TabKey } from './components/BottomNav'
import { OnboardingModal } from './views/OnboardingModal'
import { Home } from './views/Home'
import { Discover } from './views/Discover'
import { Discussion } from './views/Discussion'
import { Bookshelf } from './views/Bookshelf'
import { Profile } from './views/Profile'
import { BookDetails } from './views/BookDetails'

function App() {
  const [activeTab, setActiveTab] = React.useState<TabKey>('home')
  const [showOnboarding, setShowOnboarding] = React.useState<boolean>(true)

  React.useEffect(() => {
    const persona = localStorage.getItem('@livroai:persona')
    if (persona) {
      setShowOnboarding(false)
    }
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-background text-slate-900 pb-20 overflow-x-hidden pt-safe">
      <AnimatePresence mode="wait">
        {showOnboarding ? (
          <OnboardingModal key="onboarding" onComplete={handleOnboardingComplete} />
        ) : (
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {activeTab === 'home' && <Home />}
            {activeTab === 'discover' && <Discover />}
            {activeTab === 'discussion' && <Discussion />}
            {activeTab === 'bookshelf' && <Bookshelf />}
            {activeTab === 'profile' && <Profile />}
          </motion.main>
        )}
      </AnimatePresence>

      {!showOnboarding && (
        <>
          <BottomNav activeTab={activeTab} onChange={setActiveTab} />
          <BookDetails />
        </>
      )}
    </div>
  )
}

export default App
