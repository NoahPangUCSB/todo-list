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

        projectController.createProject("hsdasdfdfjkdsjfsdjfsdidfjsdfjisdfijsfdsdfdsfsdsjklssfkjdsllksfjsfdjklsfkdjlfjsdklijsodfsdfij", "asdshfufas", null, null, {
            "sda": {
                title: "sda",
                desc: "saf",
                notes: "Saddas",
                dueDate: "dsadas",
                priority: 0
            },
            "sdfdfdf'l's;'ld;';'ldl';gl;'fl;'f;glfdgfdjgsdjkgsdfjgdsklgjdgkdlskldgsklsdgklsdgjklgdskljs": {
                title: "sdfdfdf'l's;'ld;';'ldl';gl;'fl;'f;glfdgfdjgsdjkgsdfjgdsklgjdgkdlskldgsklsdgklsdgjklgdskljs",
                desc: "saf",
                notes: "Saddas",
                dueDate: "dsadas",
                priority: 0
            }
        });
        projectController.createProject("hsj", "asdss", null, null, {
            "sda": {
                title: "sda",
                desc: "saf",
                notes: "Saddas",
                dueDate: "dsadas",
                priority: 0
            },
            "sdfddgklsdgjklgdskljs": {
                title: "sdfddgklsdgjklgdskljs",
                desc: "saf",
                notes: "Saddas",
                dueDate: "dsadas",
                priority: 0
            }
        });

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

    const unhoverProject = (e) => {
        let thisProject = e.srcElement;
        while(!thisProject.classList.contains("project-card")) {
            thisProject = thisProject.parentElement;
        }

        thisProject.classList.remove("hovered-project");
        const deleteBtn = document.querySelector(".delete-project-btn");
        thisProject.removeChild(deleteBtn);
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

        const addProjectForm = document.createElement("form");
        addProjectForm.classList.add("add-project-form");

        const addProjectNameInput = document.createElement("input");
        addProjectNameInput.id = "add-project-name-input";
        addProjectNameInput.setAttribute("placeholder", "My Project");
        addProjectNameInput.addEventListener("keypress", appController.submitProject);


        const cancelAddProjectBtn = document.createElement("button");
        cancelAddProjectBtn.classList.add("cancel-add-project");
        cancelAddProjectBtn.textContent = "Cancel";
        cancelAddProjectBtn.addEventListener("click", hideProjectForm);

        const addProjectSubmitBtn = document.createElement("button");
        addProjectSubmitBtn.classList.add("submit-project");
        addProjectSubmitBtn.textContent = "Submit";
        addProjectSubmitBtn.addEventListener("click", appController.submitProject);

        addProjectForm.appendChild(addProjectNameInput);
        addProjectForm.appendChild(cancelAddProjectBtn);
        addProjectForm.appendChild(addProjectSubmitBtn);

        sidebar.appendChild(addProjectForm);
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

    return { displayProjectsSidebar, displayProjectCard, hideProjectForm };
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

    return {submitProject};
})();
