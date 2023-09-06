const display = () => {
    const headerWrapper = document.createElement("div");
    headerWrapper.classList.add("header");
    
    const appName = document.createElement("span");
    appName.classList.add("app-title");
    appName.textContent = "To Do List";

    headerWrapper.appendChild(appName);

    return headerWrapper
}

export default display;