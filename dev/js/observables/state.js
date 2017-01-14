var State = function(riot) {
  riot.observable(this);

  this.editEntry = null;

  this.on('set-edit-entry', function(key) {
    this.editEntry = key;
    this.trigger('update-edit-entry');
  }.bind(this));
}

export default State;
