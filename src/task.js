const task = () => {
    let title = null;
    let desc = null;
    let dueDate = null;
    let notes = null;
    let priority = null;
    let done = false;
    let project = null;

    const getTitle = () => title;

    const getDesc = () => desc;

    const getDueDate = () => dueDate;

    const getNotes = () => notes;
    
    const getPriority = () => priority;

    const getDone = () => done;

    const getProject = () => project;

    const setTitle = (newTitle) => {
        title = newTitle;
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

    const setPriority = (newPriority) => {
        priority = newPriority;
    }

    const setProject = (projectName) => {
        project = projectName;
    }

    const toggleDone = () => {
        done = !done;
    }

    return { getTitle, getDesc, getNotes, getDueDate, getPriority, getDone, getProject, setTitle, setDesc, setDueDate, setNotes, setPriority, setProject, toggleDone };
}

export default task;