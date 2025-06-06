'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import TabNavigation, { TabContent } from '@/components/ui/navigation/TabNavigation';
import PageContainer, { PageContainerHeader, PageContainerBody, PageContainerTabs } from '@/components/ui/layout/PageContainer';
import { fetchTasks, fetchComments, addComment, updateTaskStatus } from '@/lib/client-api';
import MonthlyProjectionsBoard from '@/components/task-boards/monthly-projections-board';
// Import task types from our types file
import {
  Task,
  TaskStatus,
  TaskPriority,
  TaskEffort,
  ActiveTask,
  CompletedTask,
  AirtableTask,
  mapAirtableTaskToTask,
  TaskComment
} from '@/types/task';

// Define Comment type for this page
type Comment = {
  id: number | string;
  author: string;
  text: string;
  timestamp: string;
  replies?: Comment[];
};

// Sample task data
const taskBoards: Record<string, Task[]> = {
  technicalSEO: [
    {
      id: 1,
      task: 'Fix broken internal links',
      status: 'In Progress' as TaskStatus,
      priority: 'High' as TaskPriority,
      assignedTo: 'Acex Romero',
      dateLogged: 'Mar 10',
      impact: 4,
      effort: 'M' as TaskEffort,
      comments: [
        { id: 1, author: 'Acex Romero', text: 'Found 15 broken links so far', timestamp: 'Mar 12' }
      ],
      notes: 'Focus on high-traffic pages first'
    } as ActiveTask,
    {
      id: 2,
      task: 'Implement schema markup on product pages',
      status: 'In Progress' as TaskStatus,
      priority: 'High' as TaskPriority,
      assignedTo: 'Taylor Green',
      dateLogged: 'Mar 15',
      impact: 3,
      effort: 'M' as TaskEffort,
      comments: [],
      notes: 'Use Product schema type'
    } as ActiveTask,
    {
      id: 3,
      task: 'Optimize site speed (Core Web Vitals)',
      status: 'Not Started' as TaskStatus,
      priority: 'High' as TaskPriority,
      assignedTo: 'Schonn Force',
      dateLogged: 'Mar 20',
      impact: 5,
      effort: 'L' as TaskEffort,
      comments: [],
      notes: 'Focus on LCP and CLS issues'
    } as ActiveTask,
    {
      id: 4,
      task: 'Fix duplicate content issues',
      status: 'Not Started' as TaskStatus,
      priority: 'Medium' as TaskPriority,
      assignedTo: 'Amy White',
      dateLogged: 'Mar 22',
      impact: 3,
      effort: 'M' as TaskEffort,
      comments: [],
      notes: 'Check category pages'
    } as ActiveTask,
    {
      id: 5,
      task: 'Analytics Audit',
      status: 'Not Started' as TaskStatus,
      priority: 'Low' as TaskPriority,
      assignedTo: 'Amy White',
      dateLogged: 'Mar 15',
      impact: 2,
      effort: 'S' as TaskEffort,
      comments: [
        { id: 1, author: 'Amy White', text: 'Will start next week', timestamp: 'Mar 16' }
      ]
    } as ActiveTask,
    {
      id: 6,
      task: 'Fix mobile usability issues',
      status: 'Done' as TaskStatus,
      priority: 'High' as TaskPriority,
      assignedTo: 'Taylor Green',
      dateLogged: 'Mar 01',
      impact: 4,
      effort: 'M' as TaskEffort,
      comments: [
        { id: 1, author: 'Taylor Green', text: 'All issues fixed and verified', timestamp: 'Mar 28' }
      ],
      completedDate: 'Mar 28'
    } as CompletedTask,
    {
      id: 7,
      task: 'Implement canonical tags',
      status: 'Done' as TaskStatus,
      priority: 'Medium' as TaskPriority,
      assignedTo: 'Schonn Force',
      dateLogged: 'Feb 25',
      impact: 3,
      effort: 'S' as TaskEffort,
      comments: [],
      completedDate: 'Mar 05'
    } as CompletedTask,
  ],
  cro: [
    {
      id: 1,
      task: 'Increase CTA Visibility',
      status: 'In Progress' as TaskStatus,
      priority: 'Medium' as TaskPriority,
      assignedTo: 'Acex Romero',
      dateLogged: 'Mar 10',
      impact: 4,
      effort: 'S' as TaskEffort,
      comments: [
        { id: 1, author: 'Acex Romero', text: 'Testing 3 different button styles', timestamp: 'Mar 15' }
      ]
    } as ActiveTask,
    {
      id: 2,
      task: 'Improve Form UX',
      status: 'Done' as TaskStatus,
      priority: 'High' as TaskPriority,
      assignedTo: 'Taylor Green',
      dateLogged: 'Mar 01',
      impact: 3,
      effort: 'M' as TaskEffort,
      comments: [
        { id: 1, author: 'Taylor Green', text: 'Reduced form fields from 8 to 5', timestamp: 'Mar 20' },
        { id: 2, author: 'Acex Romero', text: 'Conversion rate improved by 12%', timestamp: 'Apr 01' },
        { id: 3, author: 'Taylor Green', text: 'Added inline validation', timestamp: 'Apr 02' },
        { id: 4, author: 'Schonn Force', text: 'Looks great!', timestamp: 'Apr 03' },
        { id: 5, author: 'Taylor Green', text: 'Marking as complete', timestamp: 'Apr 04' }
      ],
      completedDate: 'Apr 04'
    } as CompletedTask,
    {
      id: 3,
      task: 'Test Exit-intent Popup',
      status: 'Done' as TaskStatus,
      priority: 'Low' as TaskPriority,
      assignedTo: 'Schonn Force',
      dateLogged: 'Feb 15',
      impact: 4,
      effort: 'S' as TaskEffort,
      comments: [
        { id: 1, author: 'Schonn Force', text: 'A/B test complete - 8% improvement', timestamp: 'Feb 25' },
        { id: 2, author: 'Amy White', text: 'Great results!', timestamp: 'Feb 26' }
      ],
      completedDate: 'Feb 28'
    } as CompletedTask,
    {
      id: 4,
      task: 'Analytics Audit',
      status: 'Not Started' as TaskStatus,
      priority: 'Low' as TaskPriority,
      assignedTo: 'Amy White',
      dateLogged: 'Mar 15',
      impact: 2,
      effort: 'S' as TaskEffort,
      comments: [
        { id: 1, author: 'Amy White', text: 'Will start next week', timestamp: 'Mar 16' }
      ]
    } as ActiveTask
  ],
  strategyAdHoc: [
    {
      id: 1,
      task: 'Develop Q2 content calendar',
      status: 'In Progress' as TaskStatus,
      priority: 'High' as TaskPriority,
      assignedTo: 'Taylor Green',
      dateLogged: 'Mar 01',
      impact: 4,
      effort: 'M' as TaskEffort,
      comments: [
        { id: 1, author: 'Taylor Green', text: 'Draft ready for review', timestamp: 'Mar 15' }
      ]
    } as ActiveTask,
    {
      id: 2,
      task: 'Conduct keyword gap analysis',
      status: 'Done' as TaskStatus,
      priority: 'High' as TaskPriority,
      assignedTo: 'Acex Romero',
      dateLogged: 'Feb 20',
      impact: 5,
      effort: 'L' as TaskEffort,
      comments: [
        { id: 1, author: 'Acex Romero', text: 'Found 25 high-opportunity keywords', timestamp: 'Mar 10' }
      ],
      completedDate: 'Mar 15'
    } as CompletedTask,
    {
      id: 3,
      task: 'Develop link building strategy',
      status: 'Not Started' as TaskStatus,
      priority: 'Medium' as TaskPriority,
      assignedTo: 'Schonn Force',
      dateLogged: 'Mar 20',
      impact: 4,
      effort: 'M' as TaskEffort,
      comments: []
    } as ActiveTask
  ]
};

// Priority Badge Component
function PriorityBadge({ priority }: { priority: TaskPriority }) {
  let bgColor = '';
  let textColor = '';

  switch (priority) {
    case 'High':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'Medium':
      bgColor = 'bg-gold/10';
      textColor = 'text-gold';
      break;
    case 'Low':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    default:
      bgColor = 'bg-lightGray';
      textColor = 'text-mediumGray';
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {priority}
    </span>
  );
}

// Impact Badge Component
function ImpactBadge({ impact }: { impact: number }) {
  let bgColor = '';
  let textColor = '';

  switch (impact) {
    case 5:
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      break;
    case 4:
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 3:
      bgColor = 'bg-indigo-100';
      textColor = 'text-indigo-800';
      break;
    case 2:
      bgColor = 'bg-teal-100';
      textColor = 'text-teal-800';
      break;
    case 1:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
    default:
      bgColor = 'bg-lightGray';
      textColor = 'text-mediumGray';
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {impact}
    </span>
  );
}

// Effort Badge Component
function EffortBadge({ effort }: { effort: TaskEffort }) {
  let bgColor = '';
  let textColor = '';

  switch (effort) {
    case 'S':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'M':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'L':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      break;
    default:
      bgColor = 'bg-lightGray';
      textColor = 'text-mediumGray';
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {effort}
    </span>
  );
}

// Comment Component
function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="mb-2 last:mb-0">
      <div className="flex items-start">
        <div className="bg-lightGray rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
          <span className="text-xs font-medium">{comment.author.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-baseline">
            <span className="text-xs font-medium text-dark">{comment.author}</span>
            <span className="text-xs text-mediumGray ml-2">{comment.timestamp}</span>
          </div>
          <p className="text-sm text-dark mt-0.5">{comment.text}</p>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-2 border-l-2 border-lightGray pl-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

// Comments Section Component
function CommentsSection({ comments, taskId }: { comments: Comment[], taskId: number | string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskComments, setTaskComments] = useState<Comment[]>(comments);

  // Fetch comments when expanded
  useEffect(() => {
    if (isExpanded) {
      const fetchTaskComments = async () => {
        try {
          setLoading(true);
          const commentsData = await fetchComments(taskId.toString());

          // Map Airtable comments to our Comment type
          const mappedComments: Comment[] = commentsData.map((comment: any) => ({
            id: comment.id,
            author: comment.User?.[0] || 'Anonymous',
            text: comment.Comment || '',
            timestamp: comment.CreatedAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }));

          setTaskComments(mappedComments.length > 0 ? mappedComments : comments);
        } catch (err) {
          console.error('Error fetching comments:', err);
          // Fall back to existing comments
          setTaskComments(comments);
        } finally {
          setLoading(false);
        }
      };

      fetchTaskComments();
    }
  }, [isExpanded, taskId, comments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      // Add comment to Airtable
      const result = await addComment(
        taskId.toString(),
        'current-user', // User ID - using a placeholder since we don't have real auth
        newComment
      );

      // Update local state
      const newCommentObj: Comment = {
        id: result.id || Date.now(),
        author: 'You', // This would be the current user in a real app
        text: newComment,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };

      setTaskComments([...taskComments, newCommentObj]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);

      // Still update UI for better UX
      const newCommentObj: Comment = {
        id: Date.now(),
        author: 'You', // This would be the current user in a real app
        text: newComment,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };

      setTaskComments([...taskComments, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-xs font-medium text-primary hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {taskComments.length} {taskComments.length === 1 ? 'Comment' : 'Comments'}
      </button>

      {isExpanded && (
        <div className="mt-2">
          <div className="bg-lightGray/30 p-3 rounded-md mb-2">
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : taskComments.length > 0 ? (
              taskComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-sm text-mediumGray">No comments yet</p>
            )}
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border border-lightGray rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() || loading}
              className="bg-primary text-white px-3 py-2 rounded-r-md text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: TaskStatus }) {
  let bgColor = '';
  let textColor = '';

  switch (status) {
    case 'Not Started':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
    case 'In Progress':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'Blocked':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'Done':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    default:
      bgColor = 'bg-lightGray';
      textColor = 'text-mediumGray';
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
}

// Task Card Component
function TaskCard({
  task,
  onStatusChange
}: {
  task: Task;
  onStatusChange: (id: number | string, status: TaskStatus) => void;
}) {
  return (
    <div className="card bg-white p-4 rounded-scalerrs border border-lightGray shadow-sm" style={{ color: '#353233' }}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-md font-medium text-text-light dark:text-text-dark">{task.task}</h3>
        <div className="flex space-x-2">
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
        </div>
      </div>

      <div className="mb-3">
        <div className="text-sm text-mediumGray dark:text-gray-300">
          <span className="font-medium">Assigned to:</span> {task.assignedTo}
        </div>
        <div className="text-sm text-mediumGray dark:text-gray-300">
          <span className="font-medium">Logged:</span> {task.dateLogged}
        </div>
        {task.status === 'Done' && task.completedDate && (
          <div className="text-sm text-mediumGray dark:text-gray-300">
            <span className="font-medium">Completed:</span> {task.completedDate}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3 mb-3">
        <div>
          <span className="text-xs text-mediumGray dark:text-gray-300 block mb-1">Impact</span>
          <ImpactBadge impact={task.impact} />
        </div>
        <div>
          <span className="text-xs text-mediumGray dark:text-gray-300 block mb-1">Effort</span>
          <EffortBadge effort={task.effort} />
        </div>
      </div>

      {task.notes && (
        <div className="mb-3">
          <div className="text-xs text-mediumGray dark:text-gray-300 mb-1">Notes</div>
          <p className="text-sm text-text-light dark:text-text-dark bg-lightGray/30 dark:bg-darkGray/30 p-2 rounded">{task.notes}</p>
        </div>
      )}

      <CommentsSection comments={task.comments} taskId={task.id} />

      <div className="flex space-x-2 mt-3">
        {task.status === 'Not Started' && (
          <button
            onClick={() => onStatusChange(task.id, 'In Progress')}
            className="px-3 py-1 text-xs font-medium text-white bg-primary rounded-scalerrs hover:bg-primary/80 transition-colors"
          >
            Start
          </button>
        )}

        {task.status === 'In Progress' && (
          <>
            <button
              onClick={() => onStatusChange(task.id, 'Done')}
              className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-scalerrs hover:bg-green-700 hover:text-white transition-colors"
            >
              Complete
            </button>
            <button
              onClick={() => onStatusChange(task.id, 'Blocked')}
              className="px-3 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-scalerrs hover:bg-red-700 hover:text-white transition-colors"
            >
              Block
            </button>
          </>
        )}

        {task.status === 'Blocked' && (
          <button
            onClick={() => onStatusChange(task.id, 'In Progress')}
            className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-scalerrs hover:bg-blue-700 hover:text-white transition-colors"
          >
            Resume
          </button>
        )}

        {task.status === 'Done' && (
          <button
            onClick={() => onStatusChange(task.id, 'In Progress')}
            className="px-3 py-1 text-xs font-medium text-mediumGray bg-lightGray rounded-scalerrs hover:bg-gray-300 transition-colors"
          >
            Reopen
          </button>
        )}
      </div>
    </div>
  );
}

// Task Table Component
function TaskTable({
  tasks,
  onStatusChange
}: {
  tasks: Task[];
  onStatusChange: (id: number | string, status: TaskStatus) => void;
}) {
  const [expandedTaskId, setExpandedTaskId] = useState<number | string | null>(null);

  // Sort tasks: 1st by Status, 2nd by Priority, 3rd by Date Logged
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by status
    const statusOrder = {
      'In Progress': 1,
      'Not Started': 2,
      'Blocked': 3,
      'Done': 4
    };

    const statusComparison = statusOrder[a.status] - statusOrder[b.status];
    if (statusComparison !== 0) return statusComparison;

    // Then sort by priority
    const priorityOrder = {
      'High': 1,
      'Medium': 2,
      'Low': 3
    };

    const priorityComparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityComparison !== 0) return priorityComparison;

    // Finally sort by date logged (newest first)
    // This is a simplified comparison - in a real app, you'd parse the dates properly
    return b.dateLogged.localeCompare(a.dateLogged);
  });

  // Calculate completion stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;

  return (
    <div className="card bg-white rounded-scalerrs border border-lightGray overflow-hidden" style={{ color: '#353233' }}>
      {/* Summary header */}
      <div className="bg-lightGray p-3 border-b border-lightGray">
        <p className="text-sm font-medium text-text-light dark:text-text-dark">
          {completedTasks} of {totalTasks} tasks completed this month
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-lightGray/50 border-b border-lightGray">
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Task</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Assigned to</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Date Logged</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Impact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Effort</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Comments</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-mediumGray dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lightGray">
            {sortedTasks.map((task) => (
              <React.Fragment key={task.id}>
                <tr className="hover:bg-lightGray/20 cursor-pointer" onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}>
                  <td className="px-4 py-3 text-sm text-text-light dark:text-text-dark">{task.task}</td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-text-light dark:text-text-dark">{task.assignedTo}</td>
                  <td className="px-4 py-3 text-sm text-text-light dark:text-text-dark">{task.dateLogged}</td>
                  <td className="px-4 py-3 text-sm">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <ImpactBadge impact={task.impact} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <EffortBadge effort={task.effort} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-lightGray dark:bg-darkGray text-mediumGray dark:text-gray-300">
                      {task.comments.length}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      {task.status === 'Not Started' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusChange(task.id, 'In Progress');
                          }}
                          className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-scalerrs hover:bg-primary/80 transition-colors"
                        >
                          Start
                        </button>
                      )}

                      {task.status === 'In Progress' && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(task.id, 'Done');
                            }}
                            className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-scalerrs hover:bg-green-700 hover:text-white transition-colors"
                          >
                            Complete
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(task.id, 'Blocked');
                            }}
                            className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-scalerrs hover:bg-red-700 hover:text-white transition-colors"
                          >
                            Block
                          </button>
                        </>
                      )}

                      {task.status === 'Blocked' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusChange(task.id, 'In Progress');
                          }}
                          className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-scalerrs hover:bg-blue-700 hover:text-white transition-colors"
                        >
                          Resume
                        </button>
                      )}

                      {task.status === 'Done' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStatusChange(task.id, 'In Progress');
                          }}
                          className="px-2 py-1 text-xs font-medium text-mediumGray bg-lightGray rounded-scalerrs hover:bg-gray-300 transition-colors"
                        >
                          Reopen
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedTaskId === task.id && (
                  <tr>
                    <td colSpan={9} className="px-4 py-3 bg-lightGray/10">
                      <div className="grid grid-cols-2 gap-4">
                        {task.notes && (
                          <div>
                            <h4 className="text-sm font-medium text-dark mb-1">Notes</h4>
                            <p className="text-sm text-dark bg-white p-2 rounded border border-lightGray">{task.notes}</p>
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-medium text-dark mb-1">Comments</h4>
                          <div className="bg-white p-2 rounded border border-lightGray">
                            {task.comments.length > 0 ? (
                              task.comments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} />
                              ))
                            ) : (
                              <p className="text-sm text-mediumGray">No comments yet</p>
                            )}

                            <div className="mt-2 pt-2 border-t border-lightGray">
                              <div className="flex">
                                <input
                                  type="text"
                                  placeholder="Add a comment..."
                                  className="flex-1 border border-lightGray rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button
                                  className="bg-primary text-white px-3 py-2 rounded-r-md text-sm font-medium"
                                >
                                  Post
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {sortedTasks.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-mediumGray">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add Task Modal Component
function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
  boardType
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
  boardType: string;
}) {
  // Define a type for the form data
  type TaskFormData = {
    task: string;
    priority: TaskPriority;
    assignedTo: string;
    impact: number;
    effort: TaskEffort;
    notes: string;
    referenceLinks: string; // String for the form, will be converted to string[] when submitting
  };

  const [taskData, setTaskData] = useState<TaskFormData>({
    task: '',
    priority: 'Medium',
    assignedTo: '',
    impact: 3,
    effort: 'M',
    notes: '',
    referenceLinks: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskData.task.trim() && taskData.assignedTo.trim()) {
      // Format reference links if provided
      const referenceLinks = taskData.referenceLinks.trim()
        ? taskData.referenceLinks.split('\n').filter(link => link.trim() !== '')
        : undefined;

      // Create a task object with the correct type
      const newTask: Task = {
        task: taskData.task,
        priority: taskData.priority,
        assignedTo: taskData.assignedTo,
        impact: taskData.impact,
        effort: taskData.effort,
        notes: taskData.notes,
        id: Date.now(),
        status: 'Not Started',
        dateLogged: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        comments: [],
        referenceLinks: referenceLinks
      };

      onAdd(newTask);

      // Reset form
      setTaskData({
        task: '',
        priority: 'Medium',
        assignedTo: '',
        impact: 3,
        effort: 'M',
        notes: '',
        referenceLinks: ''
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-scalerrs shadow-lg max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-dark">Add New Task to {boardType} Board</h3>
          <button
            onClick={onClose}
            className="text-mediumGray hover:text-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mediumGray mb-1">Task Name</label>
              <input
                type="text"
                className="w-full border border-lightGray rounded-scalerrs p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter task description"
                value={taskData.task}
                onChange={(e) => setTaskData({ ...taskData, task: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-mediumGray mb-1">Assigned To</label>
              <input
                type="text"
                className="w-full border border-lightGray rounded-scalerrs p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter assignee name"
                value={taskData.assignedTo}
                onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-mediumGray mb-1">Priority</label>
              <select
                className="w-full border border-lightGray rounded-scalerrs p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={taskData.priority}
                onChange={(e) => setTaskData({ ...taskData, priority: e.target.value as TaskPriority })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mediumGray mb-1">Impact (1-5)</label>
              <select
                className="w-full border border-lightGray rounded-scalerrs p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={taskData.impact}
                onChange={(e) => setTaskData({ ...taskData, impact: parseInt(e.target.value) })}
              >
                <option value="1">1 (Minimal)</option>
                <option value="2">2 (Low)</option>
                <option value="3">3 (Medium)</option>
                <option value="4">4 (High)</option>
                <option value="5">5 (Critical)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mediumGray mb-1">Effort</label>
              <select
                className="w-full border border-lightGray rounded-scalerrs p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={taskData.effort}
                onChange={(e) => setTaskData({ ...taskData, effort: e.target.value as TaskEffort })}
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mediumGray mb-1">Notes</label>
              <textarea
                className="w-full border border-lightGray rounded-scalerrs p-2 focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
                placeholder="Add any additional notes or context"
                value={taskData.notes}
                onChange={(e) => setTaskData({ ...taskData, notes: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mediumGray mb-1">Reference Links</label>
              <textarea
                className="w-full border border-lightGray rounded-scalerrs p-2 focus:outline-none focus:ring-2 focus:ring-primary min-h-[60px]"
                placeholder="Add reference links (one per line)"
                value={taskData.referenceLinks}
                onChange={(e) => setTaskData({ ...taskData, referenceLinks: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-mediumGray bg-lightGray rounded-scalerrs hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-scalerrs hover:bg-primary/80 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TaskBoards() {
  const [boards, setBoards] = useState<Record<string, Task[]>>({
    technicalSEO: [],
    cro: [],
    strategyAdHoc: [],
    projections: []
  });
  const [activeBoard, setActiveBoard] = useState('technicalSEO');
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from Airtable
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching tasks from Airtable...');
        // Fetch tasks from Airtable
        const tasksData = await fetchTasks();
        console.log(`Fetched ${tasksData.length} tasks from Airtable`);

        // Organize tasks by board
        const organizedTasks: Record<string, Task[]> = {
          technicalSEO: [],
          cro: [],
          strategyAdHoc: [],
          projections: []
        };

        // Map Airtable tasks to our Task type
        tasksData.forEach((task: AirtableTask) => {
          console.log('Processing task:', task.id, task.Title || task.Name);

          // Use our mapping function to convert Airtable task to our Task type
          const mappedTask = mapAirtableTaskToTask(task);

          // Determine which board this task belongs to
          const category = task.Category || task.Type || '';

          if (category.includes('Technical') || category.includes('SEO')) {
            organizedTasks.technicalSEO.push(mappedTask);
          } else if (category.includes('CRO') || category.includes('Conversion')) {
            organizedTasks.cro.push(mappedTask);
          } else if (category.includes('Strategy') || category.includes('Ad Hoc')) {
            organizedTasks.strategyAdHoc.push(mappedTask);
          } else {
            // Default to Technical SEO if no category is specified
            organizedTasks.technicalSEO.push(mappedTask);
          }
        });

        console.log('Organized tasks:', {
          technicalSEO: organizedTasks.technicalSEO.length,
          cro: organizedTasks.cro.length,
          strategyAdHoc: organizedTasks.strategyAdHoc.length
        });

        // If we have no tasks, fall back to sample data
        if (
          organizedTasks.technicalSEO.length === 0 &&
          organizedTasks.cro.length === 0 &&
          organizedTasks.strategyAdHoc.length === 0
        ) {
          console.log('No tasks found in Airtable, using sample data');
          setBoards(taskBoards);
        } else {
          setBoards(organizedTasks);
        }
      } catch (err: any) {
        console.error('Error fetching tasks:', err);
        setError(`An error occurred while fetching tasks: ${err.message}`);

        // Fall back to sample data
        console.log('Error occurred, falling back to sample data');
        setBoards(taskBoards);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksData();
  }, []);

  // Check if Strategy/Ad Hoc tab should be visible
  const showStrategyTab = boards.strategyAdHoc && boards.strategyAdHoc.length > 0;

  const handleStatusChange = async (id: number | string, newStatus: TaskStatus) => {
    try {
      console.log(`Updating task ${id} status to ${newStatus}`);
      // Update task status in Airtable
      await updateTaskStatus(id.toString(), newStatus);
      console.log(`Task ${id} status updated successfully`);

      // Update local state
      setBoards(prev => {
        const newBoards = { ...prev };
        const taskIndex = newBoards[activeBoard as keyof typeof boards].findIndex(task =>
          task.id === id || task.id.toString() === id.toString()
        );

        if (taskIndex !== -1) {
          const currentTask = newBoards[activeBoard as keyof typeof boards][taskIndex];

          if (newStatus === 'Done') {
            // When moving to Done, add completedDate
            const updatedTask = {
              ...currentTask,
              status: newStatus,
              completedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            } as CompletedTask;
            newBoards[activeBoard as keyof typeof boards][taskIndex] = updatedTask;
          } else {
            // When moving to other statuses
            const updatedTask = {
              ...currentTask,
              status: newStatus,
              completedDate: undefined
            } as ActiveTask;
            newBoards[activeBoard as keyof typeof boards][taskIndex] = updatedTask;
          }
        } else {
          console.warn(`Task with ID ${id} not found in ${activeBoard} board`);
        }

        return newBoards;
      });
    } catch (err) {
      console.error('Error updating task status:', err);

      // Update local state anyway for better UX
      setBoards(prev => {
        const newBoards = { ...prev };
        const taskIndex = newBoards[activeBoard as keyof typeof boards].findIndex(task =>
          task.id === id || task.id.toString() === id.toString()
        );

        if (taskIndex !== -1) {
          const currentTask = newBoards[activeBoard as keyof typeof boards][taskIndex];

          if (newStatus === 'Done') {
            // When moving to Done, add completedDate
            const updatedTask = {
              ...currentTask,
              status: newStatus,
              completedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            } as CompletedTask;
            newBoards[activeBoard as keyof typeof boards][taskIndex] = updatedTask;
          } else {
            // When moving to other statuses
            const updatedTask = {
              ...currentTask,
              status: newStatus,
              completedDate: undefined
            } as ActiveTask;
            newBoards[activeBoard as keyof typeof boards][taskIndex] = updatedTask;
          }
        } else {
          console.warn(`Task with ID ${id} not found in ${activeBoard} board`);
        }

        return newBoards;
      });
    }
  };

  const handleAddTask = async (task: Task) => {
    try {
      // In a real implementation, you would add the task to Airtable here
      // For now, we'll just update the local state
      setBoards(prev => {
        const newBoards = { ...prev };
        newBoards[activeBoard as keyof typeof boards] = [
          ...newBoards[activeBoard as keyof typeof boards],
          task
        ];
        return newBoards;
      });

      setAddTaskModal(false);
    } catch (err) {
      console.error('Error adding task:', err);
      // Still update the UI for better UX
      setBoards(prev => {
        const newBoards = { ...prev };
        newBoards[activeBoard as keyof typeof boards] = [
          ...newBoards[activeBoard as keyof typeof boards],
          task
        ];
        return newBoards;
      });

      setAddTaskModal(false);
    }
  };

  // Get the current board's tasks
  const currentTasks = boards[activeBoard as keyof typeof boards];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">Tasks</h1>
          <p className="text-mediumGray">Collaborate on action items with clear priorities and ownership</p>
        </div>

        {activeBoard !== 'projections' && (
          <button
            onClick={() => setAddTaskModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-scalerrs hover:bg-primary/80 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        )}
      </div>

      <PageContainer>
        <PageContainerTabs>
          <TabNavigation
            tabs={[
              { id: 'cro', label: 'CRO' },
              { id: 'technicalSEO', label: 'Technical SEO' },
              { id: 'strategyAdHoc', label: 'Strategy / Ad Hoc', disabled: !showStrategyTab },
              { id: 'projections', label: 'Monthly Projections' }
            ]}
            activeTab={activeBoard}
            onTabChange={setActiveBoard}
            variant="primary"
          />
        </PageContainerTabs>
        <PageContainerBody>
          {activeBoard === 'projections' ? (
            <MonthlyProjectionsBoard />
          ) : loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <TaskTable
              tasks={currentTasks}
              onStatusChange={handleStatusChange}
            />
          )}
        </PageContainerBody>
      </PageContainer>

      <div className="bg-lightGray p-4 rounded-scalerrs mt-8">
        <p className="text-sm text-mediumGray">
          <strong>Note:</strong> Tasks are synchronized with our project management system. Changes made here will be reflected in the main system within 5 minutes.
        </p>
      </div>

      <AddTaskModal
        isOpen={addTaskModal}
        onClose={() => setAddTaskModal(false)}
        onAdd={handleAddTask}
        boardType={activeBoard === 'technicalSEO' ? 'Technical SEO' : activeBoard === 'cro' ? 'CRO' : 'Strategy / Ad Hoc'}
      />
    </DashboardLayout>
  );
}
