'use client';

import { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import TabNavigation from '@/components/ui/navigation/TabNavigation';
import PageContainer, { PageContainerBody, PageContainerTabs } from '@/components/ui/layout/PageContainer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getKeywordData, KeywordData } from '@/actions/keywords';
import { getUrlData, UrlData } from '@/actions/url-performance';
import { getUpliftData, Uplift } from '@/actions/uplift';
import { getBacklinkData, Backlink } from '@/actions/backlink';
import { getPlanningData, Planning } from '@/actions/planning';

type TabName = 'urls' | 'keywords' | 'uplift' | 'backlinks' | 'planning';
type DataType = KeywordData | UrlData | Uplift | Backlink | Planning;
type TabDataConfig = {
  [key in TabName]: {
    fetchData: () => Promise<DataType[]>;
    setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  }
};

export default function SEOLayoutsPage() {
  const [activeTab, setActiveTab] = useState<TabName>('urls');
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [urlData, setUrlData] = useState<UrlData[]>([]);
  const [upliftData, setUpliftData] = useState<Uplift[]>([]);
  const [backlinkData, setBacklinkData] = useState<Backlink[]>([]);
  const [planningData, setPlanningData] = useState<Planning[]>([]);
  const [loading, setLoading] = useState(true);

  const tabDataMap = useMemo<TabDataConfig>(() => ({
    keywords: {
      fetchData: getKeywordData,
      setData: setKeywordData as React.Dispatch<React.SetStateAction<DataType[]>>,
    },
    urls: {
      fetchData: getUrlData,
      setData: setUrlData as React.Dispatch<React.SetStateAction<DataType[]>>,
    },
    uplift: {
      fetchData: getUpliftData,
      setData: setUpliftData as React.Dispatch<React.SetStateAction<DataType[]>>,
    },
    backlinks: {
      fetchData: getBacklinkData,
      setData: setBacklinkData as React.Dispatch<React.SetStateAction<DataType[]>>,
    },
    planning: {
      fetchData: getPlanningData,
      setData: setPlanningData as React.Dispatch<React.SetStateAction<DataType[]>>,
    },
  }), []);

  useEffect(() => {
    async function fetchData() {
      const tabConfig = tabDataMap[activeTab];

      if (!tabConfig) return;

      try {
        setLoading(true);
        const data = await tabConfig.fetchData();
        if (activeTab === 'keywords') {
          setKeywordData(data as KeywordData[]);
        } else if (activeTab === 'urls') {
          setUrlData(data as UrlData[]);
        } else if (activeTab === 'uplift') {
          setUpliftData(data as Uplift[]);
        } else if (activeTab === 'backlinks') {
          setBacklinkData(data as Backlink[]);
        } else if (activeTab === 'planning') {
          setPlanningData(data as Planning[]);
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab} data:`, error);
        tabConfig.setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activeTab, tabDataMap]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark">SEO Layouts</h1>
        <p className="text-mediumGray">View your SEO campaign data in customizable table formats</p>
      </div>

      <PageContainer>
        <PageContainerTabs>
          <TabNavigation
            tabs={[
              { id: 'urls', label: 'URLs' },
              { id: 'keywords', label: 'Keywords' },
              { id: 'uplift', label: 'Uplift Potential' },
              { id: 'backlinks', label: 'Backlinks' },
              { id: 'planning', label: 'Monthly Planning' },
            ]}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as TabName)}
            variant="primary"
          />
        </PageContainerTabs>
        <PageContainerBody>
          {/* URLs Tab */}
          {activeTab === 'urls' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-dark">URL Performance</h2>
                <div className="flex items-center space-x-2">
                  <select className="border border-lightGray rounded-md px-3 py-1 text-sm">
                    <option>All URLs</option>
                    <option>Blog Posts</option>
                    <option>Service Pages</option>
                    <option>Case Studies</option>
                  </select>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            URL
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Title
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Current Rank
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Target Rank
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Traffic
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Conversion
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Status
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {urlData.map((url) => (
                        <TableRow key={url.id}>
                          <TableCell className="font-medium">{url.url}</TableCell>
                          <TableCell>{url.title}</TableCell>
                          <TableCell>{url.currentRank}</TableCell>
                          <TableCell>{url.targetRank}</TableCell>
                          <TableCell>{url.traffic.toLocaleString()}</TableCell>
                          <TableCell>{url.conversion}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              url.status === 'Optimizing'
                                ? 'bg-blue-100 text-blue-800'
                                : url.status === 'Monitoring'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-amber-100 text-amber-800'
                            }`}>
                              {url.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {/* Keywords Tab */}
          {activeTab === 'keywords' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-dark">Keyword Performance</h2>
                <div className="flex items-center space-x-2">
                  <select className="border border-lightGray rounded-md px-3 py-1 text-sm">
                    <option>All Keywords</option>
                    <option>High Volume</option>
                    <option>Low Difficulty</option>
                    <option>Improving</option>
                  </select>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Keyword
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Volume
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Difficulty
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Current Rank
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Target Rank
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Target Page
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Status
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {keywordData.map((keyword) => (
                        <TableRow key={keyword.id}>
                          <TableCell className="font-medium">{keyword.keyword}</TableCell>
                          <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="mr-2">{keyword.difficulty}</span>
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    keyword.difficulty > 70 ? 'bg-red-500' :
                                    keyword.difficulty > 50 ? 'bg-amber-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${keyword.difficulty}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{keyword.currentRank}</TableCell>
                          <TableCell>{keyword.targetRank}</TableCell>
                          <TableCell>{keyword.targetPage}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              keyword.status === 'Improving'
                                ? 'bg-green-100 text-green-800'
                                : keyword.status === 'Stable'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                            }`}>
                              {keyword.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {/* Uplift Potential Tab */}
          {activeTab === 'uplift' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-dark">Uplift Potential Analysis</h2>
                <div className="flex items-center space-x-2">
                  <select className="border border-lightGray rounded-md px-3 py-1 text-sm">
                    <option>All Pages</option>
                    <option>High Priority</option>
                    <option>Medium Priority</option>
                    <option>Low Priority</option>
                  </select>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            URL
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Current Traffic
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Potential Traffic
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Uplift %
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Primary Keyword
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Secondary Keywords
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Priority
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upliftData.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">{page.url}</TableCell>
                          <TableCell>{page.currentTraffic.toLocaleString()}</TableCell>
                          <TableCell>{page.potentialTraffic.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={`font-medium ${
                              page.upliftPercentage > 200 ? 'text-green-600' :
                              page.upliftPercentage > 100 ? 'text-blue-600' : 'text-amber-600'
                            }`}>
                              +{page.upliftPercentage}%
                            </span>
                          </TableCell>
                          <TableCell>{page.primaryKeyword}</TableCell>
                          <TableCell>{page.secondaryKeywords}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              page.priority === 'Critical'
                                ? 'bg-red-100 text-red-800'
                                : page.priority === 'High'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                            }`}>
                              {page.priority}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {/* Backlinks Tab */}
          {activeTab === 'backlinks' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-dark">Backlink Analysis</h2>
                <div className="flex items-center space-x-2">
                  <select className="border border-lightGray rounded-md px-3 py-1 text-sm">
                    <option>All Backlinks</option>
                    <option>Live</option>
                    <option>Pending</option>
                    <option>High DR</option>
                  </select>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Target URL
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Source Domain
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Domain Rating
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Link Type
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Status
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Date Acquired
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {backlinkData.map((link) => (
                        <TableRow key={link.id}>
                          <TableCell className="font-medium">{link.targetUrl}</TableCell>
                          <TableCell>{link.sourceDomain}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="mr-2">{link.domainRating}</span>
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    link.domainRating > 80 ? 'bg-green-500' :
                                    link.domainRating > 60 ? 'bg-blue-500' : 'bg-amber-500'
                                  }`}
                                  style={{ width: `${link.domainRating}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{link.linkType}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              link.status === 'Live'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {link.status}
                            </span>
                          </TableCell>
                          <TableCell>{link.dateAcquired}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {/* Monthly Planning Tab */}
          {activeTab === 'planning' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-dark">Monthly SEO Planning</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Month
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Focus Keywords
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Content Pieces
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Backlinks Planned
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Technical Fixes
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="whitespace-nowrap">
                          <div className="flex items-center">
                            Expected Traffic Increase
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {planningData.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell className="font-medium">{plan.month}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {plan.focusKeywords.map((keyword, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{plan.contentPieces}</TableCell>
                          <TableCell>{plan.backlinksPlanned}</TableCell>
                          <TableCell>{plan.technicalFixes}</TableCell>
                          <TableCell className="text-green-600 font-medium">
                            {plan.expectedTrafficIncrease}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </PageContainerBody>
      </PageContainer>
    </DashboardLayout>
  );
}
