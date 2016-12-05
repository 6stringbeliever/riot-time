// Initialize Firebase
var config = {
  apiKey: "AIzaSyBOjXr1abnwtVZ49hUbhCu9gPvuBUGpgJc",
  authDomain: "riot-time.firebaseapp.com",
  databaseURL: "https://riot-time.firebaseio.com",
  storageBucket: "riot-time.appspot.com",
  messagingSenderId: "267994916464"
};
firebase.initializeApp(config);

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
    this.db.ref('projects/' + key).remove();
  });
};
ProjectList.prototype.getProjects = function() {
  return this.projects;
};

var projects = new ProjectList(firebase.database(), riot);

riot.mount('project-add-form', {projects: projects});
riot.mount('project-list', {projects: projects});
