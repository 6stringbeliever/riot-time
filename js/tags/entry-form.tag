<entry-form>
  <h2>Time Entry</h2>
  <form action="" onsubmit={ submitTime }>
    <label for="time-date">Date</label>
    <input type="date" name="time-date" ref="date" />
    <label for="time-proj">Select your project</label>
    <select id="projects" ref="project">
      <option each={ this.projects } value={ key }>{ name }</option>
    </select>
    <label for="time-entry">Enter your hours</label>
    <input type="number" name="time-entry" ref="hours" placeholder="Enter your hours" />
    <label for="time-desc">Description</label>
    <textarea name="time-desc" rows="4" cols="80" ref="description"></textarea>
    <button>Enter Time</button>
  </form>



  <script>
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
      // TODO Vaildation
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
  </script>
</entry-form>
