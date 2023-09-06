export default function createSVG(node, dVal, svgClasses=[], pathAttrs=[]) {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS(
        "http://www.w3.org/2000/svg", 
        "path"
    );
    iconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    iconSvg.setAttribute('fill', 'currentColor');
    iconSvg.setAttribute('viewBox', '0 0 512 512');
    iconSvg.classList.add('post-icon');
    for(let i = 0; i < svgClasses.length; i++) {
        iconSvg.classList.add(svgClasses[i]);
    }

    for(let i = 0; i < pathAttrs.length; i++) {
        iconPath.setAttribute(pathAttrs[i][0], pathAttrs[i][1]);
    }
    iconPath.setAttribute("d", dVal);
    

    iconSvg.appendChild(iconPath);

    return node.appendChild(iconSvg);
}