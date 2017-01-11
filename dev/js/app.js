/* global firebase */

import riot from 'riot';
//import route from 'riot-route';

import config from './config';

import ProjectList from './observables/projectlist';
import TimeEntryList from './observables/timeentry';
import State from './observables/state';

import './tags/project-add-form.tag';
import './tags/project-list.tag';
import './tags/entry-form.tag';
import './tags/time-report.tag';
import './tags/time-item.tag';
import './tags/app-nav.tag';

firebase.initializeApp(config);

var projects = new ProjectList(firebase.database(), riot);
var timeEntry = new TimeEntryList(firebase.database(), riot);
var state = new State(riot);

var links = [
  {text: 'Enter Time',
  url: 'time'},
  {text: 'Reports',
  url: 'reports'},
  {text: 'Projects',
  url: 'projects'}
];

riot.mount('project-add-form', {projects: projects});
riot.mount('project-list', {projects: projects});
riot.mount('entry-form', {projects: projects, timeEntry: timeEntry, state: state});
riot.mount('time-report', {projects: projects, timeEntry: timeEntry, state: state});
riot.mount('time-item');
riot.mount('app-nav', {links: links});
