import { ProjectInput } from './projectInput';
import { ProjectList } from './projectList';

const projectInput = new ProjectInput();
projectInput.exec();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
activeProjectList;
finishedProjectList;
