import { Backlink, getBacklinkData } from '@/actions/backlink'

import { Brief, getAllBriefs } from './brief'
import { Article, getAllArticles } from './article'
import { cache } from 'react'

export type Deliverable = {
  briefs: Brief[];
  articles: Article[];
  backlinks: Backlink[];
}

export const getDeliverables = cache(async (): Promise<Deliverable> => {
  const [briefs, articles, backlinks] = await Promise.all([
    getAllBriefs(),
    getAllArticles(),
    getBacklinkData(),
  ])
  return { briefs, articles, backlinks }
})

