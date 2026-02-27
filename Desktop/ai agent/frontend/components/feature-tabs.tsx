'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { FeatureTab } from '@/types'

interface FeatureTabsProps {
  tabs: FeatureTab[]
  defaultTabId?: string
}

export function FeatureTabs({ tabs, defaultTabId }: FeatureTabsProps) {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId || tabs[0]?.id || ''
  )

  const activeTab = tabs.find((t) => t.id === activeTabId)

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:pb-0">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTabId === tab.id
                ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                : 'glass hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab && (
        <motion.div
          key={activeTabId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab.component}
        </motion.div>
      )}
    </div>
  )
}
