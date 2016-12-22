riot.tag2('app-nav', '<nav> <ul> <li each="{links}"><a href="{\'#\' + url}">{text}</a></li> </ul> </nav>', '', '', function(opts) {
    var tag = this;

    this.links = [
      {text: 'Enter Time',
      url: 'time'},
      {text: 'Reports',
      url: 'reports'},
      {text: 'Projects',
      url: 'projects'}
    ];
});

riot.tag2('entry-form', '<h2>{header}</h2> <form action="" onsubmit="{submitTime}" ref="form"> <label for="time-date">Date</label> <input name="time-date" ref="date" riot-value="{entry.date}" type="{\'date\'}"> <label for="time-proj">Select your project</label> <select id="projects" ref="project"> <option each="{this.projects}" riot-value="{key}" selected="{entry.key === key}">{name}</option> </select> <label for="time-entry">Enter your hours</label> <input name="time-entry" ref="hours" placeholder="Enter your hours" riot-value="{entry.hours}" type="{\'number\'}"> <label for="time-desc">Description</label> <textarea name="time-desc" rows="4" cols="80" ref="description">{entry.description}</textarea> <label for="time-bill-status"><input type="checkbox" name="time-bill-status" ref="billStatus" checked="{entry.billed}"> Billed</label> <button type="submit">{btntext}</button> <a if="{key}" onclick="{cancel}">Cancel</a> </form>', '', '', function(opts) {
    var tag = this;
    tag.projects = [];
    tag.errors = [];
    tag.submitTime = submitTime;
    tag.reset = reset;
    tag.cancel = cancel;
    tag.entry = {};

    tag.on('mount', function() {
      tag.reset();
    });

    tag.opts.projects.on('project-update', tag.update);
    tag.on('update', function() {
      tag.projects = tag.opts.projects.getProjects();
      tag.header = tag.key ? 'Edit Entry' : 'Enter Time';
      tag.btntext = tag.key ? 'Update Time' : 'Enter Time';
    });

    tag.opts.state.on('update-edit-entry', function() {
      tag.reset();
      tag.key = tag.opts.state.editEntry;
      tag.entry = tag.opts.timeEntry.getEntryForKey(tag.key);
      tag.update();
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
      entry.billed = this.refs.billStatus.checked;
      if (tag.errors.length === 0) {
        if (tag.key) {
          tag.opts.timeEntry.trigger('time-update', tag.key, entry);
        } else {
          tag.opts.timeEntry.trigger('time-add', entry);
        }
        tag.reset();
      }
    }

    function reset() {
      tag.refs.form.reset();
      tag.entry = getEmptyEntry();
    }

    function cancel() {
      tag.reset();
      tag.key = null;
      tag.update();
    }

    function getUsefulDateString(d) {
      var month = ('0' + (d.getMonth() + 1)).slice(-2);
      var day = ('0' + d.getDate()).slice(-2);
      return d.getFullYear() + '-' + month + '-' + day;
    }

    function getEmptyEntry() {
      return {
        date: getUsefulDateString(new Date()),
        billed: false,
        description: '',
        hours: 0
      };
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

riot.tag2('time-item', '<li class="{billed: billed}"><input type="checkbox" checked="{selected}" onchange="{parent.select}"> {parent.getName(project)} {date} - {hours} - {description} <button type="button" onclick="{parent.editEntry}">Edit</button> <button type="button" onclick="{parent.deleteEntry}">Delete</button></li>', '', '', function(opts) {
});

riot.tag2('time-report', '<h2>Time</h2> <label for="proj-select">Project</label> <select name="proj-select" ref="projSelect" onchange="{getTime}"> <option value="all">All</option> <option each="{this.projects}" riot-value="{key}">{name}</option> </select> <label for="proj-bill-status">Billing Status</label> <select name="proj-bill-status" ref="projBillStatus" onchange="{getTime}"> <option value="all">All</option> <option value="false">Unbilled</option> <option value="true">Billed</option> </select> <label><input type="checkbox" ref="selectall" onchange="{selectAll}"> Select All</label> <button type="button" name="proj-bill" onclick="{billEntries}">Bill Selected</button> <ul if="{time}"> <time-item each="{time}" data="{this}"></time-item> </ul> <div if="{!time}"> <p>No time entries found. </div>', '', '', function(opts) {
    var tag = this;
    tag.projects = [];
    tag.time = [];
    tag.getTime = getTime;
    tag.getName = getName;
    tag.editEntry = editEntry;
    tag.deleteEntry = deleteEntry;
    tag.billEntries = billEntries;
    tag.selectAll = selectAll;
    tag.select = select;

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

    function editEntry(val) {
      tag.opts.state.trigger('set-edit-entry', val.item.key);
    }

    function deleteEntry(val) {
      tag.opts.timeEntry.trigger('time-remove', val.item.key);
    }

    function select(val) {
      val.item.selected = !val.item.selected;
    }

    function selectAll(val) {
      tag.time.forEach(function(time) {
        time.selected = val.target.checked;
      });
    }

    function billEntries() {
      tag.time.forEach(function(time) {
        if (time.selected) {
          tag.opts.timeEntry.trigger('time-bill', time.key);
          time.selected = false;
        }
      });
    }
});
