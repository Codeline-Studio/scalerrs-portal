import { Button } from '@/components/ui/button'
import { useState } from 'react'
export const DeliverablesStatusFilters =
export const DeliverablesFilters = () => {
  const [mainTab, setMainTab] = useState('content')
  return <div className="page-container-tabs">
    <div className="tab-navigation">
      <div className="flex overflow-x-auto">
        <Button
          className={`tab-item ${mainTab === 'content'
            ? 'tab-item-active'
            : 'tab-item-inactive'} font-semibold`}
          onClick={() => setMainTab('content')}
        >
          Content
        </Button>
        <Button
          className={`tab-item ${mainTab === 'backlinks'
            ? 'tab-item-active'
            : 'tab-item-inactive'} font-semibold`}
          onClick={() => setMainTab('backlinks')}
        >
          Backlinks
        </Button>
      </div>
    </div>
  </div>
}

