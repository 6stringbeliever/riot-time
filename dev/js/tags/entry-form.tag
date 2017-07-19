<entry-form class="component">
  <div class="card" if={ display }>
    <h2>{ header }</h2>
    <form action="" onsubmit={ submitTime } ref="form">
      <label for="time-date">Date</label>
      <input type="date" name="time-date" ref="date" value={ entry.date }/>
      <label for="time-proj">Select your project</label>
      <select id="projects" ref="project">
        <option each={ this.projects } value={ key } selected={ entry.key === key }>{ name }</option>
      </select>
      <label for="time-entry">Enter your hours</label>
      <input type="number" step="0.25" name="time-entry" ref="hours" placeholder="Enter your hours" value={ entry.hours }/>
      <label for="time-desc">Description</label>
      <textarea name="time-desc" rows="4" cols="80" ref="description">{ entry.description }</textarea>
      <label for="time-bill-status"><input type="checkbox" name="time-bill-status" ref="billStatus" checked={ entry.billed }> Billed</label>
      <button type="submit">{ btntext }</button> <a if={ key } onclick={ cancel }>Cancel</a>
    </form>
  </div>

  <script>
    import route from 'riot-route';

    var tag = this;
    tag.display = true;
    tag.projects = [];
    tag.errors = [];
    tag.submitTime = submitTime;
    tag.reset = reset;
    tag.cancel = cancel;
    tag.entry = {};
    tag.updateRoute = updateRoute.bind(this);

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

    function updateRoute(init) {
      this.display = (init === 'time' || init === '');
      this.update();
    }

    route(tag.updateRoute);

  </script>
</entry-form>
