/**
 * Generic class for moving elements in DOM and clearing event listeners
 * on elements in DOM
 */
class DOMHelper {
  /**
   * Clear all event listeners from element.
   * @param {String} element element to clear listeners from
   */
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  /**
   * Move a DOM element on page.
   * @param {String} elementId id of element to move
   * @param {String} newDestinationSelector selector for the destination of the element
   */
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

/**
 * Generic component class for handling adding/removing elements
 * from DOM.
 */
class Component {
  /**
   * @param {String} hostElementId id for element to add a new element before/after
   * @param {String} insertBefore true if want to insert before element, else inserted after element
   */
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  /**
   * Remove this element from DOM.
   */
  detach() {
    if (this.element) this.element.remove();
  }

  /**
   * Insert new element in DOM.
   */
  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    );
    document.body.append(this.element);
  }
}

/**
 * Class for Tooltip definition.
 */
class Tooltip extends Component {
  /**
   * @param {Function} closeNotifierFunction callback function for closing this tooltip
   */
  constructor(closeNotifierFunction) {
    super();
    this.closeNotifier = closeNotifierFunction;
    this.create();
  }

  /**
   * Close this tooltip.
   */
  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  /**
   * Initialize and render this tooltip.
   */
  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = "TOOLTIP!";
    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

/**
 * Class for a project item definition.
 */
class ProjectItem {
  hasActiveTooltip = false;

  /**
   * @param {String} id id of this project item
   * @param {Function} updateProjectListsHandlerFunction callback function for updating this project
   * @param {String} type type of this project
   */
  constructor(id, updateProjectListsHandlerFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsHandlerFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  /**
   * Show tooltip for this project.
   */
  showMoreInfoHandler() {
    if (this.hasActiveTooltip) return;
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  /**
   * Connect the more info button to button already rendered on page.
   */
  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler);
  }

  /**
   * Connect the switch button for this project item element
   * @param {String} type type of this project item
   */
  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  /**
   * Updates this project, after it has switched project type
   * @param {Function} updateProjectListsHandlerFunction
   * @param {String} type previous type of this project item
   */
  update(updateProjectListsHandlerFunction, type) {
    this.updateProjectListsHandler = updateProjectListsHandlerFunction;
    this.connectSwitchButton(type);
  }
}

/**
 * Class definition for a list of projects
 */
class ProjectList {
  projects = [];

  /**
   * @param {String} type type of projects contained in this list
   * options: 'active' or 'finished'
   */
  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
  }

  /**
   * Set the switch handler for switching project types
   * @param {Function} switchHandlerFunction callback function for switching project type
   */
  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  /**
   * Adds a ProjectItem to this project.
   * @param {ProjectItem} project the item to add to this project list
   */
  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  /**
   * Switches a project from active to finished list (or vice versa).
   *
   * Removes from project from this project list.
   * @param {String} projectId id of project to switch
   */
  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

/**
 * Static class for initiliazing the app.
 */
class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
