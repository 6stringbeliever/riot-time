var ProjectList = function(db, riot) {
  this.db = db;
  this.projects = [];
  riot.observable(this);

  this.db.ref('projects').on('value', function(proj) {
    var data = proj.val();
    var keys = Object.keys(data);
    var newprojlist = [];
    keys.forEach(function(key) {
      newprojlist.push({
        name: data[key].name,
        key: key
      })
    });
    this.projects = newprojlist;
    this.trigger('project-update');
  }.bind(this));

  this.on('project-add', function(text) {
    if (text) {
      var newkey = this.db.ref().child('projects').push().key;
      this.db.ref('projects/' + newkey).set({'name': text});
    }
  });

  this.on('project-remove', function(key) {
    // TODO Remove time entries for project
    this.db.ref('projects/' + key).remove();
  });
};
ProjectList.prototype.getProjects = function() {
  return this.projects;
};
ProjectList.prototype.getProjectNameFromKey = function(key) {
  // TODO Make more efficient by saving a backing key:project index
  var name = '';
  var i = 0;
  while (name === '' && i < this.projects.length) {
    if (this.projects[i].key === key) {
      name = this.projects[i].name;
    }
    i++;
  }
  return name;
}

export default ProjectList;
