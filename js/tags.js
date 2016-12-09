riot.tag2('entry-form', '<h2>Time Entry</h2> <form action="" onsubmit="{submitTime}"> <label for="time-date">Date</label> <input name="time-date" ref="date" type="date"> <label for="time-proj">Select your project</label> <select id="projects" ref="project"> <option each="{this.projects}" riot-value="{key}">{name}</option> </select> <label for="time-entry">Enter your hours</label> <input name="time-entry" ref="hours" placeholder="Enter your hours" type="number"> <label for="time-desc">Description</label> <textarea name="time-desc" rows="4" cols="80" ref="description"></textarea> <button>Enter Time</button> </form>', '', '', function(opts) {
    var tag = this;
    tag.projects = [];
    tag.submitTime = submitTime;

    tag.on('mount', function() {
      var now = new Date();
      tag.refs.date.value = now.toISOString().substr(0, 10);
    });

    tag.opts.projects.on('project-update', tag.update);
    tag.on('update', function() {
      tag.projects = tag.opts.projects.getProjects();
    });

    function submitTime(e) {

      e.preventDefault();
      var entry = {};
      if (this.refs.description.value) {
        entry.description = this.refs.description.value;
      }
      if (this.refs.hours.value) {
        entry.hours = this.refs.hours.value;
      }
      if (this.refs.project.value) {
        entry.project = this.refs.project.value;
      }
      if (this.refs.date.value) {
        entry.date = this.refs.date.value;
      }
      tag.opts.timeEntry.trigger('time-add', entry);
    }
});

riot.tag2('project-add-form', '<h2>Add a project</h2> <label htmlfor="proj-add">Name</label> <input type="text" name="proj-add" ref="projAdd" placeholder="Enter your project name"> <button type="button" onclick="{addItem}">Add Project</button>', '', '', function(opts) {
    var tag = this;
    tag.addItem = addItem;

    function addItem(e) {
      var text = tag.refs.projAdd.value;
      if (text) {
        tag.opts.projects.trigger('project-add', text);
      }
      tag.refs.projAdd.value = '';
    }
});

riot.tag2('project-list', '<h2>Projects</h2> <ul> <li each="{this.projects}">{name} <button type="button" onclick="{parent.removeItem}">Delete</button></li> </ul>', '', '', function(opts) {
    var tag = this;

    tag.projects = []

    tag.removeItem = removeItem;

    tag.opts.projects.on('project-update', tag.update);
    tag.on('update', function() {
      tag.projects = tag.opts.projects.getProjects();
    })

    function removeItem(e) {
      var index = tag.projects.indexOf(e.item);
      tag.opts.projects.trigger('project-remove', tag.projects[index].key);
    }

});
