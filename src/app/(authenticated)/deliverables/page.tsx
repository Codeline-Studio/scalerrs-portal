import MonthSelector from '@/components/ui/selectors/MonthSelector'
import {
  updateBriefStatus,
  updateArticleStatus,
} from '@/lib/client-api'
import { BriefBoard, ArticleBoard } from '@/components/kanban/KanbanBoard'

import { Button } from '@/components/ui/button'
import { BriefStatus } from '@/actions/brief'
import { ArticleStatus } from '@/actions/article'
import { DeliverablesFilters } from './filters'

// Define types for tabs
type MainTab = 'content' | 'backlinks';
type ContentTab = 'briefs' | 'articles';

export default function DeliverablePage () {
  
  const mainTab = 'content' as MainTab
  const contentTab = 'briefs' as ContentTab

// TODO: Apply status filter
//   TODO: Apply month filter
//   TODO: Apply DR Domain rating Filter

  // Create a mapping of URL Performance record IDs to URL paths

  // Handle brief status changes
  const handleBriefStatusChange = async (
    briefId: string, newStatus: BriefStatus) => {
    try {
      console.log(
        `Attempting to update brief ${briefId} status to ${newStatus}...`)

      // Update the status in Airtable

      console.log('Updated brief:', briefId, newStatus)

      console.log(`Brief ${briefId} status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating brief status:', error)

      // Set a flag to use mock data for future requests
      if (typeof window !== 'undefined') {
        localStorage.setItem('use-mock-data', 'true')
      }

    }
  }

  // Handle article status changes
  const handleArticleStatusChange = async (
    articleId: string, newStatus: ArticleStatus) => {
    try {
      console.log(
        `Attempting to update article ${articleId} status to ${newStatus}...`)
      // Update the status in Airtable
      const updatedArticle = await updateArticleStatus(articleId, newStatus)
      console.log('Updated article:', updatedArticle)
      console.log(`Article ${articleId} status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating article status:', error)

    }
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-dark mr-4">Deliverables</h1>

        </div>
        <div className="relative">
          <MonthSelector/>
        </div>
      </div>


      <div className="page-container mb-6">
        <DeliverablesFilters/>
        <div>
          {mainTab === 'content' && (
            <div>
              <div className="page-container-tabs border-t-0">
                <div className="flex justify-between items-center w-full">
                  <div className="tab-navigation">
                    <div className="flex overflow-x-auto">
                      <Button
                        className={`tab-item ${contentTab === 'briefs'
                          ? 'tab-item-active'
                          : 'tab-item-inactive'} font-medium`}
                        onClick={() => setContentTab('briefs')}
                      >
                        Briefs
                      </Button>
                      <Button
                        className={`tab-item ${contentTab === 'articles'
                          ? 'tab-item-active'
                          : 'tab-item-inactive'} font-medium`}
                        onClick={() => setContentTab('articles')}
                      >
                        Articles
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      className="flex items-center text-sm text-gray-600 bg-white border border-gray-200 rounded-md px-3 py-1.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg"
                           className="h-4 w-4 mr-1" fill="none"
                           viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth={2} d="M4 4h16v16H4V4z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth={2} d="M4 10h16M10 4v16"></path>
                      </svg>
                      Board
                    </Button>
                    <Button
                      className="flex items-center text-sm text-gray-600 bg-white border border-gray-200 rounded-md px-3 py-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg"
                           className="h-4 w-4 mr-1" fill="none"
                           viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h7"></path>
                      </svg>
                      Inbox
                    </Button>
                  </div>
                </div>
              </div>
              <div className="page-container-body">
                <div>
                  {contentTab === 'briefs' && (
                    <>
                      <div className="mb-4">
                        <div
                          className="flex justify-between items-center bg-purple-100 p-2 rounded-md mb-2">
                          <div className="flex items-center">
                            <div
                              className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg"
                                   className="h-4 w-4" fill="none"
                                   viewBox="0 0 24 24" stroke="#6B21A8">
                                <path strokeLinecap="round"
                                      strokeLinejoin="round" strokeWidth={2}
                                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                            <p className="text-sm font-medium">
                              {filteredBriefs.filter(brief => brief.Status ===
                                'Review Brief').length} drafts need your
                              decision
                            </p>
                          </div>
                          <Button
                            className="flex items-center text-sm text-gray-600 bg-white border border-gray-200 rounded-md px-3 py-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-4 w-4 mr-1" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth={2}
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                            </svg>
                            Show only my tasks
                          </Button>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm text-gray-600 mb-1">
                            {selectedMonth}: {filteredBriefs.filter(
                            brief => brief.Status ===
                              'Brief Approved').length} of {filteredBriefs.length} briefs
                            approved
                            ({filteredBriefs.length > 0 ? Math.round(
                            (filteredBriefs.filter(brief => brief.Status ===
                                'Brief Approved').length /
                              filteredBriefs.length) * 100) : 0}%)
                          </p>
                          <div
                            className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-primary h-1.5 rounded-full"
                              style={{
                                width: `${filteredBriefs.length > 0
                                  ? Math.round((filteredBriefs.filter(
                                      brief => brief.Status ===
                                        'Brief Approved').length /
                                    filteredBriefs.length) * 100)
                                  : 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <BriefBoard
                        briefs={filteredBriefs}
                        onStatusChange={handleBriefStatusChange}
                        selectedMonth={selectedMonth}
                      />
                    </>
                  )}

                  {contentTab === 'articles' && (
                    <>
                      <div className="mb-6">
                        <p className="text-sm font-medium text-dark">
                          {selectedMonth}: {filteredArticles.length} articles
                        </p>
                      </div>
                      <ArticleBoard
                        articles={filteredArticles}
                        onStatusChange={handleArticleStatusChange}
                        selectedMonth={selectedMonth}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {mainTab === 'backlinks' && (
            <div>
              <div className="page-container-tabs border-t-0">
                <div className="flex justify-between items-center w-full">
                  <div className="tab-navigation">
                    {/* No sub-tabs needed for backlinks */}
                  </div>
                  <div className="flex items-center">
                    <Button
                      className="flex items-center text-sm text-gray-600 bg-white border border-gray-200 rounded-md px-3 py-1.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg"
                           className="h-4 w-4 mr-1" fill="none"
                           viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                      </svg>
                      Filter
                    </Button>
                  </div>
                </div>
              </div>
              <div className="page-container-body">
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedMonth}: {filteredBacklinks.filter(
                      b => b.Status === 'Live').length} links live
                      ({filteredBacklinks.length > 0 ? Math.round(
                      (filteredBacklinks.filter(
                          b => b.Status === 'Live').length /
                        filteredBacklinks.length) * 100) : 0}%)
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{
                          width: `${filteredBacklinks.length > 0
                            ? Math.round((filteredBacklinks.filter(
                                b => b.Status === 'Live').length /
                              filteredBacklinks.length) * 100)
                            : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {filteredBacklinks.length > 0 ? (
                    <div className="bg-white rounded-md">
                      <div className="border-b border-lightGray">
                        <div
                          className="grid grid-cols-7 text-xs font-medium text-mediumGray uppercase">
                          <div className="px-4 py-3">Domain</div>
                          <div className="px-4 py-3">DR</div>
                          <div className="px-4 py-3">Link Type</div>
                          <div className="px-4 py-3">Target Page</div>
                          <div className="px-4 py-3">Status</div>
                          <div className="px-4 py-3">Went Live On</div>
                          <div className="px-4 py-3">Notes</div>
                        </div>
                      </div>
                      <div>
                        {filteredBacklinks.map((backlink, index) => (
                          <div
                            key={backlink.id}
                            className={`grid grid-cols-7 text-sm hover:bg-lightGray ${index !==
                            filteredBacklinks.length - 1
                              ? 'border-b border-lightGray'
                              : ''}`}
                            style={{ color: '#353233' }}
                          >
                            <div
                              className="px-4 py-4 font-medium text-dark">{backlink['Source Domain'] ||
                              backlink.Domain || 'Unknown Domain'}</div>
                            <div className="px-4 py-4">
                                <span
                                  className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                                  {backlink['Domain Authority/Rating'] !==
                                  undefined
                                    ? backlink['Domain Authority/Rating']
                                    : (backlink.DomainRating !== undefined
                                      ? backlink.DomainRating
                                      : 'N/A')}
                                </span>
                            </div>
                            <div
                              className="px-4 py-4 text-mediumGray">{backlink['Link Type'] ||
                              backlink.LinkType || 'Unknown Type'}</div>
                            <div className="px-4 py-4 text-mediumGray">
                              {(() => {
                                // Get the target URL from the appropriate field
                                const targetUrl = backlink['Target URL'] ||
                                  backlink.TargetPage || '/'

                                // Handle array of record IDs (Airtable linked records)
                                if (Array.isArray(targetUrl) &&
                                  targetUrl.length > 0) {
                                  const recordId = targetUrl[0]

                                  // Look up the URL path from our URL Performance data
                                  if (urlPathMap[recordId]) {
                                    return urlPathMap[recordId]
                                  }

                                  // If we don't have a mapping, use a generic path
                                  return `/page-${recordId.substring(0, 5)}`
                                }

                                // Handle single record ID
                                if (typeof targetUrl === 'string' &&
                                  targetUrl.startsWith('rec') &&
                                  targetUrl.length === 17) {
                                  // Look up the URL path from our URL Performance data
                                  if (urlPathMap[targetUrl]) {
                                    return urlPathMap[targetUrl]
                                  }

                                  // If we don't have a mapping, use a generic path
                                  return `/page-${targetUrl.substring(0, 5)}`
                                }

                                // Format and display the URL
                                if (typeof targetUrl === 'string') {
                                  if (targetUrl.startsWith('http')) {
                                    return (
                                      <a
                                        href={targetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                      >
                                        {targetUrl.replace(
                                          /^https?:\/\/[^/]+\//, '/')}
                                      </a>
                                    )
                                  } else if (targetUrl.startsWith('/')) {
                                    return targetUrl
                                  } else {
                                    return `/${targetUrl}`
                                  }
                                } else {
                                  // If it's not a string or array, return a default value
                                  return '/'
                                }
                              })()}
                            </div>
                            <div className="px-4 py-4">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                  ${backlink.Status === 'Live'
                                  ? 'bg-green-100 text-green-800'
                                  :
                                  backlink.Status === 'Scheduled' ||
                                  backlink.Status === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    :
                                    'bg-gray-100 text-gray-800'}`}>
                                  {backlink.Status || 'Unknown Status'}
                                </span>
                            </div>
                            <div className="px-4 py-4 text-mediumGray">
                              {backlink['Went Live On']
                                ? new Date(
                                  backlink['Went Live On']).toLocaleDateString(
                                  'en-US', { month: 'short', day: 'numeric' })
                                : (backlink.WentLiveOn
                                  ? new Date(
                                    backlink.WentLiveOn).toLocaleDateString(
                                    'en-US',
                                    { month: 'short', day: 'numeric' })
                                  : '—')}
                            </div>
                            <div
                              className="px-4 py-4 text-mediumGray">{backlink.Notes ||
                              '—'}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="p-4 text-center bg-white rounded-lg border border-lightGray">
                      <p className="text-gray-500">No backlinks data available
                        for {selectedMonth}</p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-4">
                    <div>
                      <label
                        className="block text-xs font-medium text-mediumGray mb-1">Filter
                        by Status</label>
                      <select
                        className="px-3 py-2 text-sm border border-lightGray rounded-md bg-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="Live">Live</option>
                        <option value="Pending">Pending</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Planned">Planned</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-xs font-medium text-mediumGray mb-1">Filter
                        by DR</label>
                      <select
                        className="px-3 py-2 text-sm border border-lightGray rounded-md bg-white"
                        value={drFilter}
                        onChange={(e) => setDrFilter(e.target.value)}
                      >
                        <option value="all">All DR</option>
                        <option value="50+">DR 50+</option>
                        <option value="60+">DR 60+</option>
                        <option value="70+">DR 70+</option>
                      </select>
                    </div>
                    {(statusFilter !== 'all' || drFilter !== 'all') && (
                      <div className="flex items-end">
                        <Button
                          onClick={() => {
                            setStatusFilter('all')
                            setDrFilter('all')
                          }}
                          className="px-3 py-2 text-sm text-primary border border-primary rounded-md bg-white hover:bg-primary hover:text-white transition-colors"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </main>
  )
}
