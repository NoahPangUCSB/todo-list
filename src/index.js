import headerDisplay from './header';
import projectController from './project';
import createSVG from './svg';
import './css/style.css';

const displayController = (() => {

    let selectedProject = null;

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
                name: "sda",
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

    const displayProjectCard = (project, projectsWrapper) => {
        const checkDVal = "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z";

        const projectWrapper = document.createElement("div");
        projectWrapper.classList.add("project-card");

        createSVG(projectWrapper, checkDVal);

        const projectName = document.createElement("span");
        projectName.classList.add("project-name");
        projectName.textContent = project.getName();

        projectWrapper.addEventListener("click", selectProject);

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

        projectView.appendChild(projectNameDisplay);
    }

    return { displayProjectsSidebar };
})();

const appController = (() => {
    const loadProjects = (() => {
        projectController.loadProjects();
        const projects = projectController.getProjects();
        displayController.displayProjectsSidebar(projects);
    })();
})();
