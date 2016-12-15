<time-report>
  <h2>Time</h2>
  <label for="proj-select">Project</label>
  <select name="proj-select" ref="projSelect" onchange={ getTime }>
    <option value="all">All</option>
    <option each={this.projects} value={key}>{name}</option>
  </select>
  <label for="proj-bill-status">Billing Status</label>
  <select name="proj-bill-status" ref="projBillStatus" onchange={ getTime }>
    <option value="all">All</option>
    <option value="false">Unbilled</option>
    <option value="true">Billed</option>
  </select>

  <ul if={ time }>
    <time-item each={ time } data={ this }></time-item>
  </ul>
  <div if={ !time }>
    <p>No time entries found.
  </div>

  <script>
    var tag = this;
    tag.projects = [];
    tag.time = [];
    tag.getTime = getTime;
    tag.getName = getName;
    tag.editEntry = editEntry;
    tag.deleteEntry = deleteEntry;

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
      console.log('clicked edit', val.item);
    }

    function deleteEntry(val) {
      tag.opts.timeEntry.trigger('time-remove', val.item.key)
    }
  </script>
</time-report>
