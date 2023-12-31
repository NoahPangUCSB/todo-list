import headerDisplay from './header';
import projectController from './project';
import createSVG from './svg';

import './css/style.css';

const displayController = (() => {

    let selectedProject = null;
    const circleDVal = "M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z";
    const circleCheckDVal = "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z";

    const displayHeader = (() => {
        document.body.appendChild(headerDisplay());
    })();

    const displayContent = (() => {
        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("content");

        const projectSidebar = document.createElement("div");
        projectSidebar.classList.add("project-sidebar");

        const projectView = document.createElement("div");
        projectView.classList.add("project-view");

        contentWrapper.appendChild(projectSidebar);
        contentWrapper.appendChild(projectView);

        document.body.appendChild(contentWrapper);
    })();

    const displayProjectsSidebar = (projects) => {
        const sidebarWrapper = document.querySelector(".project-sidebar");
        sidebarWrapper.replaceChildren(); // clear previous children if any.

        const projectsHeader = document.createElement("div");
        projectsHeader.classList.add("projects-header");
        projectsHeader.textContent = "Projects";

        const projectsWrapper = document.createElement("div");
        projectsWrapper.classList.add("projects-wrapper");

        const addProjectBtnWrapper = document.createElement("div");
        addProjectBtnWrapper.classList.add("add-project-btn-wrapper");

        const addProjectButton = document.createElement("button");
        addProjectButton.classList.add("add-project-btn");
        addProjectBtnWrapper.appendChild(addProjectButton);
        addProjectBtnWrapper.addEventListener("click", addProject);

        for(const projectName in projects) {
            displayProjectCard(projects[projectName], projectsWrapper);
        }

        sidebarWrapper.appendChild(projectsHeader);
        sidebarWrapper.appendChild(projectsWrapper);
        sidebarWrapper.appendChild(addProjectBtnWrapper);
    };

    const selectProject = (e) => {
        if(selectedProject) {
            selectedProject.classList.remove("selected-project");
        }

        let thisProject = e.srcElement;
        while(!thisProject.classList.contains("project-card")) {
            thisProject = thisProject.parentElement;
        }
        thisProject.classList.add("selected-project");

        selectedProject = thisProject;

        const selectedProjectName = thisProject.querySelector(".project-name").textContent;
        displayProject(selectedProjectName);
    }

    const removeProject = (e) => {
        let thisProject = e.srcElement;
        while(!thisProject.classList.contains("project-card")) {
            thisProject = thisProject.parentElement;
        }
        const projectName = thisProject.textContent;
        projectController.deleteProject(projectName);
        thisProject.parentElement.removeChild(thisProject);
    }
    
    const removeTask = (e) => {
        let thisTask = e.srcElement;
        while(!thisTask.classList.contains("task-card")) {
            thisTask = thisTask.parentElement;
        }

        const projectName = document.querySelector(".project-name-display").textContent;
    
        const taskName = thisTask.textContent;
        projectController.removeTask(projectName, taskName);
        thisTask.parentElement.removeChild(thisTask);
    }

    const hoverProject = (e) => {

        let thisProject = e.srcElement;
        while(!thisProject.classList.contains("project-card")) {
            thisProject = thisProject.parentElement;
        }

        thisProject.classList.add("hovered-project");

        if(!document.querySelector(".delete-project-btn")){
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-project-btn");
            deleteBtn.addEventListener("click", removeProject)
            thisProject.appendChild(deleteBtn);
        }

    }

    const hoverTask = (e) => {
        let thisTask = e.srcElement;
        while(!thisTask.classList.contains("task-card")) {
            thisTask = thisTask.parentElement;
        }

        thisTask.classList.add("hovered-task");
        if(!document.querySelector(".delete-task-btn")){
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-task-btn");
            deleteBtn.addEventListener("click", removeTask);
            thisTask.appendChild(deleteBtn);
        }
    }

    const unhoverProject = (e) => {
        let thisProject = e.srcElement;
        while(!thisProject.classList.contains("project-card")) {
            thisProject = thisProject.parentElement;
        }

        thisProject.classList.remove("hovered-project");
        const deleteBtn = document.querySelector(".delete-project-btn");
        thisProject.removeChild(deleteBtn);
    }

    const unhoverTask = (e) => {
        let thisTask = e.srcElement;
        while(!thisTask.classList.contains("task-card")) {
            thisTask = thisTask.parentElement;
        }

        thisTask.classList.remove("hovered-task");
        const deleteBtn = document.querySelector(".delete-task-btn");
        thisTask.removeChild(deleteBtn);
    }

    const displayProjectCard = (project, projectsWrapper) => {
        const checkDVal = "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z";

        const projectWrapper = document.createElement("div");
        projectWrapper.classList.add("project-card");

        createSVG(projectWrapper, checkDVal);

        const projectName = document.createElement("span");
        projectName.classList.add("project-name");
        projectName.textContent = project.getName();

        projectWrapper.addEventListener("click", selectProject);
        projectWrapper.addEventListener("mouseover", hoverProject);
        projectWrapper.addEventListener("mouseleave", unhoverProject);

        projectWrapper.appendChild(projectName);

        projectsWrapper.appendChild(projectWrapper);
    }

    const displayProject = (projectName) => {
        const projectView = document.querySelector(".project-view");
        projectView.replaceChildren(); // clear previous project

        const project = projectController.getProjects()[projectName];

        const projectNameDisplay = document.createElement("div");
        projectNameDisplay.classList.add("project-name-display");
        projectNameDisplay.textContent = projectName;

        const taskWrapper = document.createElement("div");
        taskWrapper.classList.add("task-wrapper");

        const projectTasks = project.getTasks();
        for(const taskTitle in projectTasks) {
            displayTask(taskWrapper, projectTasks[taskTitle]);
        }

        const addTaskBtnWrapper = document.createElement("div");
        addTaskBtnWrapper.classList.add("add-task-btn-wrapper");
        addTaskBtnWrapper.addEventListener("click", addTask);
        const addTaskBtn = document.createElement("button");
        addTaskBtn.classList.add("add-task-btn");
        addTaskBtnWrapper.appendChild(addTaskBtn);

        projectView.appendChild(projectNameDisplay);
        projectView.appendChild(taskWrapper);
        projectView.appendChild(addTaskBtnWrapper);
    }

    const checkTask = (e) => {
        let checkButton = e.srcElement;
        while(!checkButton.classList.contains("check-btn")) {
            checkButton = checkButton.parentElement;
        }
        checkButton.replaceChildren();

        if(checkButton.classList.contains("unchecked")){
            createSVG(checkButton, circleCheckDVal);
            checkButton.classList.remove("unchecked");
            checkButton.classList.add("checked");
        } else {
            createSVG(checkButton, circleDVal);
            checkButton.classList.remove("checked");
            checkButton.classList.add("unchecked");
        }
    }

    const displayTask = (taskWrapper, task) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        taskCard.addEventListener("mouseover", hoverTask);
        taskCard.addEventListener("mouseleave", unhoverTask);

        const checkBtn = document.createElement("div");
        checkBtn.classList.add("check-btn");
        checkBtn.classList.add("unchecked");
        createSVG(checkBtn, circleDVal);
        checkBtn.addEventListener("click", checkTask);
        
        const taskTitle = document.createElement("span");
        taskTitle.classList.add("task-card-title");
        taskTitle.textContent = task.getTitle();

        taskCard.appendChild(checkBtn);
        taskCard.appendChild(taskTitle);

        taskWrapper.appendChild(taskCard);
    }

    const addTask = (e) => {
        let addTaskButton = e.srcElement;
        while(!addTaskButton.classList.contains("add-task-btn-wrapper")) {
            addTaskButton = addTaskButton.parentElement;
        }
        let projectView = e.srcElement;
        while(!projectView.classList.contains("project-view")) {
            projectView = projectView.parentElement;
        }

        projectView.removeChild(addTaskButton);

        const addTaskForm = taskProjectForm("task");

        projectView.appendChild(addTaskForm);
    }

    const addProject = (e) => {
        let addProjectButton = e.srcElement;
        while(!addProjectButton.classList.contains("add-project-btn-wrapper")) {
            addProjectButton = addProjectButton.parentElement;
        }
        let sidebar = e.srcElement;
        while(!sidebar.classList.contains("project-sidebar")) {
            sidebar = sidebar.parentElement;
        }

        sidebar.removeChild(addProjectButton);

        const addProjectForm = taskProjectForm("project");

        sidebar.appendChild(addProjectForm);
    }

    const taskProjectForm = (type) => {
        const addForm = document.createElement("form");
        addForm.classList.add(`add-${type}-form`);

        const addNameInput = document.createElement("input");
        addNameInput.id = `add-${type}-name-input`;
        addNameInput.setAttribute("placeholder", `My ${type}`);
        addNameInput.addEventListener("keypress", type === "project" ? appController.submitProject : appController.submitTask);


        const cancelAddBtn = document.createElement("button");
        cancelAddBtn.classList.add(`cancel-add-${type}`);
        cancelAddBtn.textContent = "Cancel";
        cancelAddBtn.addEventListener("click", type === "project" ? hideProjectForm : hideTaskForm);

        const addSubmitBtn = document.createElement("button");
        addSubmitBtn.classList.add(`submit-${type}`);
        addSubmitBtn.textContent = "Submit";
        addSubmitBtn.addEventListener("click", type === "project" ? appController.submitProject : appController.submitTask);

        addForm.appendChild(addNameInput);
        addForm.appendChild(cancelAddBtn);
        addForm.appendChild(addSubmitBtn);

        return addForm;
    }

    const hideProjectForm = () => {
        const addProjectForm = document.querySelector(".add-project-form");
        const sidebar = document.querySelector(".project-sidebar");
        sidebar.removeChild(addProjectForm);

        const addProjectBtnWrapper = document.createElement("div");
        addProjectBtnWrapper.classList.add("add-project-btn-wrapper");

        const addProjectButton = document.createElement("button");
        addProjectButton.classList.add("add-project-btn");
        addProjectBtnWrapper.appendChild(addProjectButton);
        addProjectBtnWrapper.addEventListener("click", addProject);

        sidebar.appendChild(addProjectBtnWrapper);
    }

    const hideTaskForm = () => {
        const addTaskForm = document.querySelector(".add-task-form");
        const projectView = document.querySelector(".project-view");
        projectView.removeChild(addTaskForm);

        const addTaskBtnWrapper = document.createElement("div");
        addTaskBtnWrapper.classList.add("add-task-btn-wrapper");

        const addTaskButton = document.createElement("button");
        addTaskButton.classList.add("add-task-btn");
        addTaskBtnWrapper.appendChild(addTaskButton);
        addTaskBtnWrapper.addEventListener("click", addTask);

        projectView.appendChild(addTaskBtnWrapper);
    }

    return { displayProjectsSidebar, displayProjectCard, hideProjectForm, displayTask, hideTaskForm };
})();

const appController = (() => {
    const loadProjects = (() => {
        projectController.loadProjects();
        const projects = projectController.getProjects();
        displayController.displayProjectsSidebar(projects);
    })();

    const submitProject = (e) => {
        if(e.type === "click" || e.key === "Enter") {
            e.preventDefault();
            const formInput = document.querySelector("#add-project-name-input");
            const projectName = formInput.value;
            const createProjectSuccess = projectController.createProject(projectName);

            const projects = projectController.getProjects();
            
            if(createProjectSuccess) {
                displayController.displayProjectCard(projects[projectName], document.querySelector(".projects-wrapper"));
                displayController.hideProjectForm();
            }
        
            return createProjectSuccess ? projectName : null;
        }
    }

    const submitTask = (e) => {
        if(e.type === "click" || e.key === "Enter") {
            e.preventDefault();
            const formInput = document.querySelector("#add-task-name-input");
            const taskName = formInput.value;
            const projectName = document.querySelector(".project-name-display").textContent;
            const createTaskSuccess = projectController.addTask(projectName, taskName);
            
            const taskWrapper = document.querySelector(".task-wrapper");
            const projects = projectController.getProjects();
            const task = projects[projectName].getTasks()[taskName];
            
            if(createTaskSuccess) {
                displayController.displayTask(taskWrapper, task);
                displayController.hideTaskForm();
            }
        
            return createTaskSuccess ? taskName : null;
        }
    }

    return {submitProject, submitTask};
})();
