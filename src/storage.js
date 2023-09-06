import { ka } from "date-fns/locale";

const todoStorageController = (() => {
    const updateItem = (project) => {
        const projectTasks = project.getTasks();
        const JSONTasks = {};

        for(const taskName in projectTasks) {
            const newTask = {}
            newTask["title"] = projectTasks[taskName].getTitle();
            newTask["desc"] = projectTasks[taskName].getDesc();
            newTask["notes"] = projectTasks[taskName].getNotes();
            newTask["dueDate"] = projectTasks[taskName].getDueDate();
            newTask["done"] = projectTasks[taskName].getDone();
            newTask["priority"] = projectTasks[taskName].getPriority();

            JSONTasks[taskName] = newTask;
        }

        const storageProject = {
            name: project.getName(),
            desc: project.getDesc(),
            notes: project.getNotes(),
            dueDate: project.getDueDate(),
            tasks: JSONTasks
        }
        localStorage.setItem(project.getName(), JSON.stringify(storageProject));
    }

    const removeItem = (projectName) => {
        localStorage.removeItem(projectName);
    }

    const clearStorage = () => {
        localStorage.clear();
    }

    return { updateItem, removeItem, clearStorage };
})();

export default todoStorageController;