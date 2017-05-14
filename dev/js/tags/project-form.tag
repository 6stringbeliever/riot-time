<project-form>
  <div show={ display }>
    <project-list projects={ opts.projects }></project-list>
    <project-add-form projects={ opts.projects }></project-add-form>
  </div>


  <script>
    import route from 'riot-route';

    var tag = this;
    tag.display = false;
    tag.updateRoute = updateRoute.bind(this);

    function updateRoute(init) {
      this.display = init === 'projects';
      this.update();
    }

    route(tag.updateRoute);
  </script>
</project-form>
