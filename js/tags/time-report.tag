<time-report>
  <h2>Time</h2>
  <select name="proj-select" ref="projSelect" onchange={ getTime }>
    <option value="all">All</option>
    <option each={this.projects} value={key}>{name}</option>
  </select>

  <ul if={ time }>
    <li each={ time }>{ parent.getName(project) } { date } - { hours } - { description }</li>
  </ul>
  <div if={ !time }>
    <p>No time entries for this project.
  </div>

  <script>
    var tag = this;
    tag.projects = [];
    tag.time = [];
    tag.getTime = getTime;
    tag.getName = getName;

    tag.opts.projects.on('project-update', function() {
      tag.projects = tag.opts.projects.getProjects();
      tag.update();
    });

    tag.on('mount', function() {
      tag.opts.timeEntry.trigger('time-retrieve');
    });

    tag.opts.timeEntry.on('time-update', function() {
      tag.time = tag.opts.timeEntry.timeEntries;
      tag.update();
    });

    function getTime() {
      var key = tag.refs.projSelect.value;
      if (key === 'all') {
        tag.opts.timeEntry.trigger('time-retrieve');
      } else {
        tag.opts.timeEntry.trigger('time-retrieve', key);
      }
    }

    function getName(val) {
      return tag.opts.projects.getProjectNameFromKey(val);
    }
  </script>
</time-report>
