import headerDisplay from './header';
import projectController from './project';
import './css/style.css';

const displayController = (() => {

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

        // projectController.createProject("hsda", "asdshfufas", null, null, {
        //     "sda": {
        //         name: "sda",
        //         desc: "saf",
        //         notes: "Saddas",
        //         dueDate: "dsadas",
        //         priority: 0
        //     }
        // });

        contentWrapper.appendChild(projectSidebar);
        contentWrapper.appendChild(projectView);

        document.body.appendChild(contentWrapper);
    })();

    const displayProjectsSidebar = (projects) => {
        const sidebarWrapper = document.querySelector(".project-sidebar");
        sidebarWrapper.replaceChildren(); // clear previous children if any.

        const projectsWrapper = document.createElement("div");
        projectsWrapper.classList.add("projects-wrapper");

        const addProjectButton = document.createElement("button");
        addProjectButton.classList.add("add-project-btn");

        for(const projectName in projects) {
            displayProject(projects[projectName], projectsWrapper);
        }

        sidebarWrapper.appendChild(projectsWrapper);
        sidebarWrapper.appendChild(addProjectButton);
    };

    const displayProject = (project, projectsWrapper) => {
        const projectWrapper = document.createElement("div");
        projectWrapper.classList.add("project-card");

        const projectName = document.createElement("span");
        projectName.classList.add("project-name");
        projectName.textContent = project.getName();

        projectWrapper.appendChild(projectName);

        projectsWrapper.appendChild(projectWrapper);
    }

    return { displayProjectsSidebar, displayProject };
})();

const appController = (() => {
    const loadProjects = (() => {
        projectController.loadProjects();
        const projects = projectController.getProjects();
        displayController.displayProjectsSidebar(projects);
    })();
})();
