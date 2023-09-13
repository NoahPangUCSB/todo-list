import task from './task';
import storageController from './storage';

const project = () => {
    let name = null;
    let desc = null;
    let notes = null;
    let dueDate = null;
    const tasks = {};

    const getName = () => name;

    const getDesc = () => desc;

    const getNotes = () => notes;

    const getDueDate = () => dueDate;

    const getTasks = () => tasks;

    const setName = (newName) => {
        name = newName

        for(const task in tasks) {
            tasks[task].setProject(newName);
        }
    }

    const setDesc = (newDesc) => {
        desc = newDesc;
    }

    const setDueDate = (year, month, day) => {
        if(year instanceof Number && month instanceof Number && day instanceof Number) {
            dueDate = new Date(year, month, day);
        }
    }

    const setNotes = (newNotes) => {
        notes = newNotes;
    }

    const createTask = (title, desc=null, dueDate=null, notes=null, priority=0) => {
        if(title && !(title in tasks)) {
            const newTask = task();
            newTask.setTitle(title);
            newTask.setDesc(desc);
            newTask.setDueDate(dueDate);
            newTask.setNotes(notes);
            newTask.setPriority(priority);
            newTask.setProject(name);

            tasks[title] = newTask;

            return true;
        } else {
            return false;
        }
        
    }

    const removeTask = (taskTitle) => {
        delete tasks[taskTitle];
    }

    return { getName, getDesc, getNotes, getDueDate, getTasks, setName, setDesc, setDueDate, setNotes, createTask, removeTask };
}

const projectController = (() => {
    
    const projects = {};

    const getProjects = () => projects;

    const createProject = (name, desc=null, notes=null, dueDate=null, tasks=null) => {
        if(!(name in projects)) {
            const newProject = project();

            newProject.setName(name);
            newProject.setDesc(desc);
            newProject.setNotes(notes);
            newProject.setDueDate(dueDate);

            projects[name] = newProject;

            for(const taskTitle in tasks) {
                addTask(name, taskTitle, tasks[taskTitle].desc, tasks[taskTitle].dueDate, tasks[taskTitle].notes, tasks[taskTitle].priority);
            }

            storageController.updateItem(newProject);
            
            return true;
        } 
        
        return false;
    }

    const addTask = (projectName, title, desc=null, dueDate=null, notes=null, priority=0) => {
        const project = projects[projectName];
        project.createTask(title, desc, notes, dueDate, priority);

        storageController.updateItem(project);
    }

    const removeTask = (projectName, taskTitle) => {
        const project = projects[projectName];
        const task = project.getTasks()[taskTitle];
        project.removeTask(task.getTitle());

        storageController.updateItem(project);
    }

    const deleteProject = (projectName) => {
        delete projects[projectName];

        storageController.removeItem(projectName);
    }

    const loadProjects = () => {
        const storedProjects = {...localStorage};

        for(const projectName in storedProjects) {
            const projectObject = JSON.parse(storedProjects[projectName]);
            const projectTasks = projectObject["tasks"]
            const project = createProject(projectName, projectObject["desc"], projectObject["notes"], projectObject["dueDate"]);
            for(const task in projectTasks) {
                addTask(projectName, task["title"], task["desc"], task["dueDate"], task["notes"], task["priority"]);
            }
        }

    }

    return { getProjects, createProject, addTask, removeTask, deleteProject, loadProjects };

})();

export default projectController;