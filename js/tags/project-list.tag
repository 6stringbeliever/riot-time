<project-list>
  <h2>Projects</h2>
  <ul>
    <li each={ this.projects }>{ name } <button type="button" onclick={ parent.removeItem }>Delete</button></li>
  </ul>

  <script>
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
  </script>
</project-list>
