import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tasks-app-data';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title, description = '', priority = 'medium', category = 'work') => {
        const newTask = {
            id: crypto.randomUUID(),
            title: title.trim(),
            description: description.trim(),
            completed: false,
            priority,
            category,
            starred: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setTasks(prev => [newTask, ...prev]);
        return newTask;
    };

    const updateTask = (id, updates) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                    : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const toggleComplete = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            updateTask(id, { completed: !task.completed });
        }
    };

    const toggleStar = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            updateTask(id, { starred: !task.starred });
        }
    };

    const clearCompleted = () => {
        setTasks(prev => prev.filter(task => !task.completed));
    };

    const reorderTasks = (startIndex, endIndex) => {
        setTasks(prev => {
            const result = Array.from(prev);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        });
    };

    // Filter and search tasks
    const filteredTasks = tasks.filter(task => {
        let statusMatch = true;
        switch (filter) {
            case 'active':
                statusMatch = !task.completed;
                break;
            case 'completed':
                statusMatch = task.completed;
                break;
            case 'starred':
                statusMatch = task.starred;
                break;
            default:
                statusMatch = true;
        }

        const searchMatch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

        return statusMatch && searchMatch;
    });

    // Sort tasks: starred first, then by created date (newest first)
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (a.starred && !b.starred) return -1;
        if (!a.starred && b.starred) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Task counts
    const taskCounts = {
        total: tasks.length,
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
        starred: tasks.filter(t => t.starred).length,
    };

    return {
        tasks: sortedTasks,
        allTasks: tasks,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        taskCounts,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        toggleStar,
        clearCompleted,
        reorderTasks,
    };
};
