<project-add-form>
  <h2>Add a project</h2>
  <label htmlFor="proj-add">Name</label>
  <input type="text" name="proj-add" ref="projAdd" placeholder="Enter your project name" />
  <button type="button" onclick={ addItem }>Add Project</button>

  <script>
    var tag = this;
    tag.addItem = addItem;

    function addItem(e) {
      var text = tag.refs.projAdd.value;
      if (text) {
        tag.opts.projects.trigger('project-add', text);
      }
      tag.refs.projAdd.value = '';
    }
  </script>
</project-add-form>
