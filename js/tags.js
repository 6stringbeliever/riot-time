riot.tag2('app-nav', '<nav> <ul> <li>Enter Time</li> <li>Reports</li> <li>Projects</li> </ul> </nav>', '', '', function(opts) {
});

riot.tag2('entry-form', '<h2>Time Entry</h2> <form action="" onsubmit="{submitTime}" ref="form"> <label for="time-date">Date</label> <input name="time-date" ref="date" type="date"> <label for="time-proj">Select your project</label> <select id="projects" ref="project"> <option each="{this.projects}" riot-value="{key}">{name}</option> </select> <label for="time-entry">Enter your hours</label> <input name="time-entry" ref="hours" placeholder="Enter your hours" type="number"> <label for="time-desc">Description</label> <textarea name="time-desc" rows="4" cols="80" ref="description"></textarea> <label for="time-bill-status"><input type="checkbox" name="time-bill-status" ref="billStatus"> Billed</label> <button>Enter Time</button> </form>', '', '', function(opts) {
    var tag = this;
    tag.projects = [];
    tag.submitTime = submitTime;
    tag.reset = reset;

    tag.on('mount', function() {
      tag.reset();
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
      if (this.refs.billStatus.checked) {
        entry.billed = this.refs.billStatus.checked;
      }
      tag.opts.timeEntry.trigger('time-add', entry);
      tag.reset();
    }

    function reset() {
      var now = new Date();
      tag.refs.form.reset();

      tag.refs.date.value = now.toISOString().substr(0, 10);
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

riot.tag2('time-item', '<li>{parent.getName(project)} {date} - {hours} - {description} <button type="button">Edit</button> <button type="button">Delete</button></li>', '', '', function(opts) {
});

riot.tag2('time-report', '<h2>Time</h2> <label for="proj-select">Project</label> <select name="proj-select" ref="projSelect" onchange="{getTime}"> <option value="all">All</option> <option each="{this.projects}" riot-value="{key}">{name}</option> </select> <label for="proj-bill-status">Billing Status</label> <select name="proj-bill-status" ref="projBillStatus" onchange="{getTime}"> <option value="all">All</option> <option value="false">Unbilled</option> <option value="true">Billed</option> </select> <ul if="{time}"> <time-item each="{time}" data="{this}"></time-item> </ul> <div if="{!time}"> <p>No time entries found. </div>', '', '', function(opts) {
    var tag = this;
    tag.projects = [];
    tag.time = [];
    tag.getTime = getTime;
    tag.getName = getName;

    tag.opts.projects.on('project-update', function() {
      tag.projects = tag.opts.projects.getProjects();
      tag.update();
    });

    tag.opts.timeEntry.on('time-update', tag.getTime);

    tag.opts.timeEntry.on('time-query-returned', function() {
      tag.time = tag.opts.timeEntry.timeEntries;
      tag.update();
    });

    function getTime() {
      tag.opts.timeEntry.trigger('time-retrieve', tag.refs.projSelect.value, tag.refs.projBillStatus.value);
    }

    function getName(val) {
      return tag.opts.projects.getProjectNameFromKey(val);
    }

});
