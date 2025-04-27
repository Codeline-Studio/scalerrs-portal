'use server'
export const getAllReports = async () => {
  return  {
    weekly: [
      { id: 1, title: 'Weekly SEO Update - Apr 1, 2025', date: '2025-04-01', type: 'weekly' },
      { id: 2, title: 'Weekly SEO Update - Mar 25, 2025', date: '2025-03-25', type: 'weekly' },
      { id: 3, title: 'Weekly SEO Update - Mar 18, 2025', date: '2025-03-18', type: 'weekly' },
      { id: 4, title: 'Weekly SEO Update - Mar 11, 2025', date: '2025-03-11', type: 'weekly' },
    ],
    monthly: [
      { id: 5, title: 'March 2025 SEO Performance Report', date: '2025-04-01', type: 'monthly' },
      { id: 6, title: 'February 2025 SEO Performance Report', date: '2025-03-01', type: 'monthly' },
      { id: 7, title: 'January 2025 SEO Performance Report', date: '2025-02-01', type: 'monthly' },
    ],
    quarterly: [
      { id: 8, title: 'Q1 2025 SEO Strategy & Performance Review', date: '2025-04-01', type: 'quarterly' },
      { id: 9, title: 'Q4 2024 SEO Strategy & Performance Review', date: '2025-01-01', type: 'quarterly' },
    ]
  };
}
