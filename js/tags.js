riot.tag2('entry-form', '<label>Enter your hours</label> <input name="time-entry" placeholder="Enter your hours" type="number">', '', '', function(opts) {
    var tag = this;
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

    tag.opts.projects.on('project-update', tag.update)

    function removeItem(e) {
      var index = tag.projects.indexOf(e.item);
      tag.opts.projects.trigger('project-remove', tag.projects[index].key);
    }

    tag.on('update', function() {
      tag.projects = tag.opts.projects.getProjects();
    })
});
