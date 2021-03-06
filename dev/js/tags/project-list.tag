<project-list>
  <h2>Projects</h2>
  <ul show={ this.projects.length > 0 }>
    <li each={ this.projects }>{ name } <button type="button" onclick={ parent.removeItem }>Delete</button></li>
  </ul>
  <p show={ this.projects.length === 0 }>You haven't created any projects yet.</p>

  <script>
    var tag = this;

    tag.projects = [];

    tag.removeItem = removeItem;

    tag.opts.projects.on('project-update', tag.update);
    tag.on('update', function() {
      tag.projects = tag.opts.projects.getProjects();
    })

    function removeItem(e) {
      var index = tag.projects.indexOf(e.item);
      tag.opts.projects.trigger('project-remove', tag.projects[index].key);
    }

  </script>
</project-list>
