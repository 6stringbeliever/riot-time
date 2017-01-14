var TimeEntryList = function(db, riot) {
  this.db = db;
  this.timeEntries = [];
  riot.observable(this);

  this.db.ref('time/').on('value', function() {
    this.trigger('time-update');
  }.bind(this));

  this.on('time-add', function(time) {
    if (time) {
      var newkey = this.db.ref().child('time').push().key;
      this.db.ref('time/' + newkey).set(time);
    }
  });

  this.on('time-update', function(key, entry) {
    if (key && entry) {
      this.db.ref('time/' + key).update(entry);
    }
  });

  this.on('time-remove', function(key) {
    this.db.ref('time/' + key).remove();
  });

  this.on('time-bill', function(key) {
    this.db.ref('time/' + key).update({billed: true});
  });

  this.on('time-retrieve', function(projectKey, billed) {
    var query;
    if (projectKey === 'all') {
      query = this.db.ref('time/');
    } else {
      query = this.db.ref('time/').orderByChild('project').equalTo(projectKey);
    }
    query.once('value').then(function(snapshot) {
      var data = snapshot.val();
      if (data) {
        var keys = Object.keys(data);
        var newtimelist = [];
        keys.forEach(function(key) {
          var item = data[key];
          item.key = key;
          if (billed === 'all' ||
            (billed === 'true' && item.billed) ||
            (billed === 'false' && !item.billed)) {
              newtimelist.push(item);
          }
        });
      }
      this.timeEntries = newtimelist;
      this.trigger('time-query-returned');
    }.bind(this));
  });
}
TimeEntryList.prototype.getEntryForKey = function(key) {
  var time = null;
  var i = 0;
  while (time === null && i < this.timeEntries.length) {
    if (this.timeEntries[i].key === key) {
      time = this.timeEntries[i];
    }
    i++;
  }
  return time;
}

export default TimeEntryList;
